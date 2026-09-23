"use client";

import { useContext } from "react";
import { ContactContext } from "./ContactProvider";

// Same markup/classes as a normal <a className="btn ...">, bas onClick pe
// scroll ki jagah modal khol deta hai. href="#contact" fallback rehta hai
// (JS na chale to purana scroll behaviour hi milega).
export default function ContactTriggerLink({
  plan = null,
  className,
  children,
}) {
  const openContact = useContext(ContactContext);

  return (
    <a
      href="#contact"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openContact(plan);
      }}
    >
      {children}
    </a>
  );
}