export interface Article {
  id: string;
  title: string;
  link: string;
  source: string;
  author?: string | null;
  publishedAt: Date;
  summary?: string | null;
  content?: string | null;
  tags: string[];
  imageUrl?: string | null;
  fingerprint: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  preferences?: Preference | null;
  createdAt: Date;
}

export interface Preference {
  categories: string[];
  sources: string[];
}

export interface FeedItem extends Article {
  score?: number;
}

export interface Source {
  id: string;
  name: string;
  url: string;
  type: 'rss' | 'api';
}
