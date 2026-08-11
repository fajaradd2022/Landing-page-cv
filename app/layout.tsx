import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { person } from "@/lib/content";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = "MOH. FAJAR SODIQ — IT Manager | Infrastructure | DevOps | Networking";
const description =
  "Portfolio of Moh. Fajar Sodiq, an IT Manager specializing in infrastructure, networking, DevOps, IoT, software, and IT project leadership.";

export const metadata: Metadata = {
  metadataBase: new URL(person.website),
  title,
  description,
  openGraph: {
    title,
    description,
    url: person.website,
    siteName: person.fullName,
    images: ["/images/profile.jpg"],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/profile.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.fullName,
  jobTitle: person.role,
  worksFor: {
    "@type": "Organization",
    name: person.company,
  },
  email: `mailto:${person.email}`,
  telephone: person.phone,
  url: person.website,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-charcoal text-cream overflow-x-hidden">
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
