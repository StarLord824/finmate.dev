export type RawFeedItem = {
    title?: string;
    link?: string;
    content?: string;
    contentSnippet?: string;
    pubDate?: string;
    isoDate?: string;
    [key: string]: any;
}

export type Article = {
    title?: string;
    link?: string;
    summary?: string | null;
    content?: string | null;
    author?: string | null;
    publishedAt: string; //ISO
    imageUrl?: string | null;
    source: string;
    tags?: string[];
    fingerprint?: string;
}