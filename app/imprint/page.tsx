import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint | Smog",
  description: "Legal imprint information",
};

export default function ImprintPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Imprint</h1>
      <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
        <p>
          This is a placeholder page for the imprint information. Please fill in
          your legal details here.
        </p>
        <p>
          The imprint should include information such as:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Name and address of the website owner</li>
          <li>Contact information</li>
          <li>If applicable: company registration number</li>
          <li>If applicable: VAT identification number</li>
          <li>Responsible for content</li>
        </ul>
      </div>
    </div>
  );
}

