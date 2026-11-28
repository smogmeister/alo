import { ProfileHeader } from "@/components/profile-header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { CardGrid } from "@/components/card-grid";
import { TopBar } from "@/components/top-bar";
import profileData from "@/data/profile.json";
import type { Profile } from "@/types/profile";
import { getCards } from "@/lib/cards";
import { siteUrl } from "@/lib/site";

// Rebuild the static page daily so the footer's copyright year never goes stale.
export const revalidate = 86400;

export default function Home() {
  const profile = profileData as Profile;
  const products = getCards();

  // Describes the shelf as an ordered list of products for search engines.
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/#products`,
    name: `${profile.name}'s recommended products`,
    numberOfItems: products.length,
    itemListElement: products.map((card, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: card.title.trim(),
      url: card.links.usa,
      image: card.image,
    })),
  };

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <TopBar name={profile.name} image={profile.image} />

      <main
        className="animate-quiet-enter mx-auto w-full max-w-[1040px] flex-1 px-5 md:px-8"
        role="main"
        aria-label="Main content"
      >
        <article>
          <header>
            <ProfileHeader profile={profile} />
          </header>

          <section aria-labelledby="picks-heading">
            <h2 id="picks-heading" className="sr-only">
              Recommended products
            </h2>

            <CardGrid cards={products} />
          </section>
        </article>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <Footer />
      <CookieBanner />
    </div>
  );
}
