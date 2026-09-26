import Link from "next/link";
import {
  BRAND,
  CONTACT_EMAIL,
  HOME_DESCRIPTION,
  PERSONAS,
  ROUTES,
  SERVICES,
} from "@/lib/site";
import { OgMark } from "@/lib/og-mark";
import styles from "./SiteFooter.module.css";

/* Site-wide footer — a SERVER component (no "use client", no GSAP), so
   every link below is plain HTML in the first response Googlebot gets.

   Why it exists: before this, the only way to reach the persona pages
   (/speakers, /coaches ...) was the hero dropdown on the homepage, and
   the inner pages linked to almost nothing. Now every page links to
   every other page, with descriptive anchor text, and shows one
   consistent business identity (name, email, what we do). All of it
   comes from src/lib/site.js, so it can never disagree with the
   schema or the sitemap.

   Wired in once, in src/app/layout.jsx. */

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href={ROUTES.home} className={styles.brandLink} aria-label={`${BRAND} — home`}>
            <OgMark size={40} tile="#232326" />
            <span className={styles.brandName}>{BRAND}</span>
          </Link>
          <p className={styles.blurb}>{HOME_DESCRIPTION}</p>
        </div>

        <nav className={styles.col} aria-label="Services">
          <h2 className={styles.heading}>What we do</h2>
          <ul className={styles.list}>
            {SERVICES.map((s) => (
              <li key={s.name}>
                <Link href={s.href || ROUTES.services}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Who we work with">
          <h2 className={styles.heading}>Who we work with</h2>
          <ul className={styles.list}>
            {PERSONAS.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.heading}>Contact</h2>
          <ul className={styles.list}>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>
              <Link href={ROUTES.contact}>Contact Zarrar</Link>
            </li>
            <li>
              <Link href={ROUTES.services}>Service plans</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          &copy; {year} {BRAND}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
