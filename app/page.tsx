import { ProfileHeader, getInitials } from "@/components/profile-header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { CardGrid } from "@/components/card-grid";
import { TopBar } from "@/components/top-bar";
import { loadProfile } from "@/lib/profile";
import { getCards } from "@/lib/cards";

export default function Home() {
  const profile = loadProfile();
  const cards = getCards();

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <TopBar name={profile.name} image={profile.image} initials={getInitials(profile.name)} />

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

            <CardGrid cards={cards} />
          </section>
        </article>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
