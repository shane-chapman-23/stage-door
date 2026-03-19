export type NavLink = {
  label: string;
  to: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Newsletters", to: "/newsletters" },
];
