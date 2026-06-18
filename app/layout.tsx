import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-alpha-five-1ka0417h0y.vercel.app"),
  title: {
    default: "Mian Muhammad Athar - Solo Product Engineer",
    template: "%s | Mian Muhammad Athar",
  },
  description:
    "Solo product engineer building mobile apps, SaaS products, AI workflows, and games from idea to shipped product.",
  openGraph: {
    title: "Mian Muhammad Athar - Solo Product Engineer",
    description:
      "From idea to shipped product. Mobile apps, SaaS systems, AI workflows, and games built with disciplined AI-assisted development.",
    url: "/",
    siteName: "Mian Muhammad Athar Portfolio",
    images: [
      {
        url: "/55D670AB-C554-4417-86F0-C65863EDE18E.PNG",
        width: 1200,
        height: 630,
        alt: "Mian Muhammad Athar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mian Muhammad Athar - Solo Product Engineer",
    description:
      "From idea to shipped product. Mobile apps, SaaS systems, AI workflows, and games.",
    images: ["/55D670AB-C554-4417-86F0-C65863EDE18E.PNG"],
  },
};

const themeScript = `
(() => {
  try {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : prefersDark
        ? "dark"
        : "light";

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
