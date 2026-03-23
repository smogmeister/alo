import { ProfileHeader } from "@/components/profile-header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { CardGrid } from "@/components/card-grid";
import { CountryProviderWrapper } from "@/components/country-provider-wrapper";
import { loadProfile } from "@/lib/profile";
import { getCards } from "@/lib/cards";

export default function Home() {
  const profile = loadProfile();
  const cards = getCards();

  return (
    <div className="min-h-screen flex flex-col">
      <main
        className="flex-1 container mx-auto px-4 pb-8 pt-1 max-w-6xl"
        role="main"
        aria-label="Main content"
      >
        <article className="mt-1 md:mt-4 space-y-4">
          <header>
            <ProfileHeader profile={profile} />
          </header>
          <section aria-label="Product recommendations">
            <h2 className="sr-only">Recommended Cleaning and Interior Design Products</h2>
            <CountryProviderWrapper>
              <CardGrid cards={cards} />
            </CountryProviderWrapper>
          </section>
        </article>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
