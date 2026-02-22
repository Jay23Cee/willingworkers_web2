"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ovswwLogo from "../public/assets/ovs_ww.png";

export type NavProps = {
  userImageSrc?: string;
  currentPage?: "home" | "programs" | "about" | "contact" | "career";
  showPrimaryCta?: boolean;
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
};

const navLinks: Array<{
  key: NonNullable<NavProps["currentPage"]>;
  label: string;
  href: string;
}> = [
  { key: "home", label: "Home", href: "/" },
  { key: "programs", label: "Programs", href: "/programs" },
  { key: "about", label: "About", href: "/about" },
  { key: "contact", label: "Contact", href: "/contact" },
  { key: "career", label: "Career", href: "/career" },
];

export default function Nav({
  userImageSrc,
  currentPage,
  showPrimaryCta = true,
  primaryCtaHref = "/programs",
  primaryCtaLabel = "Explore Programs",
}: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isMenuOpen || !navRef.current) {
        return;
      }

      if (!navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="site-nav" ref={navRef}>
      <div className="site-nav__inner section-shell">
        <Link href="/" className="site-nav__brand" aria-label="Willing Workers home">
          <Image
            src={ovswwLogo}
            alt="Willing Workers logo"
            width={58}
            height={58}
            className="site-nav__logo"
            priority
          />
          <span className="site-nav__brand-text">Willing Workers</span>
        </Link>

        <button
          type="button"
          className="site-nav__menu-button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`site-nav__links${isMenuOpen ? " site-nav__links--open" : ""}`}>
          {navLinks
            .filter((link) => link.key !== currentPage)
            .map((link) => (
              <li key={link.key}>
                <Link href={link.href} onClick={closeMenu} className="site-nav__link">
                  {link.label}
                </Link>
              </li>
            ))}

          {showPrimaryCta && (
            <li>
              <Link
                href={primaryCtaHref}
                onClick={closeMenu}
                className="site-nav__primary-cta"
              >
                {primaryCtaLabel}
              </Link>
            </li>
          )}

          {userImageSrc && (
            <li>
              <Image
                src={userImageSrc}
                alt="Signed in user profile"
                width={44}
                height={44}
                className="site-nav__user-image"
                priority
              />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
