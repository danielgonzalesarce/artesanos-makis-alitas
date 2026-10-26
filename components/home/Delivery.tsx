import { Reveal } from "@/components/home/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/data/site";
import { buildInfoMessage, whatsappUrl } from "@/lib/whatsapp";

export function Delivery() {
  const wa = whatsappUrl(buildInfoMessage());

  return (
    <section className="bg-cream px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionTitle
            title="Delivery"
            description={`¿Se te antojó? Escríbenos al ${site.whatsappDisplay} o pídelo por Rappi y DiDi Food.`}
          />
        </Reveal>
        <div className="mt-6 space-y-4 text-ink/75">
          {site.payments.length > 0 ? (
            <p>Pagos: {site.payments.join(", ")}.</p>
          ) : null}
          {site.deliveryZones ? (
            <p>Zonas: {site.deliveryZones}</p>
          ) : (
            <p>
              La cobertura y el costo de envío se confirman por WhatsApp.
            </p>
          )}
          {site.deliveryNote ? <p>{site.deliveryNote}</p> : null}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={wa} target="_blank" rel="noopener noreferrer">
            WhatsApp {site.whatsappDisplay}
          </Button>
          {site.rappiUrls.map((url, i) => (
            <Button
              key={url}
              href={url}
              variant="dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              {i === 0 ? "Rappi" : "Makis by Artesanos (Rappi)"}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
