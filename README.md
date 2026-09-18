# Qrazy

Admin dashboard for a QR-based reward and sales system. Generate branded QR codes, manage products, track scans, and handle QR orders and invoices.

## Features

- Auth flows: login, register, verify, forgot/reset password, onboarding
- Product catalog: create, list, and manage product details, pricing, images, and links
- QR generation with custom styling (logo, colors, eye radius, error correction) and ZIP download
- QR orders, invoices, and payment status
- Scan analytics and map views
- Counter-fitting map and table
- Settings for profile, company, and contacts
- Light/dark theme

## Stack

- Next.js 14 (App Router) and React 18
- TypeScript
- Tailwind CSS and Radix UI
- `react-qrcode-logo`, `jszip`, `file-saver`
- Recharts, Mapbox / react-map-gl, Framer Motion

QR design reference: [Uniqode QR code generator](https://www.uniqode.com/qr-code-generator)

## Getting started

Requires Node.js 18+ and Yarn.

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). The home page lists app routes for local navigation.

```bash
yarn lint
yarn build
yarn start
```

## App routes

| Path | Area |
| --- | --- |
| `/login`, `/register`, `/verify` | Authentication |
| `/forgot-password`, `/reset-password` | Password recovery |
| `/onboarding` | Company and contact setup |
| `/dashboard` | Overview |
| `/products`, `/products/create`, `/products/listing` | Products |
| `/qrs`, `/qrs/order`, `/qrs/invoice` | QR codes, orders, invoices |
| `/scans` | Scan history and maps |
| `/counter-fitting` | Counter-fitting |
| `/settings` | Account and company |
| `/profile` | Profile |

## License

Private project. Not licensed for public use.
