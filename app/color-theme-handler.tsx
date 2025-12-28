"use client";

import { useRecoilState } from "recoil";
import { workspacestate } from "@/state";
import { useEffect } from "react";
import hexRgb from "hex-rgb";
import * as colors from "tailwindcss/colors";

function getRGBFromTailwindColor(tw: any): string {
  const fallback = "236, 72, 153"; // pink-500

  if (!tw || typeof tw !== "string") {
    if (tw !== null && tw !== undefined) {
      console.warn("Invalid color value:", tw);
    }
    return fallback;
  }

  const colorName = tw.replace("bg-", "");

  if (colorName === "orbit") {
    return "0, 112, 240";
  }

  const colorMap: Record<string, string> = {
    "blue-500": "59, 130, 246",
    "red-500": "239, 68, 68",
    "red-700": "185, 28, 28",
    "green-500": "34, 197, 94",
    "green-600": "22, 163, 74",
    "yellow-500": "234, 179, 8",
    "orange-500": "249, 115, 22",
    "purple-500": "168, 85, 247",
    "pink-500": "236, 72, 153",
    black: "0, 0, 0",
    "gray-500": "107, 114, 128",
  };

  return colorMap[colorName] || fallback;
}

function useTheme(groupTheme: string): string {
  const themes: Record<string, string> = {
    "bg-pink-100": colors.pink[100],
    "bg-rose-100": colors.rose[100],
    "bg-orange-100": colors.orange[100],
    "bg-amber-100": colors.amber[100],
    "bg-lime-100": colors.lime[100],
    "bg-emerald-100": colors.emerald[100],
    "bg-cyan-100": colors.cyan[100],
    "bg-sky-100": colors.sky[100],
    "bg-indigo-100": colors.indigo[100],
    "bg-purple-100": colors.purple[100],
    "bg-pink-400": colors.pink[400],
    "bg-rose-400": colors.rose[400],
    "bg-orange-400": colors.orange[400],
    "bg-amber-400": colors.amber[400],
    "bg-lime-400": colors.lime[400],
    "bg-emerald-400": colors.emerald[400],
    "bg-cyan-400": colors.cyan[400],
    "bg-sky-400": colors.sky[400],
    "bg-indigo-400": colors.indigo[400],
    "bg-violet-400": colors.violet[400],
    "bg-orbit": "#FF0099",
    "bg-rose-600": colors.rose[600],
    "bg-orange-600": colors.orange[600],
    "bg-amber-600": colors.amber[600],
    "bg-lime-600": colors.lime[600],
    "bg-emerald-600": colors.emerald[600],
    "bg-cyan-600": colors.cyan[600],
    "bg-sky-600": colors.sky[600],
    "bg-indigo-600": colors.indigo[600],
    "bg-violet-600": colors.violet[600],
    "bg-blue-500": colors.blue[500],
    "bg-red-500": colors.red[500],
    "bg-red-700": colors.red[700],
    "bg-green-500": colors.green[500],
    "bg-green-600": colors.green[600],
    "bg-yellow-500": colors.yellow[500],
    "bg-orange-500": colors.orange[500],
    "bg-purple-500": colors.purple[500],
    "bg-pink-500": colors.pink[500],
    "bg-black": colors.black,
    "bg-zinc-500": colors.gray[500],
  };
  const hex = hexRgb(themes[groupTheme] || "#FF0099");
  return `${hex.red} ${hex.green} ${hex.blue}`;
}

export function ColorThemeHandler() {
  const [workspace] = useRecoilState(workspacestate);

  useEffect(() => {
    const defaultColor = "236, 72, 153";

    if (
      workspace &&
      workspace.groupTheme &&
      typeof workspace.groupTheme === "string"
    ) {
      const rgbValue = useTheme(workspace.groupTheme);
      document.documentElement.style.setProperty("--group-theme", rgbValue);
    } else {
      document.documentElement.style.setProperty("--group-theme", defaultColor);
    }
  }, [workspace]);

  return null;
}

