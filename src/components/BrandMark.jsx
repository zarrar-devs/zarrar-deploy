import Link from "next/link";
import { BRAND, ROUTES } from "@/lib/site";

/* The ONE place the wordmark at the top of every page is defined.
   Look and feel live in the `.brand-mark` rule in globals.css, copied
   from the landing page nav (Space Grotesk, 700, 1.05rem, +0.03em,
   uppercase). Pages must not restyle it — pass `className` only for
   layout (e.g. grid alignment), never for font, weight or size.

   The text is written as "Zarrar" (matches Organization schema and
   the title tags) and shown as ZARRAR with CSS text-transform, so
   screen readers say the word instead of spelling letters. */
export default function BrandMark({ className = "", ...rest }) {
  return (
    <Link
      href={ROUTES.home}
      className={`brand-mark${className ? ` ${className}` : ""}`}
      aria-label={`${BRAND} — home`}
      {...rest}
    >
      {BRAND}
    </Link>
  );
}
