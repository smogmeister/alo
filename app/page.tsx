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
      <main className="flex-1 container mx-auto px-4 pb-8 pt-1 max-w-6xl">
        <div className="mt-1 md:mt-4 space-y-4">
          <ProfileHeader profile={profile} />
          <CountryProviderWrapper>
            <CardGrid cards={cards} />
          </CountryProviderWrapper>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
