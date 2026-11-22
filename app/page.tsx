import { ProfileHeader } from "@/components/profile-header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { CardGrid } from "@/components/card-grid";
import { loadProfile } from "@/lib/profile";
import { getCards } from "@/lib/cards";

export default function Home() {
  const profile = loadProfile();
  const cards = getCards();

  return (
    <div className="flex min-h-screen flex-col">
      <main
        className="container mx-auto max-w-6xl flex-1 px-4 pb-12 md:px-6"
        role="main"
        aria-label="Main content"
      >
        <article>
          <header>
            <ProfileHeader profile={profile} />
          </header>

          <section aria-labelledby="picks-heading" className="mt-2 md:mt-4">
            <h2 id="picks-heading" className="sr-only">
              Recommended products
            </h2>

            <CardGrid cards={cards} />

            <p className="mx-auto mt-8 max-w-md text-balance text-center text-xs leading-relaxed text-muted-foreground">
              As an Amazon Associate I earn from qualifying purchases. Buying through
              these links supports me at no extra cost to you.
            </p>
          </section>
        </article>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
