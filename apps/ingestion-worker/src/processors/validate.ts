import { Article } from "../types";

export function isValidArticle(a?: Article | null): a is Article {
  if (!a) return false;
  if (!a.title || !a.link || !a.publishedAt || !a.fingerprint) return false;
  return true;
}
