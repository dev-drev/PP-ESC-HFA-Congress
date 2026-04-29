'use client'

import { useRouter } from 'next/navigation'

function ResetButton() {
  const router = useRouter()

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push('/')
  }

  return (
    <button
      onClick={handleReset}
      className="fixed top-0 left-0 w-20 h-20 opacity-0 cursor-pointer z-[9999]"
      aria-label="Reset to patients view"
    />
  )
}

export default function GlobalResetButton() {
  return <ResetButton />
}