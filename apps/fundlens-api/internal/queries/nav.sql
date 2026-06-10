-- name: ListNavByScheme :many
SELECT date, nav
FROM fundlens.nav
WHERE scheme_id = $1
  AND date >= $2
  AND date <= $3
ORDER BY date ASC;
