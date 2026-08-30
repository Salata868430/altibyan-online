import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050d1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "التبيان | تعلّم القرآن واللغة العربية بإتقان",
  description:
    "منصة تعليمية متخصصة في تأهيل معلّمي القراءة العربية وقراءة القرآن الكريم وإتقان التجويد بإشراف الأستاذ خالد العبداللّه.",
  keywords: [
    "القاعدة التبيانية",
    "التبيان",
    "تعليم القرآن",
    "تجويد",
    "القراءة العربية",
    "خالد العبدالله",
    "معهد التبيان حلب",
  ],
  authors: [{ name: "الأستاذ خالد العبداللّه" }],
  icons: {
    icon: "/logo/favicon.svg",
    apple: "/logo/favicon.svg",
  },
  openGraph: {
    title: "التبيان | تعلّم القرآن واللغة العربية بإتقان",
    description:
      "تأهيل احترافي لمعلّمي القراءة العربية وقراءة القرآن الكريم من خلال القاعدة التبيانية بإشراف الأستاذ خالد العبداللّه.",
    url: "https://altibyan.online",
    siteName: "منصة التبيان التعليمية",
    locale: "ar_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "التبيان | تعلّم القرآن واللغة العربية بإتقان",
    description:
      "تأهيل احترافي لمعلّمي القراءة العربية وقراءة القرآن الكريم من خلال القاعدة التبيانية.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={ibmPlexSansArabic.variable} suppressHydrationWarning>
      <body className="antialiased font-sans selection:bg-sky-500 selection:text-white">
        {children}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var d=document.documentElement,t=localStorage.getItem('altibyan-theme'),a=localStorage.getItem('altibyan-accent');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(!['blue','emerald','violet','amber','cyan'].includes(a))a='blue';d.dataset.theme=t;d.dataset.accent=a;d.style.colorScheme=t}catch(e){}})();`}
        </Script>
      </body>
    </html>
  );
}

