"use client";

import { createContext, useCallback, useState } from "react";
// ⚠️ Adjust this path to wherever ContactModal.jsx actually lives in your project
import ContactModal from "@/components/ContactModal/ContactModal";
export const ContactContext = createContext(() => {});

export default function ContactProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState(null);

  const openContact = useCallback((planName = null) => {
    setPlan(planName);
    setIsOpen(true);
  }, []);

  const closeContact = useCallback(() => setIsOpen(false), []);

  return (
    <ContactContext.Provider value={openContact}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeContact} plan={plan} />
    </ContactContext.Provider>
  );
}