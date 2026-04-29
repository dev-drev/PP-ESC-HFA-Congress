import { Suspense } from 'react'
import ControllerViewContent from '@/components/ControllerViewContent'

export default function ControllerView() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Lade Controller-Ansicht...</p>
        </div>
      </div>
    }>
      <ControllerViewContent />
    </Suspense>
  )
}