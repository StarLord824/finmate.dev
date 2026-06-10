"""Extract holdings from a PDF disclosure as a list of RawHolding.

Strategy:
1. pdfplumber.extract_tables() per page
2. find_header_row() across all tables — first table+row where the header is identifiable
3. Concatenate rows below header across all pages
4. normalize_rows() into RawHolding[]

Raises ValueError if no holdings could be extracted.
"""
from __future__ import annotations

import io

import pdfplumber

from .header_detector import find_header_row
from .normalizer import RawHolding, normalize_rows


def extract_holdings_from_pdf(pdf_bytes: bytes) -> list[RawHolding]:
    """Extract holdings from a PDF disclosure. Raises ValueError if no holdings found."""
    if not pdf_bytes:
        raise ValueError("empty PDF bytes")

    holdings: list[RawHolding] = []

    try:
        with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
            if not pdf.pages:
                raise ValueError("PDF has no pages")

            for page in pdf.pages:
                tables = page.extract_tables() or []
                for table in tables:
                    if not table:
                        continue
                    idx, cm = find_header_row(table)
                    if idx is None or cm is None:
                        continue
                    holdings.extend(normalize_rows(table[idx + 1:], cm))
    except ValueError:
        raise
    except Exception as exc:
        raise ValueError(f"PDF extraction failed: {exc}") from exc

    if not holdings:
        # TODO: camelot fallback for scanned/image-heavy PDFs (Phase 1)
        raise ValueError("no holdings extracted — pdfplumber found no parseable tables")

    return holdings
