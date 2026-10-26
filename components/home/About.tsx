import { Reveal } from "@/components/home/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function About() {
  return (
    <section className="texture-dark bg-ink px-4 py-16 text-cream md:px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionTitle light title="Sobre nosotros" />
          <p className="mt-6 text-lg leading-relaxed text-cream/80">
            En Artesanos! no tienes que elegir entre alitas y makis. Los
            combinamos con salsas y sabores de fusión pensados para compartir.
            Ven a nuestro local en Santa Anita o pídelo por WhatsApp.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
