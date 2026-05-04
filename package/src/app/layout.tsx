import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import SessionSyncProvider from '@/components/SessionSyncProvider'
import ConditionalReferencesButton from '@/components/ConditionalReferencesButton'
import HomepageButton from '@/components/HomepageButton'

const lato = Lato({ 
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato'
})

export const metadata: Metadata = {
  title: 'Kongress App',
  description: 'Presentation synchronization app with Supabase',
}

/** false = nascosto il blocco sotto References (PC code, QR, testi legali). Ripristinare insieme a globals.css. */
const SHOW_QR_LEGAL_FOOTER = false

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
      <body className={`${lato.className} ${lato.variable} h-full pb-[var(--app-site-footer-total)]`}>
        <Suspense fallback={null}>
          <SessionSyncProvider>
            {children}
          </SessionSyncProvider>
        </Suspense>
        {/* Fixed to viewport bottom so Joana layer can end exactly at References top; z-50 matches References modals */}
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-[#056368] shadow-[0_-6px_24px_rgba(0,0,0,0.12)]">
          <ConditionalReferencesButton />
          {SHOW_QR_LEGAL_FOOTER && (
          <div className="w-full border-t px-4 pb-6 mt-6 border-t border-white/20 flex justify-center xl:bottom-10 xl:left-4 xl:w-auto xl:px-0 xl:pb-0 xl:mt-0 xl:border-0">
            <div className="max-w-[220px] w-full pt-10 text-center rounded-2xl p-4 bg-[#066368] border border-white/15 shadow-lg">
            <p className="text-white text-xs font-bold opacity-80 mb-2">
              PC-ES-118210-032026
            </p>
            <div className="flex flex-col items-center gap-2 space-y-2">
              <img
                src="/spanish-qr.png"
                alt="Spanish QR"
                className="w-16 h-16 object-contain shrink-0"
              />
              <div className="text-white opacity-80 tracking-normal text-center">
                <p className="text-[9px] leading-tight">
                  Scan the QR code to access the Jardiance Summary of Product Characteristics.
                </p>
                <p className="text-[9px] leading-tight mt-1">
                  <b>PRESENTATION &amp; PRICE:</b> Jardiance 10 mg, pack of 30 film-coated tablets: RRP+VAT: EUR 49.31. Jardiance 25 mg, pack of 30 film-coated tablets: RRP+VAT: EUR 51.52.
                </p>
                <p className="text-[9px] leading-tight mt-1">
                  <b>CONDITIONS OF PRESCRIPTION AND DISPENSING:</b> Medication subject to medical prescription. Reimbursable by the Spanish National Health System. Reduced contribution.
                </p>
              </div>
            </div>
          </div>
          </div>
          )}
        </div>
        <HomepageButton />
        <img
          src="/logo-white.svg"
          alt="Logo"
          className="fixed z-40 h-auto w-14 top-4 right-3 pointer-events-none select-none opacity-80 md:top-7 md:right-6 md:w-30"
        />
      </body>
    </html>
  )
}