import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.altibyan.online"),
  title: "التبيان | تعلّم القرآن واللغة العربية",
  description:
    "منصة تعليمية متخصصة في تعليم القرآن الكريم والتجويد واللغة العربية والعلوم الشرعية.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "التبيان | تعلّم القرآن واللغة العربية",
    description:
      "منصة تعليمية متخصصة في تعليم القرآن الكريم والتجويد واللغة العربية والعلوم الشرعية.",
    url: "https://www.altibyan.online",
    siteName: "التبيان",
    images: [
      {
        url: "/logo/logo-512.png",
        width: 512,
        height: 512,
        alt: "شعار التبيان",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" data-theme="dark" data-accent="blue" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{var d=document.documentElement,t=localStorage.getItem('altibyan-theme'),a=localStorage.getItem('altibyan-accent');if(t!=='light'&&t!=='dark')t='dark';if(!['blue','emerald','violet','amber','cyan'].includes(a))a='blue';d.dataset.theme=t;d.dataset.accent=a;d.style.colorScheme=t}catch(e){}})();`}</Script>
        {children}
      </body>
    </html>
  );
}
