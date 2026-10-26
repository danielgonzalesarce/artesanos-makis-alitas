import Link from "next/link";
import { Reveal } from "@/components/home/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { categories } from "@/data/menu";

export function Categories() {
  const comer = categories.filter((c) => c.group === "comer");
  const beber = categories.filter((c) => c.group === "beber");

  return (
    <section className="bg-cream px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionTitle title="Categorías" description="Entra directo a lo que se te antojó." />
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Reveal>
            <h3 className="font-display text-3xl text-ink">Para comer</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {comer.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/carta#${c.id}`}
                    className="inline-flex min-h-11 items-center rounded-full bg-navy px-4 font-semibold text-cream hover:bg-orange hover:text-ink"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h3 className="font-display text-3xl text-ink">Para tomar</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {beber.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/carta#${c.id}`}
                    className="inline-flex min-h-11 items-center rounded-full bg-sand px-4 font-semibold text-ink hover:bg-orange"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
