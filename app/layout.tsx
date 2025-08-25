import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-btn";
import { ToastProvider } from "@/components/ui/toast";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Stitches by Q",
  description: "Women’s empowerment through custom fashion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={geistSans.className}>
        <body className="min-h-screen bg-gray-50">
          <ToastProvider>
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
            <WhatsAppButton />
          </ToastProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
