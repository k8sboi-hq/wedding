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
  );
}
