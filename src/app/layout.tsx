import { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Administración | Publicaciones",
  description: "Tienda virtual de administración de publicaciones",
  icons: {
    icon: "/icon-post.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
