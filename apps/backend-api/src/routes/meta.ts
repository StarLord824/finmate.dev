// src/routes/meta.ts
import express from "express";
import { getCategories, getSources, getTrending, getMarketData } from "../services/meta.service";
import { getMarketHistory, SYMBOLS } from "../services/market.service";
import { getCategoryQuotes, getMovers } from "../services/market.service";
import { getTopCrypto } from "../services/coingecko.service";
import { CATEGORY_MAP, ALL_YAHOO_SYMBOLS } from "../services/market-catalog";

const router: express.Router = express.Router();

/**
 * GET /meta/categories
 * Returns list of available categories
 */
router.get("/categories", async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.json({ data: categories });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /meta/sources
 * Returns list of news sources
 */
router.get("/sources", async (req, res, next) => {
  try {
    const sources = await getSources();
    res.json({ data: sources });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /meta/trending?hours=24
 * Returns top trending tags over the rolling window
 */
router.get("/trending", async (req, res, next) => {
  try {
    const hours = parseInt(req.query.hours as string) || 24;
    const data = await getTrending(hours);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /meta/market
 * Returns live market quotes (S&P, Nasdaq, BTC, etc.)
 */
router.get("/market", async (req, res, next) => {
  try {
    const data = await getMarketData();
    res.json(data ?? []);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /meta/market/history?symbol=BTC-USD&range=1d
 * range: "1d" | "1w" | "1m"
 */
router.get("/market/history", async (req, res, next) => {
  try {
    const symbol = String(req.query.symbol || "BTC-USD");
    const range = String(req.query.range || "1d");
    const allowed = new Set([
      ...SYMBOLS.map((s) => s.symbol),
      ...ALL_YAHOO_SYMBOLS.map((s) => s.symbol),
    ]);
    if (!allowed.has(symbol)) {
      return res.status(400).json({ error: "unknown_symbol" });
    }
    const ALLOWED_RANGES = ["1d", "1w", "1m"];
    if (!ALLOWED_RANGES.includes(range)) {
      return res.status(400).json({ error: "unknown_range" });
    }
    const data = await getMarketHistory(symbol, range);
    if (!data) return res.status(502).json({ error: "upstream_failed" });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /meta/market/symbols
 * Returns list of tracked symbols with labels and categories
 */
router.get("/market/symbols", async (_req, res) => {
  res.json(SYMBOLS);
});

const ALLOWED_CATEGORIES = Object.keys(CATEGORY_MAP);

/**
 * GET /meta/market/category?name=nse
 */
router.get("/market/category", async (req, res, next) => {
  try {
    const name = String(req.query.name || "");
    if (!ALLOWED_CATEGORIES.includes(name)) {
      return res.status(400).json({ error: "unknown_category" });
    }
    const quotes = await getCategoryQuotes(name);
    res.json(quotes);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /meta/market/crypto-top?limit=50
 */
router.get("/market/crypto-top", async (req, res, next) => {
  try {
    const raw = Number(req.query.limit ?? 50);
    const limit = Number.isFinite(raw) && raw > 0 && raw <= 100 ? raw : 50;
    const quotes = await getTopCrypto(limit);
    res.json(quotes);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /meta/market/movers
 */
router.get("/market/movers", async (_req, res, next) => {
  try {
    const movers = await getMovers();
    res.json(movers);
  } catch (err) {
    next(err);
  }
});

export default router;


