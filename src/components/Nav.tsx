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
  const [showNav, setShowNav] = useState(true);
  const [showHamburger, setShowHamburger] = useState(
    () => window.innerWidth < 768,
  );

  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

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

  useEffect(() => {
    const SCROLL_THRESHOLD = 8;

    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      if (showHamburger) {
        setShowNav(true);
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      lastScrollTimeRef.current = Date.now();

      if (currentScrollY <= 0) {
        setShowNav(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (Math.abs(scrollDelta) < SCROLL_THRESHOLD) {
        return;
      }

      setShowNav(scrollDelta < 0);
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showHamburger]);

  useEffect(() => {
    const handleMouseMove = () => {
      if (showHamburger) return;

      const justScrolled = Date.now() - lastScrollTimeRef.current < 150;

      if (!justScrolled) {
        setShowNav(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showHamburger]);

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

  useEffect(() => {
    const handleFocus = () => {
      setShowNav(true);
    };

    window.addEventListener("focusin", handleFocus);

    return () => window.removeEventListener("focusin", handleFocus);
  }, []);

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
      const hamburgerVisible = window.innerWidth < 768;
      setShowHamburger(hamburgerVisible);

      if (!hamburgerVisible) {
        closeMenu();
      } else {
        setShowNav(true);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-3 flex h-15 w-full items-center justify-center gap-6 px-4 py-2 bg-bg transition-transform duration-200
        ${showHamburger || menuOpen || showNav ? "translate-y-0" : "-translate-y-full"}
      `}
      >
        <div className="flex h-10 flex-1 items-center justify-start">
          Logo Placeholder
        </div>

        <div className="hidden items-center gap-20 md:flex md:flex-1">
          {desktopLinks}
        </div>
      </nav>

      <div className="fixed top-4 right-4 flex z-5 w-full justify-end md:hidden">
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
        className={`fixed top-0 right-0 z-4 flex h-full w-full transform flex-col gap-7 bg-surface shadow-md px-4 py-20 transition-transform duration-200 min-[500px]:w-[400px] md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {mobileLinks}
      </div>
    </>
  );
}
