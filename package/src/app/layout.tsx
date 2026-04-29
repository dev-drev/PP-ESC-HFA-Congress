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
      </body>
    </html>
  )
}