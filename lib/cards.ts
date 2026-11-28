import { Card } from "@/types/cards";
import cardsData from "@/data/cards.json";

/** The cards that have a US link, in priority order. The one place this rule lives. */
export function getCards(): Card[] {
  return (cardsData.cards as Card[])
    .filter((card) => card.links.usa)
    .toSorted((a, b) => a.priority - b.priority);
}
