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
      className="fixed top-4 left-6 z-[9999] p-3 bg-[#066368D8] cursor-pointer rounded-lg shadow-lg hover:bg-[#055155] focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
      aria-label="Return to Homepage"
    >
      <Image
        src="/icons/home.png"
        alt="Home"
        title="Return to Homepage"
        width={24}
        height={24}
        className="w-6 h-6 invert"
        aria-hidden
      />
    </button>
  );
}
