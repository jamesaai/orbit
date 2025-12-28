import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import { Providers } from "./providers";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Orbit - Staff Management Solution",
    template: "%s | Orbit",
  },
  description: "The all-in-one staff management solution for Roblox groups",
  keywords: ["Roblox", "staff management", "workspace", "team management"],
  authors: [{ name: "Planetary" }],
  creator: "Planetary",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Orbit",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `console.info('%c %cOrbit%c — The All In One Staff Management Solution%c\\n\\nUnder no circumstances should you paste anything into this console. 11/10 times you are asked will be scams.', 'padding-left: 2.5em; line-height: 4em; background-size: 2.5em; background-repeat: no-repeat; background-position: left center; background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDU3LjE0MSA5Ny42MjE0QzQxMC4yNiAzOC4xNjc0IDMzNy41ODUgMCAyNTUuOTkzIDBDMTgxLjMwNSAwIDExNC4wODYgMzEuOTgyOSA2Ny4yODcxIDgyLjk5OTdDMTE5LjQwNCA3Ni42MzgyIDE2Ni41OTIgNzguMjY1MSAyMDkuMDggODYuNTkyOEMyNTMuMDE0IDk1LjIwNDUgMjkxLjU3MSAxMTAuOTE2IDMyNS4wNDEgMTMxLjk5OEMzNjMuNzc0IDEyMi42NTQgNDAxLjYgMTEzLjU3MSA0MzcuNzA5IDEwNS4wMjJDNDQyLjk3IDEwMy42NzggNDQ5LjQ3NyAxMDEuMTk4IDQ1Ny4xNDEgOTcuNjIxNFpNNC4zNDEyNSAyMDguNzI0QzEwLjIzMjkgMTc3LjE2OCAyMS45MTQxIDE0Ny42NDkgMzguMjQwNCAxMjEuMzEyQzEwMC45MiAxMDkuODQ3IDE1NS41MDUgMTEwLjIyNSAyMDIuNjM2IDExOS40NjJDMjI5LjYwNCAxMjQuNzQ5IDI1NC4yOTEgMTMyLjk2NiAyNzYuODA3IDE0My42NUwyNjEuOTA3IDE0Ny4yNTNDMTc1LjQ5MSAxNjguMTQ5IDg2LjgwNjEgMTg5LjU5NCA0LjM0MTI1IDIwOC43MjRaTTAgMjUzLjE4QzAuMDMzMDAxOCAyNTAuMTIzIDAuMTE5NjAyIDI0Ny4wNzggMC4yNTg5MDMgMjQ0LjA0N0M4Ni42MTYgMjI0LjEwNiAxODAuMTQxIDIwMS40ODkgMjcwLjg0MSAxNzkuNTU3QzI4Ni45MDQgMTc1LjY3MiAzMDIuODc5IDE3MS44MDggMzE4LjcxIDE2Ny45ODZDMzQ5LjQ5MSAxODkuNDgyIDM3NS4xNDIgMjE2LjI2IDM5Ni4wODMgMjQ2LjU1QzQwOC4zNjYgMjY0LjMxOCA0MTkuMDM4IDI4My4zMTQgNDI4LjE1NiAzMDMuMTczQzM3MS43OTEgMzI3LjIxMyAzMDguNjM4IDMzNy45MjMgMjM1LjIzNCAzMjkuOEMxNjcuMDc2IDMyMi4yNTggODkuNTQ4NCAyOTguNDE1IDAgMjUzLjE4Wk0yLjQ2MjI3IDI5MS43NTdDMTkuODU3MSA0MTYuMjE1IDEyNi43MzkgNTEyIDI1NS45OTMgNTEyQzM0MC4wMiA1MTIgNDE0LjU5MSA0NzEuNTIgNDYxLjI2OSA0MDguOTk4QzQ1Ni41MDkgMzgzLjUxMSA0NDkuNzQ4IDM1OC4zNjYgNDQwLjg5MSAzMzQuMTUzQzM3OS43IDM2MC4xNzQgMzEwLjk0NSAzNzEuODc5IDIzMS41NDkgMzYzLjA5MkMxNjMuMjY5IDM1NS41MzYgODcuNTkwMyAzMzIuODc5IDIuNDYyMjcgMjkxLjc1N1pNNDg2LjM4NCAzNjcuNzU2QzQ5Ni45NDQgMzQ2LjAyOSA1MDQuNTIgMzIyLjU4NCA1MDguNTgxIDI5Ny45NTNDNDk2LjQ2IDMwNS44MDYgNDg0LjAzOSAzMTMuMDk3IDQ3MS4yODUgMzE5Ljc2MUM0NzcuMTUxIDMzNS40OCA0ODIuMTczIDM1MS41MjYgNDg2LjM4NCAzNjcuNzU2Wk00NzYuMzI2IDEyNS41NjVDNDk4LjgyNCAxNjMuNDg2IDUxMS44MTEgMjA3LjcxMyA1MTIgMjU0Ljk1OEM1MDcuMTU0IDI1OC40ODYgNTAyLjI2NCAyNjEuOTE3IDQ5Ny4zMjQgMjY1LjI0NEM0ODQuNjgyIDI3My43NjIgNDcxLjcxNSAyODEuNjExIDQ1OC4zNzQgMjg4LjcwN0M0NDguNTMyIDI2Ny4zNDIgNDM2Ljk4NCAyNDYuODA5IDQyMy42MzYgMjI3LjUwMkM0MDUuODQ2IDIwMS43NjkgMzg0Ljg3NSAxNzguMjQ5IDM2MC41NjggMTU3Ljg5M0MzODkuNzAyIDE1MC44ODMgNDE4LjE1NSAxNDQuMDcyIDQ0NS41NjEgMTM3LjU4NUw0NDUuNjg3IDEzNy41NTVMNDQ1LjgxMSAxMzcuNTIzQzQ1NC43MjEgMTM1LjI2OCA0NjUuMDI0IDEzMS4xMiA0NzYuMzI2IDEyNS41NjVaIiBmaWxsPSIjRkYwMDk5Ii8+Cjwvc3ZnPgo=")', 'font-weight: bold;', '', 'font-style: italic;');`
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}



