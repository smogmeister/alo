import { Card as CardComponent } from "./card";
import { Card } from "@/types/cards";

interface CardGridProps {
  cards: Card[];
}

export function CardGrid({ cards }: CardGridProps) {
  if (cards.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed py-16 text-center text-sm text-muted-foreground">
        <p>No products available right now. Check back soon.</p>
      </div>
    );
  }

  // The first featured card becomes the hero tile at the top of the grid.
  const heroIndex = cards.findIndex((card) => card.featured);
  const ordered =
    heroIndex > 0
      ? [cards[heroIndex], ...cards.filter((_, i) => i !== heroIndex)]
      : cards;
  const hasHero = heroIndex !== -1;

  return (
    <ul
      className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-6 p-0 md:grid-cols-3 md:gap-x-5 md:gap-y-8 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10"
      role="list"
      aria-label="Product recommendations list"
    >
      {ordered.map((card, index) => {
        const isHero = hasHero && index === 0;
        return (
          <li key={card.id} className={isHero ? "reveal col-span-2 md:row-span-2" : "reveal"}>
            <CardComponent card={card} index={index} variant={isHero ? "hero" : "default"} />
          </li>
        );
      })}
    </ul>
  );
}
