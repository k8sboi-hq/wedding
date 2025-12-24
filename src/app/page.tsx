import HeroSection from "@/components/Hero/HeroSection";
import PhotoCarousel from "@/components/PhotoCarousel/PhotoCarousel";
import CountdownSection from "@/components/Countdown/CountdownSection";
import DetailsSection from "@/components/Details/DetailsSection";
import MapsSection from "@/components/Maps/MapsSection";
import RSVPSection from "@/components/RSVP/RSVPSection";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#details"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to wedding details
      </a>
      <main>
        <HeroSection />
        <PhotoCarousel />
        <CountdownSection />
        <DetailsSection />
        <MapsSection />
        <RSVPSection />
        <Footer />
        <MusicPlayer />
      </main>
    </>
  );
}
