import { Fragment } from "react";
import Link from "next/link";
import { PERSONAS } from "@/lib/site";

/* Contextual cross-links between the audience pages
   ("Website for Authors · Website for Coaches ...").

   Plain component (no hooks, no "use client") so both server pages
   and the client persona components can render it. Anchor text comes
   from PERSONAS in src/lib/site.js, so the wording is identical to the
   footer and a link can never point at a route that doesn't exist. */
export default function PersonaLinks({ exclude, className }) {
  const items = PERSONAS.filter((p) => p.href !== exclude);
  return (
    <span className={className}>
      {items.map((p, i) => (
        <Fragment key={p.href}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          <Link href={p.href}>{p.anchor || p.label}</Link>
        </Fragment>
      ))}
    </span>
  );
}
