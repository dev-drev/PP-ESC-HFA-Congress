import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import Image from 'next/image'
import { Suspense } from 'react'
import './globals.css'
import SessionSyncProvider from '@/components/SessionSyncProvider'
import ConditionalReferencesButton from '@/components/ConditionalReferencesButton'
import HomepageButton from '@/components/HomepageButton'
import ImagePreloader from '@/components/ImagePreloader'

const lato = Lato({ 
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato'
})

export const metadata: Metadata = {
  title: 'Kongress App',
  description: 'Presentation synchronization app with Supabase',
}

/** Mostra il blocco PC code + QR + testi legali (mobile in flusso, tablet/desktop fixed in basso a destra). */
const SHOW_QR_LEGAL_FOOTER = true

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/background-1.jpg" as="image" title="Background" />
        {/* Instatag (IT) - Adobe Analytics event tracking; digitalData must be defined before the snippet */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.digitalData = window.digitalData || {};
              (function(){
                var script = document.createElement("script");
                script.src = "https://script.bi-instatag.com?ref=" + encodeURIComponent(window.location.href);
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </head>
      <body className={`${lato.className} ${lato.variable} min-h-dvh`}>
        <Suspense fallback={null}>
          <SessionSyncProvider>
            <ImagePreloader />
            {children}
          </SessionSyncProvider>
        </Suspense>
        {/* In flusso a fine pagina (non fixed), così non copre contenuti su schermi bassi */}
        <div className="relative z-10 w-full bg-[#056368] shadow-[0_-6px_24px_rgba(0,0,0,0.12)]">
          <ConditionalReferencesButton />
          {SHOW_QR_LEGAL_FOOTER && (
            <div className="w-full px-4 py-6 flex justify-center">
              <div className="w-full max-w-[260px] md:max-w-[300px] rounded-2xl p-4 bg-[#066368] flex flex-col md:flex-row md:items-start gap-3 text-center md:text-left">
                <Image
                  src="/spanish-qr.png"
                  alt="Spanish QR"
                  width={80}
                  height={80}
                  className="w-20 h-20 md:w-16 md:h-16 object-contain shrink-0 mx-auto md:mx-0"
                />
                <div className="text-white opacity-90">
                  <p className="text-xs md:text-[10px] font-bold leading-tight mb-1 md:mb-1">
                    PC-ES-118210-032026
                  </p>
                  <p className="text-[10px] md:text-[9px] leading-tight">
                    Scan the QR code to access the Jardiance Summary of Product Characteristics.
                  </p>
                  <p className="text-[10px] md:text-[9px] leading-tight mt-1">
                    <b>PRESENTATION &amp; PRICE:</b> Jardiance 10 mg, pack of 30 film-coated tablets: RRP+VAT: EUR 49.31. Jardiance 25 mg, pack of 30 film-coated tablets: RRP+VAT: EUR 51.52.
                  </p>
                  <p className="text-[10px] md:text-[9px] leading-tight mt-1">
                    <b>CONDITIONS OF PRESCRIPTION AND DISPENSING:</b> Medication subject to medical prescription. Reimbursable by the Spanish National Health System. Reduced contribution.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <HomepageButton />
        <Image
          src="/logo-white.svg"
          alt="Logo"
          width={120}
          height={60}
          priority
          className="fixed z-40 h-auto w-18 top-6 md:top-4 xl:top-5 right-3 pointer-events-none select-none opacity-80 md:top-7 md:right-6 md:w-30"
        />
      </body>
    </html>
  )
}