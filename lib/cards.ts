import { CardsData, Card } from "@/types/cards";
import cardsData from "@/data/cards.json";

/**
 * Loads and returns all card data
 */
export function loadCardsData(): CardsData {
  return cardsData as CardsData;
}

/**
 * Gets all cards sorted by priority
 */
export function getCards(): Card[] {
  const data = loadCardsData();
  return data.cards.sort((a, b) => a.priority - b.priority);
}

/**
 * Gets a specific card by ID
 */
export function getCard(cardId: string): Card | null {
  const data = loadCardsData();
  return data.cards.find((c) => c.id === cardId) || null;
}














