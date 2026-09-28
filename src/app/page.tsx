import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import MotionEffects from "@/components/MotionEffects";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import { QuoteProvider } from "@/components/QuoteProvider";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Comfort from "@/components/sections/Comfort";
import Corporate from "@/components/sections/Corporate";
import Destinations from "@/components/sections/Destinations";
import Equipment from "@/components/sections/Equipment";
import Events from "@/components/sections/Events";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import Instagram from "@/components/sections/Instagram";
import QuoteForm from "@/components/sections/QuoteForm";
import Safety from "@/components/sections/Safety";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Unit from "@/components/sections/Unit";
import { site } from "@/config/site";

export default function Home() {
  return (
    <QuoteProvider>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Preloader brand={site.brand} />
      <Navbar brand={site.brand} />
      <main id="contenido">
        <Hero />
        <Services />
        <Unit />
        <Comfort />
        <Equipment />
        <Safety />
        <Destinations />
        <Corporate />
        <Events />
        <QuoteForm />
        <Testimonials />
        <Instagram />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MotionEffects />
      <CustomCursor />
    </QuoteProvider>
  );
}
