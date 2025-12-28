"use client";

import { useRecoilValue } from "recoil";
import { themeState } from "@/state/theme";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeHandler() {
  const recoilTheme = useRecoilValue(themeState);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    if (recoilTheme && theme !== recoilTheme) {
      setTheme(recoilTheme);
    }
  }, [recoilTheme, setTheme, theme]);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return null;
}



