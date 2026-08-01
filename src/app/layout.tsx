import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "التبيان | تعلّم القرآن واللغة العربية",
  description:
    "منصة تعليمية متخصصة في تعليم القرآن الكريم والتجويد واللغة العربية والعلوم الشرعية.",
  icons: {
    icon: "/logo/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
      <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{var d=document.documentElement,t=localStorage.getItem('altibyan-theme'),a=localStorage.getItem('altibyan-accent');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(!['blue','emerald','violet','amber','cyan'].includes(a))a='blue';d.dataset.theme=t;d.dataset.accent=a;d.style.colorScheme=t}catch(e){}})();`}</Script>
    </html>
  );
}
