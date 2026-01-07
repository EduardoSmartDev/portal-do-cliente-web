// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Montserrat, Poppins, Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";


const font = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portal do Cliente",
  description: "Portal do Cliente - Sua plataforma de serviços",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${font.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0f172a", // slate-900
              color: "#f8fafc", // slate-50
              border: "1px solid #1e293b", // slate-800
            },
            success: {
              iconTheme: {
                primary: "#10b981", // emerald-500
                secondary: "#0f172a",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444", // red-500
                secondary: "#0f172a",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
