import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import style from "./header.module.css";
import { comumHeaderLinks } from "../ListaNav";


//#region Icons com SVG
    function MenuIcon({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
    }

    function CloseIcon({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
    }
//#endregion

export default function HeaderComum(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", onKey);
    } else {
      document.removeEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 120);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!navRef.current) return;
      if (isOpen && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((s) => !s);

  return (
    <header className={style.header}>
      <a href="/" className={style.containerLogo}>
        <h1>Sua Logo</h1>
      </a>


      <nav className={ style.navDesktop }>
        <ul className={style.containerLinksDesktop}>
              {comumHeaderLinks.map((link, idx) => (
                <li key={link.key}>
                  <a
                    ref={idx === 0 ? firstLinkRef : link.rel}
                    href={link.href}
                    aria-label={link.label}
                    tabIndex={0}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
      </nav>


      <button
        className={style.toggleMenu}
        onClick={toggleMenu}
        aria-label="Menu"
        aria-controls="main-nav"
        aria-expanded={isOpen}
        style={{ zIndex: 40, position: "relative", border: "none", background: "transparent", padding: 8 }}
      >
        {isOpen ? <CloseIcon size={26} /> : <MenuIcon size={26} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="main-nav"
            ref={navRef}
            className={style.nav}
            initial={{ x: "50%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "50%", opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut"}}
            aria-hidden={!isOpen}
          >
            <ul className={style.containerLinks}>
              {comumHeaderLinks.map((link, idx) => (
                <li key={link.key}>
                  <a
                    ref={idx === 0 ? firstLinkRef : link.rel}
                    href={link.href}
                    aria-label={link.label}
                    onClick={() => setIsOpen(false)}
                    tabIndex={0}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
