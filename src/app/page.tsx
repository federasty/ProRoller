import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import VideoShowcase from "@/components/VideoShowcase";
import AccessoriesShop from "@/components/AccessoriesShop";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <VideoShowcase />
      <AccessoriesShop />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
