import { Suspense } from 'react'
import DisplayViewContent from '@/components/DisplayViewContent'

export default function DisplayView() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300">Lade Display-Ansicht...</p>
        </div>
      </div>
    }>
      <DisplayViewContent />
    </Suspense>
  )
}