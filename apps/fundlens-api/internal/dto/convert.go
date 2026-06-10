package dto

import "github.com/finmate-dev/fundlens-api/internal/db"

// AMC converters

func FromListAmcsRow(row db.ListAmcsRow) AmcSummary {
	return AmcSummary{
		ID:            row.ID,
		Slug:          row.Slug,
		Name:          row.Name,
		LogoURL:       row.LogoUrl,
		TotalAumCr:    NumericToFloat(row.TotalAumCr),
		SchemeCount:   row.SchemeCount,
		ScraperStatus: row.ScraperStatus,
		LastScrapedAt: TimestamptzToString(row.LastScrapedAt),
	}
}

func FromFundlensAmc(row db.FundlensAmc) AmcDetail {
	return AmcDetail{
		ID:            row.ID,
		Slug:          row.Slug,
		Name:          row.Name,
		SebiRegNo:     row.SebiRegNo,
		Website:       row.Website,
		LogoURL:       row.LogoUrl,
		TotalAumCr:    NumericToFloat(row.TotalAumCr),
		SchemeCount:   row.SchemeCount,
		ScraperStatus: row.ScraperStatus,
		LastScrapedAt: TimestamptzToString(row.LastScrapedAt),
	}
}

// Scheme converters

func FromGetSchemeBySlugRow(row db.GetSchemeBySlugRow) SchemeSummary {
	return SchemeSummary{
		ID:           row.ID,
		Slug:         row.Slug,
		Name:         row.Name,
		AmcName:      row.AmcName,
		AmcSlug:      row.AmcSlug,
		Category:     row.Category,
		SubCategory:  row.SubCategory,
		AumCr:        NumericToFloat(row.AumCr),
		ExpenseRatio: NumericToFloat(row.ExpenseRatio),
		AmfiCode:     row.AmfiCode,
		IsinGrowth:   row.IsinGrowth,
		IsinIdcw:     row.IsinIdcw,
	}
}

// Holding converters

func FromListHoldingsBySnapshotRow(row db.ListHoldingsBySnapshotRow) Holding {
	return Holding{
		ID:            row.ID,
		Isin:          row.Isin,
		TickerNse:     row.TickerNse,
		CompanyName:   row.CompanyName,
		Sector:        row.Sector,
		Quantity:      NumericToFloat(row.Quantity),
		MarketValueCr: NumericToFloat(row.MarketValueCr),
		PctOfNav:      NumericToFloat(row.PctOfNav),
	}
}

// Diff converters

func FromListDiffsBySchemeRow(row db.ListDiffsBySchemeRow) HoldingDiff {
	return HoldingDiff{
		Isin:        row.Isin,
		PrevQty:     NumericToFloat(row.PrevQty),
		CurrQty:     NumericToFloat(row.CurrQty),
		QtyDelta:    NumericToFloat(row.QtyDelta),
		PrevValueCr: NumericToFloat(row.PrevValueCr),
		CurrValueCr: NumericToFloat(row.CurrValueCr),
		Action:      row.Action,
	}
}

// Stock holder converters

func FromListHoldersOfIsinRow(row db.ListHoldersOfIsinRow) StockHolder {
	return StockHolder{
		SchemeSlug:     row.Slug,
		SchemeName:     row.SchemeName,
		AmcName:        row.AmcName,
		Quantity:       NumericToFloat(row.Quantity),
		MarketValueCr:  NumericToFloat(row.MarketValueCr),
		PctOfNav:       NumericToFloat(row.PctOfNav),
		DisclosureDate: DateToString(row.DisclosureDate),
	}
}

// NAV converters

func FromListNavBySchemeRow(row db.ListNavBySchemeRow) NavPoint {
	date := ""
	if d := DateToString(row.Date); d != nil {
		date = *d
	}
	return NavPoint{
		Date: date,
		Nav:  NumericToFloat(row.Nav),
	}
}
