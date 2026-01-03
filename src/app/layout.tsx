import type { Metadata } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Merriweather,
  Montserrat,
  Dancing_Script,
  Pinyon_Script,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pinyon",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wedding.khoahuynh.dev"),
  title: "Khoa & Sương's Wedding - January 20, 2026",
  description:
    "Join us for the wedding celebration of Huỳnh Đăng Khoa (Daniel) and Lưu Nguyễn Hồng Sương (Rachel) on January 20, 2026. Guest celebrations on January 18 & 25. RSVP today!",
  keywords: [
    "wedding",
    "Khoa",
    "Sương",
    "Daniel",
    "Rachel",
    "Francis Hội",
    "Garden Plaza Saigon",
    "January 20 2026",
  ],
  authors: [{ name: "Huỳnh Đăng Khoa & Lưu Nguyễn Hồng Sương" }],
  openGraph: {
    type: "website",
    url: "https://wedding.khoahuynh.dev",
    title: "Khoa & Sương's Wedding - January 20, 2026",
    description:
      "Join us for the wedding celebration of Huỳnh Đăng Khoa (Daniel) and Lưu Nguyễn Hồng Sương (Rachel) on January 20, 2026. Guest celebrations on January 18 & 25. RSVP today!",
    images: [
      {
        url: "https://media.khoahuynh.dev/api/assets/30653133-ef40-4726-8930-086f7e729cfb/thumbnail?key=Fvo34aAJDzQbU2mJz957aGac82ZJAaFR_SHOCY11FunuysEp5heU7iKR0rcdtY1hvHI&size=preview&c=6gcGBQK0%2FWeGyIxCVkYmtwWlWvl4",
        width: 1200,
        height: 630,
        alt: "Khoa & Sương's Wedding Invitation",
      },
    ],
    locale: "en_US",
    siteName: "Khoa & Sương's Wedding",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khoa & Sương's Wedding - January 20, 2026",
    description:
      "Join us for the wedding celebration of Huỳnh Đăng Khoa (Daniel) and Lưu Nguyễn Hồng Sương (Rachel) on January 20, 2026. Guest celebrations on January 18 & 25. RSVP today!",
    images: [
      "https://media.khoahuynh.dev/api/assets/30653133-ef40-4726-8930-086f7e729cfb/thumbnail?key=Fvo34aAJDzQbU2mJz957aGac82ZJAaFR_SHOCY11FunuysEp5heU7iKR0rcdtY1hvHI&size=preview&c=6gcGBQK0%2FWeGyIxCVkYmtwWlWvl4",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${merriweather.variable} ${montserrat.variable} ${dancingScript.variable} ${pinyonScript.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
