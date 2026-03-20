import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { navLinks } from "@/data/navLinks";

import HamburgerIcon from "./HamburgerIcon";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors duration-200 hover:text-highlight text-sm
   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight
   ${isActive ? "text-highlight" : ""}`;

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);
  const wasOpenRef = useRef(false);

  // Reuse one close function anywhere the mobile menu should shut.
  const closeMenu = () => setMenuOpen(false);

  // Desktop nav links.
  const desktopLinks = navLinks.map((link) => (
    <NavLink key={link.to} to={link.to} className={navLinkClass}>
      {link.label}
    </NavLink>
  ));

  // Mobile nav links.
  // The first link gets a ref so focus can move there when the menu opens.
  const mobileLinks = navLinks.map((link, index) => (
    <NavLink
      key={link.to}
      to={link.to}
      ref={index === 0 ? firstMobileLinkRef : undefined}
      onClick={closeMenu}
      className={navLinkClass}
    >
      {link.label}
    </NavLink>
  ));

  // Allows user to close the mobile menu with the Escape key.
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // On menu open, move focus to the first mobile link.
  // On menu close, return focus to the hamburger button.
  useEffect(() => {
    if (menuOpen) {
      firstMobileLinkRef.current?.focus();
    } else if (wasOpenRef.current) {
      buttonRef.current?.focus();
    }

    wasOpenRef.current = menuOpen;
  }, [menuOpen]);

  // Closes the mobile menu if user clicks outside the menu and button.
  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // If the viewport becomes desktop-sized, close the mobile menu
  // so it does not reappear when shrinking back down.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="relative flex h-20 items-center justify-center gap-6 px-4 py-2">
      <div className="z-10 flex h-10 flex-1 items-center justify-start">
        Logo Placeholder
      </div>

      <div className="hidden items-center gap-20 md:flex md:flex-1">
        {desktopLinks}
      </div>

      <div className="flex w-full justify-end md:hidden">
        <HamburgerIcon
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          buttonRef={buttonRef}
        />
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className={`fixed top-0 right-0 flex h-full w-full transform flex-col gap-7 bg-surface shadow-md px-4 py-20 transition-transform duration-200 min-[500px]:w-[400px] md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {mobileLinks}
      </div>
    </nav>
  );
}
