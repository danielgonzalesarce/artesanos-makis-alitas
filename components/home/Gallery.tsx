import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Reveal } from "@/components/home/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const slots = [
  { name: "Alitas glaseadas", kind: "alita" as const },
  { name: "Tabla de makis", kind: "maki" as const },
  { name: "Combo Maki Alitas", kind: "combo" as const },
  { name: "Interior del local", kind: "local" as const },
  { name: "Makis furai", kind: "maki" as const },
  { name: "Fachada Artesanos!", kind: "local" as const },
];

export function Gallery() {
  return (
    <section className="bg-cream px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionTitle
            title="Galería"
            description="Fotos del local y los platos, muy pronto."
          />
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {slots.map((s) => (
            <Reveal key={s.name}>
              <ImagePlaceholder
                name={s.name}
                kind={s.kind}
                className="rounded-[var(--radius)]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
