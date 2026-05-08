'use client'

import { usePathname } from 'next/navigation'

export default function ConditionalAiDisclaimer() {
  const pathname = usePathname()
  const isInitialScreen = pathname === '/' || pathname === '/patients'

  if (isInitialScreen) {
    return null
  }

  return (
    <div className="relative z-20 w-full px-12 xl:px-0 py-7">
      <div className="mx-auto w-full max-w-[1700px] 2xl:px-8 ml-12">
        <p className="text-white/75 text-sm text-left">
          Not an actual patient. Visuals created with the help of AI.
        </p>
      </div>
    </div>
  )
}
