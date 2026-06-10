-- name: ListHoldingsBySnapshot :many
SELECT id, isin, ticker_nse, company_name, sector,
       quantity, market_value_cr, pct_of_nav
FROM fundlens.holding
WHERE snapshot_id = $1
ORDER BY market_value_cr DESC NULLS LAST;
