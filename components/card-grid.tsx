import { Card as CardComponent } from "./card";
import { Card } from "@/types/cards";

interface CardGridProps {
  cards: Card[];
}

export function CardGrid({ cards }: CardGridProps) {
  const filteredCards = cards.filter((card) => card.links.usa);

  if (filteredCards.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No products available for this region.</p>
      </div>
    );
  }

  return (
    <ul
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 list-none p-0 m-0"
      role="list"
      aria-label="Product recommendations list"
    >
      {filteredCards.map((card) => (
        <li key={card.id}>
          <CardComponent card={card} />
        </li>
      ))}
    </ul>
  );
}
