import type { ComponentType } from "react";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Newsletters from "@/pages/Newsletters";

type AppRoute = {
  path: string;
  element: ComponentType;
  label: string;
};

export const routes: AppRoute[] = [
  { path: "/", element: Home, label: "Home" },
  { path: "/about", element: About, label: "About" },
  { path: "/newsletters", element: Newsletters, label: "Newsletters" },
];
