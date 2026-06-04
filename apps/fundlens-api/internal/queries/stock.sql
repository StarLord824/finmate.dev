-- name: ListHoldersOfIsin :many
WITH latest_per_scheme AS (
  SELECT DISTINCT ON (scheme_id) id AS snapshot_id, scheme_id, disclosure_date
  FROM fundlens.holdings_snapshot
  ORDER BY scheme_id, disclosure_date DESC
)
SELECT s.slug, s.name AS scheme_name, a.name AS amc_name,
       h.quantity, h.market_value_cr, h.pct_of_nav,
       lps.disclosure_date
FROM latest_per_scheme lps
JOIN fundlens.holding h ON h.snapshot_id = lps.snapshot_id
JOIN fundlens.scheme s ON s.id = lps.scheme_id
JOIN fundlens.amc a ON a.id = s.amc_id
WHERE h.isin = $1
ORDER BY h.market_value_cr DESC NULLS LAST
LIMIT $2 OFFSET $3;
