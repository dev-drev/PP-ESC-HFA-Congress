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
      <body className={`${lato.className} ${lato.variable} h-full`}>
        <Suspense fallback={null}>
          <SessionSyncProvider>
            {children}
          </SessionSyncProvider>
        </Suspense>
        <ConditionalReferencesButton />
        <HomepageButton />
        <img
          src="/logo-white.svg"
          alt="Logo"
          className="fixed top-8 right-10 w-34 h-auto z-40 pointer-events-none select-none opacity-80"
        />
         <p className="fixed bottom-20 right-10 z-40 text-white text-base font-bold opacity-80">
            PC-ES-118210-032026
          </p>
        <div className="fixed left-4 bottom-16 z-40 max-w-[420px] pointer-events-none select-none">
         
          <div className="p-2 flex items-start gap-3">
            <img
              src="/spanish-qr.png"
              alt="Spanish QR"
              className="w-28 h-28 object-contain shrink-0"
            />
            <div className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
              <p className="text-[10px] leading-tight">
                Scan the QR code to access the Jardiance Summary of Product Characteristics.
              </p>
              <p className="text-[10px] leading-tight mt-1">
                <b>PRESENTATION &amp; PRICE:</b> Jardiance 10 mg, pack of 30 film-coated tablets: RRP+VAT: EUR 49.31. Jardiance 25 mg, pack of 30 film-coated tablets: RRP+VAT: EUR 51.52.
              </p>
              <p className="text-[10px] leading-tight mt-1">
                <b>CONDITIONS OF PRESCRIPTION AND DISPENSING:</b> Medication subject to medical prescription. Reimbursable by the Spanish National Health System. Reduced contribution.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}