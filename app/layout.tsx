import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Nail Paris — Salon de Manucure Haut de Gamme',
    template: '%s | Nail Paris',
  },
  description: 'Salon de manucure d\'exception à Paris 8e. Manucure, semi-permanent, nail art, pose gel et soins des mains par des experts certifiés.',
  keywords: ['manucure Paris', 'salon ongles Paris', 'nail art Paris', 'pose gel Paris', 'semi-permanent Paris', 'salon beauté Paris 8'],
  authors: [{ name: 'Nail Paris' }],
  creator: 'Nail Paris',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://client-nail.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Nail Paris',
    title: 'Nail Paris — Salon de Manucure Haut de Gamme',
    description: 'Salon de manucure d\'exception à Paris 8e. L\'art du geste, la précision du détail.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Nail Paris — Salon de manucure Paris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nail Paris — Salon de Manucure Haut de Gamme',
    description: 'Salon de manucure d\'exception à Paris 8e.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
        >
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  )
}
