import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Header } from "@/app/header";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "a functional shopping cart with persistence, coupon discounts, and input validation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <Header />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
