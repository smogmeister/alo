import { Card as CardComponent } from "./card";
import { Card } from "@/types/cards";

interface CardGridProps {
  cards: Card[];
}

export function CardGrid({ cards }: CardGridProps) {
  const filteredCards = cards.filter((card) => card.links.usa);

  if (filteredCards.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed py-16 text-center text-muted-foreground">
        <p>No products available right now. Check back soon.</p>
      </div>
    );
  }

  return (
    <ul
      className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
      role="list"
      aria-label="Product recommendations list"
    >
      {filteredCards.map((card, index) => (
        <li
          key={card.id}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both motion-reduce:animate-none"
          style={{ animationDelay: `${150 + index * 60}ms` }}
        >
          <CardComponent card={card} index={index} />
        </li>
      ))}
    </ul>
  );
}
