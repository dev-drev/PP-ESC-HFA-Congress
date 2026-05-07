'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import AnimatedPatientCircle from '@/components/AnimatedPatientCircle'
import useEmblaCarousel from 'embla-carousel-react'
import { preloadPatientFlowAssets, preloadPatientSelectionAssets } from '@/components/ImagePreloader'

interface Patient {
  id: string
  name: string
  age: number
  condition: string
  image: string
  link: string
}

const patients: Patient[] = [
  {
    id: 'robert',
    name: 'Robert',
    age: 62,
    condition: 'HFrEF',
    link: '/patient/2/',
    image: '/Card-Man_A_20241028.png'
  },
  {
    id: 'linda',
    name: 'Linda',
    age: 67,
    condition: 'HFpEF',
    link: '/patient/1/',
    image: '/linda.png'
  },
  {
    id: 'joana',
    name: 'Joana',
    age: 57,
    link: '/patient/3/',
    condition: 'eCVD + T2D',
    image: '/characters/03B.png'
  }
]

export default function PatientSelection() {
  const router = useRouter()
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(1)
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({})
  const [isBootLoading, setIsBootLoading] = useState<boolean | null>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    startIndex: 1,
    align: 'center'
  })

  const handleImageLoad = (patientId: string) => {
    setLoadedImages(prev => ({ ...prev, [patientId]: true }))
  }

  const handlePatientSelect = async (patientId: string) => {
    if (isBootLoading !== false) return
    void preloadPatientFlowAssets(patientId)
    setSelectedPatient(patientId)
  }

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    let isMounted = true
    const firstVisitKey = 'patient-assets-preloaded'
    const hasPreloadedBefore = window.sessionStorage.getItem(firstVisitKey) === '1'

    if (hasPreloadedBefore) {
      setIsBootLoading(false)
      return () => {
        isMounted = false
      }
    }

    setIsBootLoading(true)
    preloadPatientSelectionAssets(3000).finally(() => {
      if (isMounted) {
        window.sessionStorage.setItem(firstVisitKey, '1')
        setIsBootLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (selectedPatient) {
      const timer = setTimeout(() => {
        const patient = patients.find(p => p.id === selectedPatient)
        router.push(patient?.link || '/patient/2/')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [selectedPatient, router])

  return (
    <>
      <div className="relative bg-patients">
      {isBootLoading === true && <div className="absolute inset-0 z-50 bg-[#056368]/45 backdrop-blur-md" />}

      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-screen lg:h-full" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)',
          }} />
        </div>
      </div>

      <div className="flex flex-col items-center w-full mx-auto pt-[32px] lg:pt-[150px] h-screen lg:h-[100%]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 lg:mb-16 2xl:mb-32"
        >
          <AnimatePresence mode="wait">
            {selectedPatient ? (
              <motion.div
                key="selected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-[32px] 2xl:text-[53px] font-[400] text-white tracking-wide !m-0">
                  You chose  <span className="relative"><span className="left-0 right-0 top-0 absolute flex block w-full h-full blur-xl z-10 bg-[#FFBF01] bg-clip-text text-[48px] 2xl:text-[53px] font-[900] text-transparent min-w-[790px] opacity-90">
                    {patients.find(p => p.id === selectedPatient)?.name}!
                  </span><span className="text-[#FFBF00] font-[700] uppercase">{patients.find(p => p.id === selectedPatient)?.name}!</span></span>
                </h1>
              </motion.div>
            ) : (
              <motion.div
                key="select"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-[16px] 2xl:text-[53px] font-[400] text-white tracking-wide !m-0">
                  Select your patient and
                </h1>
                <div className="relative">
                  <span className="hidden 2xl:block left-0 right-0 top-0 absolute flex block w-full h-full blur-xl z-10 bg-[#FFBF01] bg-clip-text text-[73px] font-[900] text-transparent min-w-[790px] opacity-90">
                    TRAVEL IN TIME NOW!
                  </span>
                  <h2 className="text-[32px] lg:text-[73px] font-[900] text-[#FFBF00] tracking-tight italic !m-0 text-center z-20">
                    TRAVEL IN TIME NOW!
                  </h2>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="hidden 2xl:flex flex-row justify-center items-center h-fit min-h-max gap-2 w-full max-w-[1700px] mx-auto relative">
          {/* Patients */}
          <div className="flex flex-row justify-center items-center gap-2">
            {patients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              onClick={() => handlePatientSelect(patient.id)}
              className={`relative cursor-pointer ${isBootLoading !== false ? 'pointer-events-none opacity-60' : ''}`}
            >

              <div className="text-center flex gap-0 flex-col lg:flex-row">
              <div className="flex flex-col items-start justify-start mb-4">
  <h3 className={`text-xl lg:text-4xl font-bold mb-1 ${selectedPatient === patient.id ? 'text-white' : selectedPatient ? 'text-[#363636]' : 'text-white'}`}>
                  {patient.name}, {patient.age}
                </h3>
                <p className={`text-lg lg:text-2xl mb-8 ${selectedPatient === patient.id ? 'text-white/90' : selectedPatient ? 'text-[#363636]' : 'text-white/90'}`}>{patient.condition}</p>
              </div>
                <div className="relative mx-auto flex justify-center items-center lg:w-[280px] lg:h-[450px]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: loadedImages[patient.id] ? 1 : 0, scale: loadedImages[patient.id] ? 1 : 0.9 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                  quality={100}
                      src={patient.image}
                      alt={patient.name}
                      width={200}
                      height={220}
                      className={`relative z-10 object-cover transition-all duration-300 max-w-[150px] lg:max-w-[350px] ${selectedPatient && selectedPatient !== patient.id ? 'brightness-[0.2]' : ''}`}
                      priority={index === 1}
                      onLoad={() => handleImageLoad(patient.id)}
                    />
                  </motion.div>
                  {selectedPatient === patient.id ? (
                    <AnimatedPatientCircle />
                  ) : (
                    <Image
                  quality={100}
                      src="/patient-circle.svg"
                      alt="Patient circle"
                      title="Patient circle"
                      width={220}
                      height={80}
                      className="absolute bottom-[-30px] transform z-0 hidden lg:block"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="2xl:hidden w-full overflow-hidden relative"
        >
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {patients.map((patient, index) => (
                <div
                  key={patient.id}
                  className="embla__slide flex-[0_0_100%] min-w-0 px-8"
                  onClick={() => handlePatientSelect(patient.id)}
                >
                  <div className="text-center flex gap-0 flex-col items-center">
                    <div className="flex flex-col items-center justify-start mb-4">
                      <h3 className={`text-[24px] font-bold mt-3 mb-1 ${selectedPatient === patient.id ? 'text-white' : selectedPatient ? 'text-[#363636]' : 'text-white'}`}>
                        {patient.name}, {patient.age}
                      </h3>
                      <p className={`text-lg mb-8 ${selectedPatient === patient.id ? 'text-white/90' : selectedPatient ? 'text-[#363636]' : 'text-white/90'}`}>{patient.condition}</p>
                    </div>
                    <div className="relative mx-auto flex justify-center items-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: loadedImages[patient.id] ? 1 : 0, scale: loadedImages[patient.id] ? 1 : 0.9 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                  quality={100}
                          src={patient.image}
                          alt={patient.name}
                          title={patient.name}
                          width={200}
                          height={220}
                          className={`relative z-10 object-cover transition-all duration-300 max-w-[120px] xl:max-w-[150px] 2xl:max-w-[200px] ${selectedPatient && selectedPatient !== patient.id ? 'brightness-[0.2]' : ''}`}
                          priority={index === currentIndex}
                          onLoad={() => handleImageLoad(patient.id)}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-5 xl:mt-8">
            {patients.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? 'bg-white w-6' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <div className="text-center mt-[70px] mb-[70px] px-4">
          <p className="text-white/60 text-sm">
            Not an actual patient. Visuals created with the help of AI.
          </p>
        </div>
      </div>
    </div>
    </>
  )
}