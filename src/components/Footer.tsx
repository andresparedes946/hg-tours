import { EnvelopeSimple, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { instagramUrl, site, whatsappUrl } from "@/config/site";

export default function Footer() {
  const ig = instagramUrl();
  const email = site.contact.email;
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="#inicio" className="brand">
          <span className="brand-line" aria-hidden="true" />
          {site.brand}
        </a>
        <nav className="footer-services" aria-label="Servicios">
          <a href="#servicios">Traslados</a>
          <a href="#destinos">Turismo</a>
          <a href="#corporativo">Corporativo</a>
          <a href="#eventos">Eventos</a>
        </nav>
        <div className="footer-contact">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsappLogo size={18} aria-hidden="true" />
            WhatsApp
          </a>
          {ig && (
            <a href={ig} target="_blank" rel="noopener noreferrer">
              <InstagramLogo size={18} aria-hidden="true" />
              Instagram
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`}>
              <EnvelopeSimple size={18} aria-hidden="true" />
              {email}
            </a>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>{site.country}</span>
        <span>© {new Date().getFullYear()} {site.name}</span>
      </div>
    </footer>
  );
}
