import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { whatsappUrl } from "@/config/site";

export default function WhatsAppFloat() {
  return (
    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Escribinos por WhatsApp (se abre en una pestaña nueva)">
      <WhatsappLogo size={26} aria-hidden="true" />
    </a>
  );
}
