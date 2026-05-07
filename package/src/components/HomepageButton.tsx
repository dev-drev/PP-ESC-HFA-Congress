'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

export default function HomepageButton() {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/') {
    return null
  }

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="fixed xl:top-4 top-[0.85rem] left-6 z-[9999] cursor-pointer rounded-lg border border-white/25 bg-white/10 p-2.5 shadow-lg backdrop-blur-md transition-colors hover:bg-white/18 focus:outline-none focus:ring-2 focus:ring-white/40"
      aria-label="Return to Homepage"
    >
      <Image
                  quality={100}
        src="/icons/home.png"
        alt="Home"
        title="Return to Homepage"
        width={24}
        height={24}
        className="w-4 h-4 xl:w-6 xl:h-6 brightness-0 invert"
        aria-hidden
      />
    </button>
  );
}
