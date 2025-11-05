import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { UserContextProvider } from "./context/user.context";

const rubik = localFont({
  src: "./fonts/Rubik-Regular.ttf",
  variable: "--font-rubik",
  display: "swap",
});

const handlee = localFont({
  src: "./fonts/Handlee-Regular.ttf",
  variable: "--font-handlee",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peluditos",
  description: "Peluquería canina - Turnos online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${rubik.variable} ${handlee.variable}`}>
      <UserContextProvider>
        <body>{children}</body>
      </UserContextProvider>
    </html>
  );
}
