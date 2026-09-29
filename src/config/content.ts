/**
 * Contenido de las secciones. Los campos en `null` se ocultan en el sitio
 * hasta que HG Tours los confirme (ver CONTENIDO-PENDIENTE.md).
 */

export type ServiceType = "Turismo" | "Traslado" | "Corporativo" | "Evento" | "Otro";
export const serviceTypes: ServiceType[] = ["Turismo", "Traslado", "Corporativo", "Evento", "Otro"];
export type TripType = "Ida" | "Ida y vuelta";
export const tripTypes: TripType[] = ["Ida", "Ida y vuelta"];

export const media = {
  hero: {
    hd: "/videos/hero-sprinter-1080.mp4",
    sd: "/videos/hero-sprinter-720.mp4",
    poster: "/images/hero-poster.jpg",
    alt: "Mercedes-Benz Sprinter negra en ruta al atardecer",
  },
  bariloche: {
    hd: "/videos/sprinter-bariloche-1080.mp4",
    sd: "/videos/sprinter-bariloche-720.mp4",
    poster: "/images/bariloche-poster.jpg",
    alt: "La Sprinter recorriendo una ruta de montaña junto a un lago en la Patagonia",
  },
} as const;

export const img = {
  ruta: { src: "/images/sprinter-ruta-atardecer.jpg", w: 1672, h: 941 },
  frente: { src: "/images/sprinter-frente.jpg", w: 1126, h: 2000 },
  interiorLuz: { src: "/images/interior-luz.jpg", w: 1126, h: 2000 },
  interiorPasillo: { src: "/images/interior-pasillo.jpg", w: 1126, h: 2000 },
  interiorTrasero: { src: "/images/interior-trasero.jpg", w: 1126, h: 2000 },
  interiorAncho: { src: "/images/interior-ancho.jpg", w: 2200, h: 1238 },
  tablero: { src: "/images/tablero.jpg", w: 1126, h: 2000 },
  techo: { src: "/images/techo-salida-emergencia.jpg", w: 1126, h: 2000 },
} as const;

export const needs = [
  { n: "01", title: "Turismo", desc: "Viajes, excursiones y experiencias por Argentina.", image: img.ruta.src, alt: "Sprinter negra en ruta al atardecer", pos: "45% 50%", service: "Turismo", caption: "En ruta" },
  { n: "02", title: "Traslados", desc: "Traslados privados y grupales.", image: img.interiorLuz.src, alt: "Interior de la Sprinter con luz natural", pos: "50% 55%", service: "Traslado", caption: "A bordo" },
  { n: "03", title: "Corporativo", desc: "Movilidad para empresas y equipos.", image: img.interiorAncho.src, alt: "Vista amplia del interior de la unidad", pos: "40% 50%", service: "Corporativo", caption: "Interior de la unidad" },
  { n: "04", title: "Eventos", desc: "Traslados para celebraciones y eventos.", image: img.frente.src, alt: "Frente de la Sprinter lista para salir", pos: "50% 62%", service: "Evento", caption: "Lista para salir" },
  { n: "05", title: "Viajes personalizados", desc: "Armamos el recorrido según tu grupo, tu fecha y tu destino.", image: img.interiorPasillo.src, alt: "Butacas y pasillo de la Sprinter", pos: "50% 60%", service: "Otro", caption: "Butacas" },
] as const satisfies ReadonlyArray<{ service: ServiceType } & Record<string, string>>;

/** Ficha de la unidad. `value: null` = pendiente, no se muestra. */
export const unitSpecs: { label: string; value: string | null }[] = [
  { label: "Vehículo", value: "Mercedes-Benz Sprinter" },
  { label: "Color", value: "Negro" },
  { label: "Pasajeros", value: "19" },
  { label: "Equipaje", value: null }, // PENDIENTE
  { label: "Año", value: "2026" },
];

/** Equipamiento visible en la foto del tablero. Posiciones en % sobre la imagen. */
export const equipment = [
  { n: "1", title: "Pantalla multimedia", tag: "Tecnología · Bluetooth / USB", x: 50, y: 47 },
  { n: "2", title: "Salidas de aire", tag: "Confort", x: 84, y: 51 },
  { n: "3", title: "Panel de climatización", tag: "Climatización · A/C", x: 46, y: 67 },
];

/** Compromisos de seguridad. `body: null` = pendiente, no se muestra. */
export const trust: { n: string; title: string; body: string | null }[] = [
  { n: "01", title: "Cuidado del vehículo", body: null }, // PENDIENTE: mantenimiento
  { n: "02", title: "Conductores", body: null }, // PENDIENTE: experiencia y formación
  { n: "03", title: "Habilitaciones y seguros", body: null }, // PENDIENTE: datos de la empresa
];

export type Destination = {
  key: string;
  name: string;
  lat: number;
  lon: number;
  desc: string;
  /** Foto del destino. Tiene prioridad el video, si hay. Sin ninguno se muestra un panel tipográfico. */
  image?: { src: string; alt: string };
  video?: (typeof media)[keyof typeof media];
  /** PENDIENTE: datos del recorrido. null = no se muestran. */
  info: { duration: string | null; departure: string | null; mode: string | null };
};

const noInfo = { duration: null, departure: null, mode: null };

export const destinations: Destination[] = [
  { key: "salta", name: "Salta", lat: -24.8, lon: -65.4, desc: "Quebradas, cerros de colores y pueblos del norte.", image: { src: "/images/destinos/salta.jpg", alt: "Cerros de colores y cardones en el norte salteño" }, info: noInfo },
  { key: "iguazu", name: "Iguazú", lat: -25.6, lon: -54.6, desc: "La selva misionera y las cataratas.", image: { src: "/images/destinos/iguazu.jpg", alt: "Cataratas con arcoíris vistas desde una pasarela en la selva" }, info: noInfo },
  { key: "cordoba", name: "Córdoba", lat: -31.4, lon: -64.2, desc: "Sierras, valles y rutas a pocas horas de viaje.", image: { src: "/images/destinos/cordoba.jpg", alt: "Lago entre sierras con una ciudad costera en Córdoba" }, info: noInfo },
  { key: "mendoza", name: "Mendoza", lat: -32.9, lon: -68.8, desc: "Montaña, viñedos y la cordillera de fondo.", image: { src: "/images/destinos/mendoza.jpg", alt: "Viñedos al atardecer con la cordillera nevada de fondo" }, info: noInfo },
  { key: "buenosaires", name: "Buenos Aires", lat: -34.6, lon: -58.4, desc: "La ciudad como punto de partida o de llegada.", info: noInfo }, // PENDIENTE: foto
  { key: "costa", name: "Costa Atlántica", lat: -38.0, lon: -57.6, desc: "Playas y ciudades balnearias sobre el mar.", image: { src: "/images/destinos/costa-atlantica.jpg", alt: "Playa con dunas y un faro sobre la costa atlántica" }, info: noInfo },
  { key: "bariloche", name: "Bariloche", lat: -41.1, lon: -71.3, desc: "Lagos, bosques y la cordillera patagónica.", image: { src: "/images/destinos/bariloche.jpg", alt: "Vista del Circuito Chico en otoño, con lagos y montañas nevadas" }, info: noInfo },
  { key: "patagonia", name: "Patagonia", lat: -50.3, lon: -72.3, desc: "Grandes distancias, glaciares y estepa.", image: { src: "/images/destinos/patagonia.jpg", alt: "Glaciar entre montañas con témpanos sobre el lago" }, info: noInfo },
];

export const corporate = ["Traslado de personal", "Eventos corporativos", "Congresos", "Convenciones", "Reuniones", "Viajes empresariales", "Aeropuertos", "Producciones"];

export const events = ["Casamientos", "Fiestas", "Recitales", "Eventos deportivos", "Eventos empresariales", "Producciones", "Eventos especiales"];

/** Fotos propias usadas en la grilla de Instagram (solo visible con usuario configurado). */
export const instagramGrid = [
  { src: img.ruta.src, pos: "55% 50%", alt: "Sprinter en ruta al atardecer" },
  { src: img.interiorLuz.src, pos: "50% 55%", alt: "Interior con luz natural" },
  { src: img.frente.src, pos: "50% 60%", alt: "Frente de la Sprinter" },
  { src: img.tablero.src, pos: "50% 50%", alt: "Tablero y pantalla multimedia" },
  { src: img.techo.src, pos: "50% 40%", alt: "Salida de emergencia en el techo" },
  { src: img.interiorPasillo.src, pos: "50% 65%", alt: "Pasillo y butacas" },
];

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Destinos", href: "#destinos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Corporativo", href: "#corporativo" },
  { label: "Eventos", href: "#eventos" },
  { label: "Nosotros", href: "#nosotros" },
];
