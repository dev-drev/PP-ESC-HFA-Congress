'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Screensaver from './Screensaver'

export default function ControllerViewContent() {
  const searchParams = useSearchParams()
  const sessionCode = searchParams.get('session')
  const [currentSlide, setCurrentSlide] = useState(1)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsConnected(true)
    setIsLoading(false)
  }, [sessionCode])

  const nextSlide = () => {
    const next = currentSlide + 1
    setCurrentSlide(next)
  }

  const prevSlide = () => {
    const prev = Math.max(1, currentSlide - 1)
    setCurrentSlide(prev)
  }

  const goToSlide = (slideNumber: number) => {
    setCurrentSlide(slideNumber)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Session wird initialisiert...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Screensaver isController={true} />
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Controller</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Session Code:</span>
                <span className="font-mono text-lg font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                  {sessionCode}
                </span>
                {isConnected && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    ✓ Verbunden
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Slide {currentSlide}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-8 min-h-96"
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">
                  Slide {currentSlide}
                </h2>
                <div className="text-lg text-gray-600 space-y-4">
                  <p>Dies ist der Inhalt von Slide {currentSlide}.</p>
                  <p>Hier können Sie Ihre Präsentationsinhalte anzeigen.</p>
                  <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                    <p className="text-blue-800">
                      Diese Ansicht wird in Echtzeit auf alle verbundenen Displays übertragen.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigation</h3>
              <div className="space-y-3">
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 1}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Vorherige Slide</span>
                </button>
                
                <button
                  onClick={nextSlide}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  <span>Nächste Slide</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">NAV</h3>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((slideNum) => (
                  <button
                    key={slideNum}
                    onClick={() => goToSlide(slideNum)}
                    className={`aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                      currentSlide === slideNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {slideNum}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Aktiv</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Aktuelle Slide:</span>
                  <span className="font-medium">{currentSlide}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Code:</span>
                  <span className="font-mono font-medium">{sessionCode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}