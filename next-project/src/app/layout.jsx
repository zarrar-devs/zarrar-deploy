import { Space_Grotesk, Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import PageTransition from "../components/PageTransition";
import { SITE_URL, BRAND, ORG_DESCRIPTION, ROBOTS, LOCALE } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const DEFAULT_TITLE =
  "Zarrar — Website Development, Lead Generation & Social Media Agency";

export const metadata = {
  /* metadataBase resolves every relative URL below (canonical, OG
     image, icons) against the real production origin. This was
     "https://your-domain.com" — a placeholder left in from the
     converter — so every canonical tag and OG image URL on the site
     pointed at a domain that isn't yours. Now zarrar.co is official,
     src/lib/site.js is the one place that knows it. */
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${BRAND}`,
  },

  description:
    "Zarrar builds custom websites and portfolios, and runs lead generation, cold email outreach and social media management for speakers, authors, coaches, real estate agents and founders.",

  applicationName: BRAND,
  generator: "Next.js",
  category: "Marketing services",

  keywords: [
    "web development agency",
    "custom website development",
    "portfolio website design",
    "lead generation agency",
    "cold email outreach",
    "cold email agency",
    "social media management",
    "SEO services",
    "website for speakers",
    "website for authors",
    "website for coaches",
    "real estate agent website",
    "founder personal website",
    "Zarrar",
  ],

  authors: [{ name: BRAND, url: SITE_URL }],
  creator: BRAND,
  publisher: BRAND,

  formatDetection: { telephone: false, address: false, email: false },

  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: LOCALE,
    url: "/",
    siteName: BRAND,
    title: DEFAULT_TITLE,
    description: ORG_DESCRIPTION,
    /* Image comes from src/app/opengraph-image.jsx, generated at build
       time — no more missing /og-image.jpg. */
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: ORG_DESCRIPTION,
  },

  robots: ROBOTS,

  /* icon.png / apple-icon.png under src/app/ are picked up
     automatically by Next's file conventions — no icons: block
     needed, and nothing pointing at a /favicon.ico that never
     existed. Both files are your real logo, resized. */

  referrer: "origin-when-cross-origin",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${bricolageGrotesque.variable} ${inter.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <PageTransition>
          <div id="main-content">{children}</div>
        </PageTransition>
      </body>
    </html>
  );
}
