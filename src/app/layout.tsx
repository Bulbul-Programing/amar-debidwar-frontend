import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import { Suspense } from "react";
import LoginSuccessToast from "@/components/Shared/LoginSuccessToast";
import LogoutSuccessToast from "@/components/Shared/LogoutSuccessToast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amar Debidwar",
  description: "Create, submit, and manage complaints with details like title, description, category, photo, and location. Efficiently track and organize complaints with a user-friendly interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-7xl mx-auto">
          <ThemeProvider>
            {children}
            <Toaster richColors />
          </ThemeProvider>
          <Suspense fallback={null}>
            <LoginSuccessToast />
            <LogoutSuccessToast />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
