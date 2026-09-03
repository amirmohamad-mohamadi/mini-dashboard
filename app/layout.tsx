import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Providers } from "./providers";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Mini Dashboard",
  description: "mini dashboard",
};

const vazirFont = localFont({
  src: "../public/fonts/Vazirmatn-FD-Regular.woff2",
  display: "swap",
  variable: "--font-vazir",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirFont.className} antialiased `}>
        <Providers>
          <div className="min-h-screen bg-white dark:bg-[#09121d] transition-colors duration-300">
            <div className="fixed top-4 left-4 z-50">
              <ThemeToggle />
            </div>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
