import { Suspense } from "react";
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

export default function Home() {
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
        <RSVPSection />
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
