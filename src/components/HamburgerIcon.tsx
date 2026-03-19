import type { Dispatch, RefObject, SetStateAction } from "react";

type Props = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  buttonRef: RefObject<HTMLButtonElement | null>;
};

const buttonClass =
  "z-10 flex h-10 w-10 cursor-pointer items-center justify-center md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight";

const lineClass =
  "absolute left-0 block h-[2px] bg-current transition-all duration-200";

export default function HamburgerIcon({
  menuOpen,
  setMenuOpen,
  buttonRef,
}: Props) {
  const label = menuOpen ? "Close navigation menu" : "Open navigation menu";

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={() => setMenuOpen((open) => !open)}
      className={buttonClass}
      aria-label={label}
      aria-expanded={menuOpen}
      aria-controls="mobile-menu"
    >
      <span className="sr-only">{label}</span>

      <span className="relative block h-5 w-6">
        <span
          className={`${lineClass} ${
            menuOpen
              ? "top-[4px] w-3 translate-x-3.5 rotate-45"
              : "top-0 w-6 rotate-0"
          }`}
        />

        <span className={`${lineClass} top-2 w-6`} />

        <span
          className={`${lineClass} ${
            menuOpen
              ? "top-[12px] w-3 translate-x-3.5 -rotate-45"
              : "top-4 w-6 rotate-0"
          }`}
        />
      </span>
    </button>
  );
}
