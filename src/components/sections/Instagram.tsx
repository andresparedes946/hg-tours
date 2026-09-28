import Image from "next/image";
import { instagramGrid } from "@/config/content";
import { instagramUrl, site } from "@/config/site";

/**
 * Se publica solo cuando está configurado el usuario real de Instagram.
 * La grilla usa fotos propias de la unidad y enlaza al perfil (no simula publicaciones).
 */
export default function Instagram() {
  const url = instagramUrl();
  if (!url) return null;
  return (
    <section className="section instagram" aria-labelledby="instagram-titulo">
      <div className="instagram-head">
        <div>
          <p className="eyebrow-plain eyebrow-plain--accent">@{site.contact.instagram}</p>
          <h2 id="instagram-titulo" className="display-4">
            Seguinos en el camino.
          </h2>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
          Ver Instagram →
        </a>
      </div>
      <div className="instagram-grid">
        {instagramGrid.map((p) => (
          <a key={p.src} href={url} target="_blank" rel="noopener noreferrer" className="instagram-tile" data-cursor="VIEW" aria-label={`${p.alt} — ver en Instagram`}>
            <Image src={p.src} alt="" fill sizes="(max-width: 600px) 50vw, 17vw" style={{ objectPosition: p.pos }} />
          </a>
        ))}
      </div>
    </section>
  );
}
