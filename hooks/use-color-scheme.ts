"use client";

import { useEffect, useState } from "react";

export type ColorScheme = "light" | "dark" | "unspecified";

export function useColorScheme(): ColorScheme {
  const [scheme, setScheme] = useState<ColorScheme>("unspecified");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setScheme(media.matches ? "dark" : "light");
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return scheme;
}
