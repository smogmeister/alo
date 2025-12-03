import { Region } from "./regions";

export interface RegionCardContent {
  title: string;
  image: string;
  link: string;
}

export interface Card {
  id: string;
  priority: number;
  regions: Record<Region, RegionCardContent>;
}

export interface CardsData {
  cards: Card[];
}

