import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 pt-28 pb-28 text-center">
      <p className="font-display text-8xl text-orange">404</p>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
        Esta página no está en la carta
      </h1>
      <p className="mt-3 text-ink/70">
        Vuelve al inicio o mira los makis y alitas.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Inicio</Button>
        <Button href="/carta" variant="dark">
          Ver carta
        </Button>
      </div>
    </main>
  );
}
