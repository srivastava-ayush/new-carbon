import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Carbonsynq — Carbon Intelligence, Measured Beautifully",
  description:
    "From carbon accounting to offsetting — all on one platform. Built for accuracy, designed to make decarbonization measurable.",
};

export const viewport: Viewport = {
  themeColor: "#fbfcfa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", poppins.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col ">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
