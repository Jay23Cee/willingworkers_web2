import type { Metadata } from "next";
import type { ReactNode } from "react";
import QueryWrapper from "./auth/QueryWrapper";
import ovswwLogo from "../public/favicon/favicon_io/favicon.ico";
import "../styles/global.scss";

export const metadata: Metadata = {
  title: "OVS Willing Workers",
  description:
    "OVS Willing Workers provides inclusive programs and support for adults with intellectual and developmental disabilities.",
  icons: {
    icon: ovswwLogo.src,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryWrapper>{children}</QueryWrapper>
      </body>
    </html>
  );
}
