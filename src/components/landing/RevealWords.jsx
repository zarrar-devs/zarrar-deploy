import { Fragment } from "react";
import styles from "./Landing.module.css";

/* Renders a heading as individually masked words, so GSAP can slide
   each one up from behind its own line (the same device the rest of the
   landing page uses). The words are real text nodes separated by real
   spaces, so search engines and screen readers read a normal sentence.
   A word given as { stamp: "normal" } becomes a stamped, struck-through
   mono box (the Hero's boxed-word device). */
export default function RevealWords({ words }) {
  return words.map((word, i) => {
    const isStamp = typeof word === "object";
    return (
      <Fragment key={i}>
        <span className={styles.wMask}>
          <span className={`${styles.w}${isStamp ? ` ${styles.stamp}` : ""}`}>
            {isStamp ? word.stamp : word}
          </span>
        </span>{" "}
      </Fragment>
    );
  });
}
