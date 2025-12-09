import { ProfileHeader } from "@/components/profile-header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { loadProfile } from "@/lib/profile";
import { detectRegionFromHeaders } from "@/lib/region-detection";
import { RegionClientWrapper, RegionProvider } from "@/components/region-client-wrapper";

export default async function Home() {
  const profile = loadProfile();
  const detectedRegion = await detectRegionFromHeaders();

  return (
    <RegionProvider initialRegion={detectedRegion}>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 pb-8 pt-1 max-w-6xl">
          <div className="mt-1 md:mt-4">
            <RegionClientWrapper showCards>
              <ProfileHeader profile={profile} region={detectedRegion} />
            </RegionClientWrapper>
          </div>
        </main>

        <Footer />
        <CookieBanner />
      </div>
    </RegionProvider>
  );
}
