import type { Metadata } from "next";
import "./globals.css";
import Nav  from "@/components/Navbar/Nav";

export const metadata: Metadata = {
  title: "Unstandard Next.js App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
