export type CountryCode = 'usa' | 'canada' | 'germany' | 'uk';

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
  /** Highlights the card with a "Favourite" badge */
  featured?: boolean;
  image: string;
  links: CountryLinks;
}

export interface CardsData {
  cards: Card[];
}














