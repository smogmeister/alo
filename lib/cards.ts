import { CardsData, Card, RegionCardContent } from "@/types/cards";
import { Region } from "@/types/regions";
import cardsData from "@/data/cards.json";

/**
 * Loads and returns all card data
 */
export function loadCardsData(): CardsData {
  return cardsData as CardsData;
}

/**
 * Gets cards sorted by priority for a specific region
 */
export function getCardsForRegion(region: Region): Array<{
  id: string;
  priority: number;
  content: RegionCardContent;
}> {
  const data = loadCardsData();
  const cards = data.cards
    .map((card) => ({
      id: card.id,
      priority: card.priority,
      content: card.regions[region],
    }))
    .filter((card) => card.content) // Filter out cards without content for this region
    .sort((a, b) => a.priority - b.priority); // Sort by priority ascending

  return cards;
}

/**
 * Gets a specific card's content for a region
 */
export function getCardContent(
  cardId: string,
  region: Region
): RegionCardContent | null {
  const data = loadCardsData();
  const card = data.cards.find((c) => c.id === cardId);
  if (!card) return null;
  return card.regions[region] || null;
}


