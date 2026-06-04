package dto

import (
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

// Helper converters

func NumericToFloat(n pgtype.Numeric) *float64 {
	if !n.Valid {
		return nil
	}
	f, err := n.Float64Value()
	if err != nil || !f.Valid {
		return nil
	}
	v := f.Float64
	return &v
}

func NumericToString(n pgtype.Numeric) *string {
	f := NumericToFloat(n)
	if f == nil {
		return nil
	}
	s := fmt.Sprintf("%g", *f)
	return &s
}

func DateToString(d pgtype.Date) *string {
	if !d.Valid {
		return nil
	}
	s := d.Time.Format("2006-01-02")
	return &s
}

func TextToStringPtr(t pgtype.Text) *string {
	if !t.Valid {
		return nil
	}
	return &t.String
}

func TimestamptzToString(ts pgtype.Timestamptz) *string {
	if !ts.Valid {
		return nil
	}
	s := ts.Time.UTC().Format(time.RFC3339)
	return &s
}

// AMC response types

type AmcSummary struct {
	ID            int64    `json:"id"`
	Slug          string   `json:"slug"`
	Name          string   `json:"name"`
	LogoURL       *string  `json:"logoUrl"`
	TotalAumCr    *float64 `json:"totalAumCr"`
	SchemeCount   *int32   `json:"schemeCount"`
	ScraperStatus string   `json:"scraperStatus"`
	LastScrapedAt *string  `json:"lastScrapedAt"`
}

type AmcDetail struct {
	ID            int64   `json:"id"`
	Slug          string  `json:"slug"`
	Name          string  `json:"name"`
	SebiRegNo     *string `json:"sebiRegNo"`
	Website       *string `json:"website"`
	LogoURL       *string `json:"logoUrl"`
	TotalAumCr    *float64 `json:"totalAumCr"`
	SchemeCount   *int32  `json:"schemeCount"`
	ScraperStatus string  `json:"scraperStatus"`
	LastScrapedAt *string `json:"lastScrapedAt"`
}

// Scheme response types

type SchemeSummary struct {
	ID           int64    `json:"id"`
	Slug         string   `json:"slug"`
	Name         string   `json:"name"`
	AmcName      string   `json:"amcName"`
	AmcSlug      string   `json:"amcSlug"`
	Category     *string  `json:"category"`
	SubCategory  *string  `json:"subCategory"`
	AumCr        *float64 `json:"aumCr"`
	ExpenseRatio *float64 `json:"expenseRatio"`
	AmfiCode     *string  `json:"amfiCode"`
	IsinGrowth   *string  `json:"isinGrowth"`
	IsinIdcw     *string  `json:"isinIdcw"`
}

// Holding response type

type Holding struct {
	ID            int64    `json:"id"`
	Isin          *string  `json:"isin"`
	TickerNse     *string  `json:"tickerNse"`
	CompanyName   string   `json:"companyName"`
	Sector        *string  `json:"sector"`
	Quantity      *float64 `json:"quantity"`
	MarketValueCr *float64 `json:"marketValueCr"`
	PctOfNav      *float64 `json:"pctOfNav"`
}

// Diff response type

type HoldingDiff struct {
	Isin        string   `json:"isin"`
	PrevQty     *float64 `json:"prevQty"`
	CurrQty     *float64 `json:"currQty"`
	QtyDelta    *float64 `json:"qtyDelta"`
	PrevValueCr *float64 `json:"prevValueCr"`
	CurrValueCr *float64 `json:"currValueCr"`
	Action      string   `json:"action"`
}

// Stock holder response type

type StockHolder struct {
	SchemeSlug     string   `json:"schemeSlug"`
	SchemeName     string   `json:"schemeName"`
	AmcName        string   `json:"amcName"`
	Quantity       *float64 `json:"quantity"`
	MarketValueCr  *float64 `json:"marketValueCr"`
	PctOfNav       *float64 `json:"pctOfNav"`
	DisclosureDate *string  `json:"disclosureDate"`
}

// NAV response type

type NavPoint struct {
	Date string   `json:"date"`
	Nav  *float64 `json:"nav"`
}
