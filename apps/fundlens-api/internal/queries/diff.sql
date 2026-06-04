-- name: ListDiffsByScheme :many
SELECT isin, prev_qty, curr_qty, qty_delta,
       prev_value_cr, curr_value_cr, action
FROM fundlens.holding_diff
WHERE scheme_id = $1
  AND curr_snapshot_id = $2
ORDER BY ABS(COALESCE(curr_value_cr, 0) - COALESCE(prev_value_cr, 0)) DESC NULLS LAST;
