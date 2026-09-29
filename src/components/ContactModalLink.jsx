"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import ContactModal from "./ContactModal/ContactModal";

export default function ContactModalLink({ href, className, plan = null, children }) {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    // new tab / ctrl / cmd / shift click normal chalne do
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <Link href={href} className={className} onClick={handleClick}>
        {children}
      </Link>
      {open &&
        createPortal(
          <ContactModal isOpen onClose={() => setOpen(false)} plan={plan} />,
          document.body
        )}
    </>
  );
}