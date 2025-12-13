import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Smog",
  description: "Data privacy and cookie policy",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Data Privacy Policy</h1>
      <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            1. Data Collection
          </h2>
          <p>
            This is a placeholder privacy policy. Please fill in your actual
            data privacy information here.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            2. Cookie Usage
          </h2>
          <p>
            We use cookies to enhance your browsing experience. You can manage
            your cookie preferences through the cookie banner.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            3. Region Detection
          </h2>
          <p>
            This website detects your region based on your IP address to show
            region-specific content. This information is processed server-side
            and not stored permanently.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            4. Your Rights
          </h2>
          <p>
            Under GDPR and other applicable data protection laws, you have the
            right to access, rectify, or delete your personal data. Please
            contact us if you have any questions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            5. Contact
          </h2>
          <p>
            For questions about this privacy policy, please contact us through
            the information provided in the imprint.
          </p>
        </section>
      </div>
    </div>
  );
}














