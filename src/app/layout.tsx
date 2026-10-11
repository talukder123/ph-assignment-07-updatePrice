import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import FooterSection from "@/Components/Footer";
import { Toaster } from "react-hot-toast";


const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BazarDor | বাজার দর",
  description: "Get updated daily market price",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"

      className={`${hindSiliguri.className} h-full antialiased`}
    >
      <body className=" bg-[#f3f6f2] min-h-screen">
        <Navbar></Navbar>
        {children}
        <FooterSection></FooterSection>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
