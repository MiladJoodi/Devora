import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Devora | Share ideas",
  description: "Share ideas, discover knowledge, and connect with developers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >

      <body className={`${poppins.className} min-h-full flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
