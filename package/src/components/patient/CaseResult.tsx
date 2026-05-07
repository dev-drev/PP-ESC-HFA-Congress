'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import TimelineComponent from '@/components/TimelineComponent'
import PatientAccordion from '@/components/patient/PatientAccordion';
import MedicalRecordContent from '@/components/patient/MedicalRecord';
import ClinicalReasoningAccordion from '@/components/patient/ClinicalReasoningAccordion';
import DynamicSglt2iAccordion from '@/components/patient/DynamicSglt2iAccordion';
import GuidelinesAccordion from '@/components/patient/GuidelinesAccordion';
import ActionSelector from '@/components/patient/ActionSelector';

interface CaseResultProps {
  patient: any;
  year: number;
  age?: number;
  quote: string;
  backgroundImage: string;
  currentStepImage?: string;
  sglt2iAccordionTitle?: string;
  showClinicalReasoning?: boolean;
  clinicalReasoningVersion?: number;
  endActions?: Array<{ id: string; text: string }>;
}

function CaseResultContent({
  patient,
  year,
  age,
  quote,
  backgroundImage,
  currentStepImage,
  sglt2iAccordionTitle,
  showClinicalReasoning = true,
  clinicalReasoningVersion = 1,
  endActions,
}: CaseResultProps) {
  const [isMedicalRecordOpen, setIsMedicalRecordOpen] = useState(true);
  const [showSglt2iReasoning] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<'medical' | 'sglt2i' | null>('medical');
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const patientAge = age || (year - (2025 - patient.age));
  const router = useRouter();
  const pathname = usePathname();

  const getAp1Path = () => `/patient/${patient.id}`;

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 1536;

      if (!isMobile) {
        setBackgroundOpacity(1);
        return;
      }

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fadeStart = 0;
      const fadeEnd = windowHeight * 0.5;

      if (scrollPosition <= fadeStart) {
        setBackgroundOpacity(1);
      } else if (scrollPosition >= fadeEnd) {
        setBackgroundOpacity(0);
      } else {
        const opacity = 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
        setBackgroundOpacity(opacity);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const actions = endActions || [
    {
      id: 'go-back',
      text: 'Go Back',
    },
    {
      id: 'restart',
      text: 'Restart',
    },
    {
      id: 'select-another',
      text: 'Select another patient',
    },
  ];

  const getPreviousStepPath = () => {
    // Deterministic previous-step routing for final patient flows.
    const previousStepByPath: Record<string, string> = {
      // AP3/AP2 go-back returns to the immediately previous patient-page UI step,
      // not a generic AP1 reset. `phase=followup` skips the 1500ms ActionSelector
      // animation when we already passed through the main->follow-up transition.
      // Linda
      '/sglt2i-case2': '/patient/1?selectedAction=monitoring&phase=followup',
      '/beta-blocker-case': '/patient/1?selectedAction=monitoring&phase=followup',
      '/sglt2i-case': '/patient/1?selectedAction=prescribe-sglt2i',
      // Robert
      '/sglt2i-arni-case': '/patient/2?selectedAction=add-loop-diuretic&phase=followup',
      '/continue-acei-case': '/patient/2?selectedAction=add-loop-diuretic&phase=followup',
      '/end2': '/patient/2?selectedAction=rapid-initiation',
      // Joana
      '/joana-five-years': '/patient/3?selectedAction=optimize-antihypertensive&phase=followup',
      '/joana-optimize-case': '/patient/3?selectedAction=optimize-antihypertensive&phase=followup',
      '/joana-add-sglt2i-case': '/patient/3?selectedAction=add-sglt2i',
    };

    return previousStepByPath[pathname] || null;
  };


  const handleActionSelect = (actionId: string) => {
    if (actionId === 'restart') {
      router.push(getAp1Path());
    } else if (actionId === 'go-back' || actionId === 'time-travel') {
      const previousStepPath = getPreviousStepPath();
      if (previousStepPath) {
        router.push(previousStepPath);
        return;
      }
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back();
      } else {
        router.push(getAp1Path());
      }
    } else if (actionId === 'select-another') {
      router.push('/');
    } else if (actionId === 'see-joana-again') {
      router.push('/joana-five-years');
    } else if (actionId === 'see-other-patients') {
      router.push('/');
    } else if (actionId === 'travel-back') {
      router.push(`/patient/${patient.id}`);
    } else if (actionId === 'proceed') {
      // Handle proceed for James flows
      if (patient.name === 'James') {
        // Determine which flow we're in based on current pathname
        if (typeof window !== 'undefined') {
          const pathname = window.location.pathname;
          if (pathname.includes('flow1-age60')) {
            router.push('/james-flow1-age70');
          } else if (pathname.includes('flow2-age60')) {
            router.push('/james-flow2-age70');
          } else if (pathname.includes('flow3-age60')) {
            router.push('/james-flow3-age70');
          }
        }
      }
    }
  };

  const renderPatientHeader = () => {
    return (
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-6 items-center">
          <div className="lg:pl-[0px]">
            <h1 className="text-[32px] md:text-4xl font-semibold text-white 2xl:text-5xl mb-3 text-shadow-md">
              {patient.name}, {patientAge}
            </h1>
            <AnimatePresence mode="wait">
              <motion.div key={`quote-${quote.substring(0, 15)}`} transition={{ duration: 0.3 }}>
                <div className="text-white text-md  md:text-lg 2xl:text-lg relative max-w-md mt-1 text-balance text-shadow-md">"{quote}"</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen relative z-10 pb-40 bg-[#056368]"
    >


        <TimelineComponent activeYear={year} patientName={patient.name} />


      <div className="mx-auto px-4 ">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mx-auto px-4 2xl:px-8 max-w-[1700px]">
          {/* Left Column - Patient Info, Image and Medical Record */}
          <div className="xl:col-span-1 mt-[30dvh] xl:mt-0 xl:mb-0">
            {/* Patient Header and Quote */}
            <div className="mb-6  mx-auto 2xl:mx-0 px-4 2xl:px-0 max-w-[992px] 2xl:max-w-[300px] 2xl:-translate-x-6">{renderPatientHeader()}</div>
          </div>

          {/* Right Column - Guidelines and Background Image */}
          <div className="mx-0 xl:col-span-2 flex-col lg:flex-row flex gap-8 z-10 relative justify-center lg:justify-start 2xl:pl-0 max-w-[1020px] 2xl:max-w-full mx-auto 2xl:mx-0">
            {!showSglt2iReasoning && (
              <div className="2xl:block justify-center mx-auto">
                <Image
                  quality={100}
                  src={currentStepImage || "/step1.png"}
                  alt="What would you like to do next?"
                  title="What would you like to do next?"
                  width={500}
                  height={200}
                  className="mb-6 overflow-hidden"
                />
                <ActionSelector
                  actions={actions.map(a => ({ id: a.id, text: a.text }))}
                  onSelect={handleActionSelect}
                  isEndCase={true}
                />
              </div>
            )}

            {/* Guidelines and SGLT2i Accordions */}
            <div className="space-y-4 2xl:ml-auto 2xl:pr-8 max-w-[500px] mx-auto">
               {/* Medical Record */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 2xl:mt-0"
            >
              <MedicalRecordContent
                patient={patient}
                defaultOpen={openAccordion === 'medical'}
                onToggle={(isOpen) => {
                  setOpenAccordion(isOpen ? 'medical' : null);
                }}
              />
            </motion.div>
              {sglt2iAccordionTitle !== undefined && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`2xl:w-[500px] h-fit ${openAccordion === 'sglt2i' ? 'pb-10' : ''}`}
                >
                  <DynamicSglt2iAccordion
                    patientId={patient.id}
                    patientName={patient.name}
                    title={sglt2iAccordionTitle}
                    isOpen={openAccordion === 'sglt2i'}
                    onToggle={(isOpen) => {
                      setOpenAccordion(isOpen ? 'sglt2i' : null);
                    }}
                  />
                </motion.div>
              )}
            </div>
          </div>

          <div className="hidden xl:block text-left mt-[10px] col-span-full">
            <p className="text-white/60 text-sm">
              Not an actual patient. Visuals created with the help of AI.
            </p>
          </div>

          <div
          className="left-0 top-0 z-[-1] fixed h-[var(--joana-ap1-hero-height)] w-screen 2xl:w-[43vw] xl:w-[50vw] overflow-hidden transition-opacity duration-300 pointer-events-none"
            style={{ opacity: backgroundOpacity }}
          >
            <div className="absolute inset-y-0 right-0 z-[2] hidden w-[30%] min-w-[8rem] max-w-[52%] bg-gradient-to-l from-[#056368] via-[#056368]/50 to-transparent md:via-[#056368]/45 xl:block"></div>
            <Image
              src={backgroundImage}
              alt="Background"
              title="Background"
              quality={100}
              width={1200}
              height={1600}
              className="relative z-0 h-full w-full object-cover object-top 2xl:object-right-top"
              priority
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseResult(props: CaseResultProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <CaseResultContent {...props} />
    </Suspense>
  );
}