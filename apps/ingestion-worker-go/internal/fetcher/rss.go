package fetcher

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/mmcdole/gofeed"
)

// RawItem is a normalized intermediate representation of a feed entry.
type RawItem struct {
	Title       string
	Link        string
	Published   time.Time
	Author      string
	Content     string
	Summary     string
	ImageURL    string
	Categories  []string
	GUID        string
}

// IFetcher is the Strategy interface for all source fetchers.
// Adding a new source type (REST, Webhook) only requires implementing this.
type IFetcher interface {
	Fetch(ctx context.Context) ([]RawItem, error)
}

// RSSFetcher fetches and parses an RSS/Atom feed.
type RSSFetcher struct {
	URL    string
	client *http.Client
}

// NewRSSFetcher constructs an RSSFetcher with a hardened HTTP client.
func NewRSSFetcher(url string) *RSSFetcher {
	return &RSSFetcher{
		URL: url,
		client: &http.Client{
			Timeout: 15 * time.Second,
			Transport: &http.Transport{
				MaxIdleConnsPerHost: 4,
				IdleConnTimeout:     30 * time.Second,
			},
		},
	}
}

// Fetch retrieves and parses the RSS feed, returning normalized RawItems.
func (f *RSSFetcher) Fetch(ctx context.Context) ([]RawItem, error) {
	fp := gofeed.NewParser()
	fp.UserAgent = "FinMate-Ingestion/2.0 (+https://finmate.dev)"
	fp.Client = f.client

	feed, err := fp.ParseURLWithContext(f.URL, ctx)
	if err != nil {
		return nil, fmt.Errorf("rss fetch failed for %s: %w", f.URL, err)
	}

	items := make([]RawItem, 0, len(feed.Items))
	for _, item := range feed.Items {
		ri := RawItem{
			Title:      item.Title,
			Link:       item.Link,
			Content:    item.Content,
			Summary:    item.Description,
			Categories: item.Categories,
			GUID:       item.GUID,
		}

		if item.Author != nil {
			ri.Author = item.Author.Name
		}

		if item.PublishedParsed != nil {
			ri.Published = *item.PublishedParsed
		} else if item.UpdatedParsed != nil {
			ri.Published = *item.UpdatedParsed
		} else {
			ri.Published = time.Now().UTC()
		}

		// Extract image from enclosures or media extensions
		if len(item.Enclosures) > 0 {
			ri.ImageURL = item.Enclosures[0].URL
		}

		items = append(items, ri)
	}

	return items, nil
}

// NewFetcher is a Factory that returns the correct IFetcher for a given source type.
func NewFetcher(sourceType, url string) (IFetcher, error) {
	switch sourceType {
	case "rss":
		return NewRSSFetcher(url), nil
	default:
		return nil, fmt.Errorf("unsupported source type: %s", sourceType)
	}
}
