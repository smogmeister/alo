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
  image: string;
  links: CountryLinks;
}

export interface CardsData {
  cards: Card[];
}














