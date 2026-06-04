-- name: ListSchemesByAmc :many
SELECT id, slug, name, category, sub_category, aum_cr, expense_ratio,
       amfi_code, isin_growth, isin_idcw
FROM fundlens.scheme
WHERE amc_id = $1
ORDER BY aum_cr DESC NULLS LAST
LIMIT $2 OFFSET $3;

-- name: GetSchemeBySlug :one
SELECT s.id, s.slug, s.name, s.category, s.sub_category,
       s.aum_cr, s.expense_ratio, s.amfi_code, s.isin_growth, s.isin_idcw,
       a.name AS amc_name, a.slug AS amc_slug
FROM fundlens.scheme s
JOIN fundlens.amc a ON a.id = s.amc_id
WHERE s.slug = $1;

-- name: GetLatestSnapshotForScheme :one
SELECT id, disclosure_date
FROM fundlens.holdings_snapshot
WHERE scheme_id = $1
ORDER BY disclosure_date DESC LIMIT 1;
