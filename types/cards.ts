export interface CountryLinks {
  usa?: string;
  canada?: string;
  germany?: string;
  uk?: string;
}

export interface Card {
  id: string;
  priority: number;
  title: string;
  /** Shown as the large first tile */
  featured?: boolean;
  image: string;
  links: CountryLinks;
}
