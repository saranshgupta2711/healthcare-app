import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Federant } from "next/font/google";
import { Comic_Neue } from "next/font/google";
import {Providers} from "./providers";
const inter = Inter({ subsets: ["latin"] });
const federant= Federant({ weight: '400',
  subsets: ['latin'],})
const comic= Comic_Neue({
  weight: '400',
  subsets: ['latin'],

})
export const metadata: Metadata = {
  title: "Patients",
  description:"Welcome!",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={comic.className}><Providers>{children}</Providers></body>
      
    </html>
  );
}
