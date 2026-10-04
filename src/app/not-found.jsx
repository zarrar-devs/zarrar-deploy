import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import { BRAND, PERSONAS, ROUTES } from "@/lib/site";

/* Custom 404. Next.js already sends a real 404 status; this page just
   keeps visitors (and crawlers) inside the site instead of dead-ending.
   noindex so a mistyped URL can never end up in Google's index, but
   follow stays on so the links below are still crawled. */
export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const wrap = {
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 20,
  padding: "clamp(96px, 14vw, 160px) clamp(20px, 6vw, 80px) 64px",
  background: "#f2eee3",
  color: "#0b0b0c",
  fontFamily: "var(--font-body, system-ui, sans-serif)",
};
const link = { color: "#d01c12", textDecoration: "underline", textUnderlineOffset: 4 };

export default function NotFound() {
  return (
    <main style={wrap}>
      <BrandMark style={{ alignSelf: "flex-start" }} />
      <p style={{ margin: 0, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, opacity: 0.6 }}>
        Error 404
      </p>
      <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 6vw, 4.5rem)", lineHeight: 1.02, letterSpacing: "-0.02em", maxWidth: "16ch" }}>
        This page doesn&rsquo;t exist.
      </h1>
      <p style={{ margin: 0, maxWidth: "52ch", fontSize: "1.05rem", lineHeight: 1.6 }}>
        The link may be old or mistyped. Try one of these instead:
      </p>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: "10px 22px" }}>
        <li><Link style={link} href={ROUTES.home}>{BRAND} home</Link></li>
        <li><Link style={link} href={ROUTES.services}>Services</Link></li>
        {PERSONAS.map((p) => (
          <li key={p.href}><Link style={link} href={p.href}>{p.label}</Link></li>
        ))}
      </ul>
    </main>
  );
}
