package processor

import (
	"crypto/sha256"
	"fmt"
	"regexp"
	"strings"
	"time"
	"unicode/utf8"

	"github.com/finmate/ingestion-worker-go/internal/fetcher"
	"golang.org/x/net/html"
)

// Article is the clean, domain model stored in PostgreSQL.
type Article struct {
	Title       string
	Link        string
	Source      string
	Author      *string
	PublishedAt time.Time
	Summary     string
	Content     *string
	ImageURL    *string
	Fingerprint string
	Tags        []string
}

var (
	uuidRE   = regexp.MustCompile(`(?i)^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$`)
	tickerRE = regexp.MustCompile(`^[A-Z]{1,5}$`)
)

// Fingerprint generates a deterministic SHA-256 hash from the title and link.
// This is the primary deduplication key.
func Fingerprint(title, link string) string {
	h := sha256.New()
	h.Write([]byte(title + "|" + link))
	return fmt.Sprintf("%x", h.Sum(nil))
}

// StripHTML removes all HTML tags from a string and decodes entities.
func StripHTML(s string) string {
	doc, err := html.Parse(strings.NewReader(s))
	if err != nil {
		return s
	}
	var buf strings.Builder
	var extract func(*html.Node)
	extract = func(n *html.Node) {
		if n.Type == html.TextNode {
			buf.WriteString(n.Data)
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			extract(c)
		}
	}
	extract(doc)
	return strings.TrimSpace(buf.String())
}

// Summarize truncates text to maxRunes runes at the nearest word boundary.
func Summarize(text string, maxRunes int) string {
	if utf8.RuneCountInString(text) <= maxRunes {
		return text
	}
	runes := []rune(text)
	truncated := string(runes[:maxRunes])
	// Find last space for clean word boundary
	if idx := strings.LastIndex(truncated, " "); idx > 0 {
		truncated = truncated[:idx]
	}
	return truncated + "…"
}

// normalizeTags cleans, filters, and deduplicates a list of tag strings.
func normalizeTags(raw []string) []string {
	seen := make(map[string]struct{})
	result := make([]string, 0, len(raw))
	for _, t := range raw {
		t = strings.ToLower(strings.TrimSpace(t))
		if len(t) < 2 || len(t) > 60 {
			continue
		}
		if uuidRE.MatchString(t) || tickerRE.MatchString(strings.ToUpper(t)) {
			continue
		}
		if _, exists := seen[t]; exists {
			continue
		}
		seen[t] = struct{}{}
		result = append(result, t)
	}
	return result
}

// Normalize converts a raw feed item into a clean Article domain model.
// Returns nil if the item lacks required fields.
func Normalize(item fetcher.RawItem, sourceName string, defaultTags []string) *Article {
	title := strings.TrimSpace(item.Title)
	link := strings.TrimSpace(item.Link)
	if link == "" {
		link = item.GUID
	}
	if title == "" || link == "" {
		return nil
	}

	content := StripHTML(item.Content)
	summary := Summarize(StripHTML(item.Summary), 400)
	if summary == "" && content != "" {
		summary = Summarize(content, 400)
	}

	fingerprint := Fingerprint(title, link)

	rawTags := item.Categories
	if len(rawTags) == 0 {
		rawTags = defaultTags
	}
	tags := normalizeTags(rawTags)

	a := &Article{
		Title:       title,
		Link:        link,
		Source:      sourceName,
		PublishedAt: item.Published,
		Summary:     summary,
		Fingerprint: fingerprint,
		Tags:        tags,
	}

	if item.Author != "" {
		a.Author = &item.Author
	}
	if content != "" {
		a.Content = &content
	}
	if item.ImageURL != "" {
		a.ImageURL = &item.ImageURL
	}

	return a
}

// Validate checks that an Article has all required fields for persistence.
func Validate(a *Article) bool {
	if a == nil {
		return false
	}
	return a.Title != "" && a.Link != "" && a.Fingerprint != "" && !a.PublishedAt.IsZero()
}
