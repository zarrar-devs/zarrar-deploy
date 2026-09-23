import { Space_Grotesk, Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import PageTransition from "../components/PageTransition";
import {
  SITE_URL,
  BRAND,
  HOME_TITLE,
  HOME_DESCRIPTION,
  ROBOTS,
  LOCALE,
} from "@/lib/site";

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

const DEFAULT_TITLE = HOME_TITLE;

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

  description: HOME_DESCRIPTION,

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
    description: HOME_DESCRIPTION,
    /* Image comes from src/app/opengraph-image.jsx, generated at build
       time — no more missing /og-image.jpg. */
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: HOME_DESCRIPTION,
  },

  robots: ROBOTS,

  /* Search Console "HTML tag" verification. Only rendered when the
     env var is set, so no placeholder string ever ships. (A DNS
     "Domain property" in Search Console needs no tag at all.) */
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,

  /* Icons come from Next's file conventions in src/app/ — no icons:
     block needed: favicon.ico (16/32/48), icon.svg, icon.png (192),
     apple-icon.png (180). The Z monogram, not the 1254px wordmark
     that used to sit in icon.png and was unreadable at 16px. */

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
