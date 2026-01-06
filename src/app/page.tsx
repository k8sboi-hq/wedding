import { Suspense } from "react";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import HeroSection from "@/components/Hero/HeroSection";
import Gallery from "@/components/Gallery/Gallery";
import CountdownSection from "@/components/Countdown/CountdownSection";
import RSVPSection from "@/components/RSVP/RSVPSection";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import Footer from "@/components/Footer/Footer";
import PartyFilteredContent from "@/components/PartyFilteredContent";
import DetailsSection from "@/components/Details/DetailsSection";
import MapsSection from "@/components/Maps/MapsSection";
import { parsePartyParam } from "@/lib/partyFilter";
import { decodeGuestName } from "@/lib/guestUtils";

type PageProps = {
  searchParams: Promise<{ party?: string; guest?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const partyFilter = parsePartyParam(params.party);
  const guestName = decodeGuestName(params.guest);
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://wedding.khoahuynh.dev";

  // Build URL with query params
  const urlParams = new URLSearchParams();
  if (partyFilter) urlParams.set("party", partyFilter);
  if (params.guest) urlParams.set("guest", params.guest);
  const url = urlParams.toString()
    ? `${baseUrl}?${urlParams.toString()}`
    : baseUrl;

  let title = "Khoa & Sương's Wedding - January 20, 2026";
  let description =
    "Join us for the wedding celebration of Huỳnh Đăng Khoa (Daniel) and Lưu Nguyễn Hồng Sương (Rachel) on January 20, 2026. Guest celebrations on January 18 & 25. RSVP today!";

  // Personalize based on party filter
  if (partyFilter === "1") {
    title = "Tiệc Nhà Gái - Khoa & Sương's Wedding - January 18, 2026";
    description =
      "You are invited to Bride's Family Party (Tiệc Nhà Gái) on January 18, 2026 at Francis Hội Restaurant, Lái Thiêu. Join us to celebrate Huỳnh Đăng Khoa and Lưu Nguyễn Hồng Sương's wedding!";
  } else if (partyFilter === "2") {
    title = "Tiệc Nhà Trai - Khoa & Sương's Wedding - January 25, 2026";
    description =
      "You are invited to Groom's Family Party (Tiệc Nhà Trai) on January 25, 2026 at Garden Plaza Saigon. Join us to celebrate Huỳnh Đăng Khoa and Lưu Nguyễn Hồng Sương's wedding!";
  }

  // Further personalize with guest name if provided
  if (guestName) {
    if (partyFilter === "1") {
      title = `Personal Invitation for ${guestName} - to celebrate the wedding of Hồng Sương and Đăng Khoa - January 18, 2026`;
      description = `Dear ${guestName}, you are personally invited to celebrate the wedding of Hồng Sương (Rachel) and Đăng Khoa (Daniel) on January 18, 2026 at Francis Hội Restaurant, Lái Thiêu. Join us to celebrate Huỳnh Đăng Khoa and Lưu Nguyễn Hồng Sương's wedding!`;
    } else if (partyFilter === "2") {
      title = `Personal Invitation for ${guestName} - to celebrate the wedding of Đăng Khoa and Hồng Sương - January 25, 2026`;
      description = `Dear ${guestName}, you are personally invited to celebrate the wedding of Đăng Khoa (Daniel) and Hồng Sương (Rachel) on January 25, 2026 at Garden Plaza Saigon. Join us to celebrate Huỳnh Đăng Khoa and Lưu Nguyễn Hồng Sương's wedding!`;
    } else {
      title = `Personal Invitation for ${guestName} - Khoa & Sương's Wedding`;
      description = `Dear ${guestName}, you are personally invited to celebrate the wedding of Huỳnh Đăng Khoa (Daniel) and Lưu Nguyễn Hồng Sương (Rachel) on January 20, 2026. Guest celebrations on January 18 & 25. RSVP today!`;
    }
  }

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
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
      url,
      title,
      description,
      images: [
        {
          url: "/assets/og-image-0355.jpg",
          width: 1200,
          height: 630,
          alt: "Khoa & Sương Wedding Photo",
          type: "image/jpeg",
        },
        {
          url: "/assets/og-image-0355.webp",
          width: 1200,
          height: 630,
          alt: "Khoa & Sương Wedding Photo",
          type: "image/webp",
        },
      ],
      locale: "en_US",
      siteName: "Khoa & Sương's Wedding",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const guestName = decodeGuestName(params.guest);

  return (
    <>
      <a
        href="#details"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to wedding details
      </a>
      <Navigation />
      <main>
        <HeroSection />
        <Gallery />
        <CountdownSection />
        <RSVPSection guestName={guestName} />
        <Suspense
          fallback={
            <>
              <DetailsSection partyFilter={null} />
              <MapsSection partyFilter={null} />
            </>
          }
        >
          <PartyFilteredContent />
        </Suspense>
        <Footer />
        <MusicPlayer />
      </main>
    </>
  );
}
