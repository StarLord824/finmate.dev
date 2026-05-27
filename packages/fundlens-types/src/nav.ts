export interface NavPoint {
  date: string;
  nav: number;
}

export interface NavSeries {
  schemeSlug: string;
  points: NavPoint[];
}
