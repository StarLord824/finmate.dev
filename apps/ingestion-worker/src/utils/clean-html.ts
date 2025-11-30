import he from "he";

export function stripHtml(html?: string | null): string {
  if (!html) return "";
  // remove tags, decode entities, collapse whitespace
  const withoutTags = html.replace(/<\/?[^>]+(>|$)/g, " ");
  const decoded = he.decode(withoutTags);
  return decoded.replace(/\s+/g, " ").trim();
}

export function summarize(text: string, max = 300): string {
  if (!text) return "";
  return text.length <= max ? text : text.slice(0, max).trim() + "…";
}
