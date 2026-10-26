# Artesanos! Alitas y Makis

Sitio web del restaurante en Santa Anita, Lima. Carta, pedido por WhatsApp y SEO local.

## Comandos

```bash
npm run dev      # desarrollo en http://localhost:3000
npm run build    # build de producción
npm run start    # servir el build
npm run lint     # ESLint
```

## Editar la carta

- Productos y precios: `data/menu.ts`
- Sabores de makis y alitas: `data/flavors.ts`
- Datos del local (WhatsApp, horarios, redes): `data/site.ts`
- Reseñas: `data/reviews.ts`

## Completar datos pendientes

En `data/site.ts` busca comentarios `TODO(Daniel)`: referencia de dirección, TikTok, URL de reseñas Google, zonas de delivery, Happy Hour, pagos adicionales y confirmación de horarios.

## Fotos y logo

1. Coloca fotos en `public/images/local/` y `public/images/productos/`
2. Logo en `public/images/logo.png` y define `LOGO_SRC = "/images/logo.png"` en `data/site.ts`
3. Open Graph: `public/og-image.jpg` (referenciado en metadata)
4. En cada producto de `data/menu.ts`, agrega `image: "/images/productos/..."`

Hasta que existan las fotos, la web usa `ImagePlaceholder`.

## Variables de entorno

Copia `.env.example` a `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — URL pública del sitio
- `NEXT_PUBLIC_GA_ID` — ID de Google Analytics 4 (opcional)
