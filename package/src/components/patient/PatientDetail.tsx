'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Patient } from '@/types/patient';
import TimelineComponent from '@/components/TimelineComponent'
import HeartToggleSwitch from '@/components/patient/HeartToggleSwitch';
import MedicalRecordContent from '@/components/patient/MedicalRecord';
import ActionSelector from '@/components/patient/ActionSelector';
import ClinicalReasoningAccordion from '@/components/patient/ClinicalReasoningAccordion';
import DynamicSglt2iAccordion from '@/components/patient/DynamicSglt2iAccordion';
import GuidelinesAccordion from '@/components/patient/GuidelinesAccordion';
import InterconnectedSystemAccordion from '@/components/patient/InterconnectedSystemAccordion';
import { useSearchParams, usePathname } from 'next/navigation';


interface PatientDetailProps {
  patient: Patient;
}

type PatientView = 'overview' | 'monitoring_ecg' | 'prescribe_sglt2i' | 'optimize_antihypertensive';

type SplitHeroPatient = 'Joana' | 'Linda' | 'Robert';

type SplitHeroConfig = {
  views: readonly PatientView[];
  overview: string;
  /** Stesso asset per ogni step post-overview (nessun `stepByView`) */
  step?: string;
  /** Asset per vista: Linda Prescribe vs Monitoring; Robert Rapid vs Loop */
  stepByView?: Partial<Record<PatientView, string>>;
};

const SPLIT_HERO_BY_PATIENT: Record<SplitHeroPatient, SplitHeroConfig> = {
  Joana: {
    views: ['overview', 'optimize_antihypertensive', 'prescribe_sglt2i'],
    overview: '/charactersNew/joana-ap1.png',
    stepByView: {
      prescribe_sglt2i: '/charactersNew/joana-ap21.png',
      optimize_antihypertensive: '/charactersNew/joana-ap22.png',
    },
  },
  Linda: {
    views: ['overview', 'monitoring_ecg', 'prescribe_sglt2i'],
    overview: '/charactersNew/linda-ap1.png',
    stepByView: {
      prescribe_sglt2i: '/charactersNew/linda-ap21.png',
      monitoring_ecg: '/charactersNew/linda-ap22.png',
    },
  },
  Robert: {
    views: ['overview', 'prescribe_sglt2i', 'monitoring_ecg'],
    overview: '/charactersNew/robert-ap1.png',
    stepByView: {
      prescribe_sglt2i: '/charactersNew/robert-ap21.png',
      monitoring_ecg: '/charactersNew/robert-ap22.png',
    },
  },
};

function splitHeroPatientKey(name: string): SplitHeroPatient | null {
  return name === 'Joana' || name === 'Linda' || name === 'Robert' ? name : null;
}

export default function PatientDetail({ patient }: PatientDetailProps) {
  const pathname = usePathname();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [timelineYear, setTimelineYear] = useState(2025);
  const [showHeartView, setShowHeartView] = useState(false);
  const [isMedicalRecordOpen, setIsMedicalRecordOpen] = useState(true);
  const [showSglt2iReasoning, setShowSglt2iReasoning] = useState(false);
  const [currentView, setCurrentView] = useState<PatientView>('overview');
  const [isTimelineChanging, setIsTimelineChanging] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [showInterconnectedSystem, setShowInterconnectedSystem] = useState(false);
  const [currentStepImage, setCurrentStepImage] = useState<string>(
    patient.stepImageSrc || `/next-steps/${patient.name.toLowerCase()}/final/step1.png`
  );
  const [openAccordion, setOpenAccordion] = useState<'medical' | 'guidelines' | 'sglt2i' | null>('medical');
  const [imageOpacity, setImageOpacity] = useState(1);
  const [isSmartphone, setIsSmartphone] = useState(false);
  const [isBelowDesktopLg, setIsBelowDesktopLg] = useState(false);
  const splitHeroKey = splitHeroPatientKey(patient.name);
  const splitHeroCfg = splitHeroKey ? SPLIT_HERO_BY_PATIENT[splitHeroKey] : null;
  const isSplitHero = !!splitHeroCfg && splitHeroCfg.views.includes(currentView);
  const splitHeroImageSrc: string | null = !splitHeroCfg
    ? null
    : currentView === 'overview'
      ? splitHeroCfg.overview
      : splitHeroCfg.stepByView?.[currentView] ?? splitHeroCfg.step ?? null;
  /** Split hero (Joana / Linda / Robert): desktop lg+ = striscia fissa; sotto lg = stack full-bleed */
  const isSplitHeroStacked = isSplitHero && isBelowDesktopLg;
  const isSplitHeroDesktop = isSplitHero && !isBelowDesktopLg;
  /** Split hero su tablet (768–1023): disclaimer sotto l’hero */
  const isTabletSplitHero = isSplitHeroStacked && !isSmartphone;
  /** Foto inline tipo Linda classica; con split hero su narrow si usa full-bleed, non questo blocco */
  const showInlinePatientPhoto =
    (!isSplitHero || isSplitHeroStacked) && !(isSplitHeroStacked && isSplitHero);

  const handleHeartToggle = (active: boolean) => {
    setShowHeartView(active);
    setShowInterconnectedSystem(active);
    if (active) {
      setIsMedicalRecordOpen(false);
      setOpenAccordion(null);
    } else {
      setIsMedicalRecordOpen(true);
      setOpenAccordion('medical');
    }
  };

  useEffect(() => {
    const w = window.innerWidth;
    setIsSmartphone(w < 768);
    setIsBelowDesktopLg(w < 1024);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const smartphone = window.innerWidth < 768;
      setIsSmartphone(smartphone);
      setIsBelowDesktopLg(window.innerWidth < 1024);

      if (!smartphone) {
        setImageOpacity(1);
        return;
      }

      /* Joana / Linda / Robert split-hero: niente fade allo scroll — foto resta full-height come negli altri step */
      if (splitHeroPatientKey(patient.name)) {
        setImageOpacity(1);
        return;
      }

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fadeStart = 0;
      const fadeEnd = windowHeight * 0.3;

      if (scrollPosition <= fadeStart) {
        setImageOpacity(1);
      } else if (scrollPosition >= fadeEnd) {
        setImageOpacity(0);
      } else {
        const opacity = 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
        setImageOpacity(opacity);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [patient.name]);

  // Determine if we should show the SGLT2i accordion based on current route
  const shouldShowSglt2iAccordion = pathname.includes('sglt2i-case') || 
                                    pathname.includes('beta-blocker-case') || 
                                    pathname.includes('sglt2i-arni-case') ||
                                    pathname.includes('continue-acei-case') ||
                                    showSglt2iReasoning;

  // Map action IDs to step images based on patient
  const getActionStepImage = (actionId: string): string => {
    const patientName = patient.name.toLowerCase();
    
    // Patient-specific step image mappings
    const patientStepImages: Record<string, Record<string, string>> = {
      'linda': {
        'monitoring': '/next-steps/linda/final/step5.png',
        'prescribe-sglt2i': '/next-steps/linda/final/step4.png',
        'beta_blocker': '/next-steps/linda/final/step7.png',
        'prescribe_sglt2i': '/next-steps/linda/final/step6.png',
      },
      'robert': {
        'add-loop-diuretic': '/next-steps/robert/final/step2.png',
        'rapid-initiation': '/next-steps/robert/final/step1.png',
        'continue_acei': '/next-steps/robert/final/step6.png',
        'prescribe_sglt2i_mra': '/next-steps/robert/final/step6.png',
      },
      'joana': {
        'optimize-antihypertensive': '/next-steps/joana/final/step2.png',
        'add-sglt2i': '/next-steps/joana/final/step3.png',
        'add_loop_diuretic': '/next-steps/joana/final/step5.png',
        'add_sglt2i_loop_diuretic': '/next-steps/joana/final/step6.png',
      },
      'james': {
        'confirm-ckd-initiate-sglt2i': '/next-steps/james/step1.png',
        'uptitrate-statin-diuretic': '/next-steps/james/step2.png',
        'add_beta_blocker': '/next-steps/james/step3.png',
        'confirm_sglt2i': '/next-steps/james/step4.png',
      },
      'erik': {
        'initiate-sglt2i-erik': '/next-steps/erik/step1.png',
        'continue-monitoring-erik': '/next-steps/erik/step2.png',
        'add-sglt2i-erik': '/next-steps/erik/step3.png',
        'intensify-statin': '/next-steps/erik/step4.png',
      }
    };
    
    // Return patient-specific image if exists, otherwise fallback to generic
    if (patientStepImages[patientName]?.[actionId]) {
      return patientStepImages[patientName][actionId];
    }
    
    // Generic fallback mappings
    const genericStepImages: Record<string, string> = {
      'monitoring': '/step2.png',
      'prescribe-sglt2i': '/step3.png',
      'add-loop-diuretic': '/step2.png',
      'rapid-initiation': '/step3.png',
      'beta_blocker': '/step4.png',
      'prescribe_sglt2i': '/step5.png',
      'continue_acei': '/step5.png',
      'prescribe_sglt2i_mra': '/step6.png',
    };
    
    return genericStepImages[actionId] || patient.stepImageSrc || `/next-steps/${patientName}/final/step1.png`;
  };



  const actions = patient.condition === 'HFpEF'
    ? [
        {
          id: 'monitoring',
          label: 'Continue monitoring with Echo at least once a year',
          color: 'bg-yellow-400',
          text: 'Continue monitoring with Echo at least once a year'
        },
        {
          id: 'prescribe-sglt2i',
          label: 'Prescribe an SGLT2i',
          color: 'bg-teal-500',
          text: 'Prescribe an SGLT2i'
        },
      ]
    : patient.condition === 'T2D+CAD'
    ? [
        {
          id: 'optimize-antihypertensive',
          label: 'Optimize antihypertensive therapy',
          color: 'bg-yellow-400',
          text: 'Optimize antihypertensive therapy'
        },
        {
          id: 'add-sglt2i',
          label: 'Add SGLT2i and optimize antihypertensive therapy',
          color: 'bg-teal-500',
          text: 'Add SGLT2i and optimize antihypertensive therapy'
        },
      ]
    : patient.name === 'Erik'
    ? [
        {
          id: 'initiate-sglt2i-erik',
          label: 'Initiate SGLT2i',
          color: 'bg-teal-500',
          text: 'Initiate SGLT2i'
        },
        {
          id: 'continue-monitoring-erik',
          label: 'Initiate calcium-channel blocker',
          color: 'bg-teal-500',
          text: 'Initiate calcium-channel blocker'
        },
      ]
    : patient.name === 'James'
    ? [
        {
          id: 'confirm-ckd-initiate-sglt2i',
          label: 'Confirm suspected CKD diagnosis and initiate SGLT2i',
          color: 'bg-teal-500',
          text: 'Confirm suspected CKD diagnosis and initiate SGLT2i'
        },
        {
          id: 'uptitrate-statin-diuretic',
          label: 'Up-titrate statin and prescribe diuretic',
          color: 'bg-yellow-400',
          text: 'Up-titrate statin and prescribe diuretic'
        },
      ]
    : [
        {
          id: 'add-loop-diuretic',
          label: 'Add loop diuretic and monitor Robert regularly',
          color: 'bg-yellow-400',
          text: 'Add loop diuretic and monitor Robert regularly'
        },
        {
          id: 'rapid-initiation',
          label: 'Rapid initiation (Prescribe SGLT2i, ARNi, and MRA; and add loop diuretic)',
          color: 'bg-teal-500',
          text: 'Rapid initiation (Prescribe SGLT2i, ARNi, and MRA; and add loop diuretic)'
        },
      ];

  const viewTimelineSettings: Record<PatientView, { year: number }> = {
    overview: { year: 2025 },
    monitoring_ecg: { year: 2030 },
    prescribe_sglt2i: { year: 2030 },
    optimize_antihypertensive: { year: 2025 },
    flow2_no_sglt2i_at_60: { year: 2030 },
    flow1_sglt2i_at_60: { year: 2030 },
    flow1_sglt2i_arni_at_52: { year: 2035 },
  } as any;

  const currentPatientData = useMemo(() => {
    if (currentView === 'overview') {
      return {
        ...patient,
        timelineYear: viewTimelineSettings.overview.year,
      };
    }

    // For CKD patients, map views to correct futureStates
    let futureStateKey = currentView;
    if (patient.condition === 'CKD' && patient.name === 'James') {
      if (currentView === 'monitoring_ecg') {
        futureStateKey = 'flow2_no_sglt2i_at_60' as PatientView;
      } else if (currentView === 'prescribe_sglt2i') {
        futureStateKey = 'flow1_sglt2i_at_60' as PatientView;
      }
    }
    // For Erik CKD patient, map views to correct futureStates
    else if (patient.name === 'Erik') {
      if (currentView === 'monitoring_ecg') {
        futureStateKey = 'flow2_loop_diuretic_at_52' as PatientView;
      } else if (currentView === 'prescribe_sglt2i') {
        futureStateKey = 'flow1_sglt2i_arni_at_52' as PatientView;
      }
    }

    const futureState = patient.futureStates?.[futureStateKey];
    if (!futureState) {
      return {
        ...patient,
        timelineYear: viewTimelineSettings[currentView].year,
      };
    }

    if (
      currentView === 'prescribe-sglt2i' &&
      showSglt2iReasoning &&
      patient.proceededStates?.prescribe_sglt2i?.quote
    ) {
      return {
        ...patient,
        ...futureState,
        timelineYear: futureState.year,
        quote: patient.proceededStates.prescribe_sglt2i.quote,
      };
    }

    return {
      ...patient,
      timelineYear: futureState.year,
      nyhaClass: futureState.nyhaClass,
      treatments: futureState.treatments,
      metrics: futureState.metrics,
      age: futureState.age || patient.age,
      quote: futureState.quote || patient.quote,
      medicalConsiderations:
        futureState.medicalConsiderations || patient.medicalConsiderations,
      currentTreatment:
        futureState.currentTreatment || patient.currentTreatment,
      historyAndComorbidities:
        futureState.historyAndComorbidities || patient.historyAndComorbidities,
      imageSrc: futureState.imageSrc || patient.imageSrc,
      overlaySrc: futureState.overlaySrc || patient.overlaySrc,
      backgroundSrc: futureState.backgroundSrc || patient.backgroundSrc,
      stepImageSrc: futureState.stepImageSrc || patient.stepImageSrc,
    };
  }, [patient, currentView, viewTimelineSettings, showSglt2iReasoning]);

  useEffect(() => {
    setIsTimelineChanging(true);
    setAnimationKey((prev) => prev + 1);

    const timer = setTimeout(() => {
      setIsTimelineChanging(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [currentView]);

  useEffect(() => {
    if (currentView === 'overview') {
      setIsMedicalRecordOpen(true);
    }
  }, [currentView]);

  const handleActionSelect = (actionId: string) => {
    setSelectedAction(actionId);

    // For Erik - change view and images when SGLT2i is initiated
    if (patient.name === 'Erik' && actionId === 'initiate-sglt2i-erik') {
      setCurrentView('prescribe_sglt2i');
      // Let ActionSelector handle the follow-up options
      return;
    }

    // Update step image immediately
    const stepImage = getActionStepImage(actionId);
    if (stepImage) {
      setCurrentStepImage(stepImage);
    }

    // For James: confirm-ckd-initiate-sglt2i - add automatic transition to step3
    if (actionId === 'confirm-ckd-initiate-sglt2i') {
      // First show step2 (already set above)
      // Then automatically transition to step3 after a few seconds
      setTimeout(() => {
        setCurrentStepImage('/next-steps/james/step3.png');
      }, 3000); // Show step3 after 3 seconds
    }

    // Delay view changes by 2 seconds
    setTimeout(() => {
        // For James: confirm-ckd-initiate-sglt2i (Flow 1 start)
        if (actionId === 'confirm-ckd-initiate-sglt2i') {
          setCurrentView('prescribe_sglt2i');
          setShowSglt2iReasoning(false);
          // Don't set stepImageSrc here - it's handled by the automatic transition above
        }
        // For Erik: initiate-sglt2i-erik (Flow 1 start)
        else if (actionId === 'initiate-sglt2i-erik') {
          setCurrentView('prescribe_sglt2i');
          setShowSglt2iReasoning(false);
          const futureState = patient.futureStates?.flow1_sglt2i_arni_at_52;
          if (futureState?.stepImageSrc) {
            setCurrentStepImage(futureState.stepImageSrc);
          }
        }
        // For Erik: continue-monitoring-erik (Flow 2/3 start)
        else if (actionId === 'continue-monitoring-erik') {
          setCurrentView('monitoring_ecg');
          setShowSglt2iReasoning(false);
          const futureState = patient.futureStates?.monitoring_ecg;
          if (futureState?.stepImageSrc) {
            setCurrentStepImage(futureState.stepImageSrc);
          }
        }
        // For James: uptitrate-statin-diuretic (Flow 2/3 start)
        else if (actionId === 'uptitrate-statin-diuretic') {
          setCurrentView('monitoring_ecg');
          setShowSglt2iReasoning(false);
          // Set step5.png as the final image for this action
          setCurrentStepImage('/next-steps/james/step5.png');
        }
        // For Joana: optimize-antihypertensive
        else if (actionId === 'optimize-antihypertensive') {
          setCurrentView('optimize_antihypertensive' as PatientView);
          setShowSglt2iReasoning(false);
          // Update step image after transition
          const futureState = patient.futureStates?.optimize_antihypertensive;
          if (futureState?.stepImageSrc) {
            setCurrentStepImage(futureState.stepImageSrc);
          }
        }
        // For Joana: add-sglt2i
        else if (actionId === 'add-sglt2i') {
          // Update to show SGLT2i prescription state
          setCurrentView('prescribe_sglt2i');
          setShowSglt2iReasoning(false);
          
          // The futureState already has the correct 03C.png image
          const futureState = patient.futureStates?.prescribe_sglt2i;
          if (futureState?.stepImageSrc) {
            setCurrentStepImage(futureState.stepImageSrc);
          }
        }
        // For HFpEF patient monitoring
        else if (actionId === 'monitoring') {
          setCurrentView('monitoring_ecg');
          setShowSglt2iReasoning(false);
          // Update step image after transition
          const futureState = patient.futureStates?.monitoring_ecg;
          if (futureState?.stepImageSrc) {
            setCurrentStepImage(futureState.stepImageSrc);
          }
        } 
        // For both HFpEF and HFrEF SGLT2i actions
        else if (actionId === 'prescribe-sglt2i' || actionId === 'rapid-initiation') {
          if (currentView === 'prescribe_sglt2i' && selectedAction === actionId) {
            // If already in prescribe-sglt2i view and same action selected, show reasoning
            setShowSglt2iReasoning(true);
          } else {
            // Otherwise just switch to prescribe-sglt2i view
            setCurrentView('prescribe_sglt2i');
            setShowSglt2iReasoning(false);
            // Update step image after transition
            const futureState = patient.futureStates?.prescribe_sglt2i;
            if (futureState?.stepImageSrc) {
              setCurrentStepImage(futureState.stepImageSrc);
            }
          }
        }
        // For HFrEF monitoring action
        else if (actionId === 'add-loop-diuretic') {
          setCurrentView('monitoring_ecg');
          setShowSglt2iReasoning(false);
          // Update step image after transition
          const futureState = patient.futureStates?.monitoring_ecg;
          if (futureState?.stepImageSrc) {
            setCurrentStepImage(futureState.stepImageSrc);
          }
        }
      }, 2000);
  };

  const renderPatientHeader = () => {
    return (
      <div
        className={`flex m-4 xl:m-0 items-start ${
          isSplitHeroDesktop ? 'w-full justify-start' : 'justify-center 2xl:justify-between'
        }`}
      >
        <div className="flex gap-6 items-center">
       
          <div className="pl-[0px] relative">
            <h1 className={`text-[32px] font-semibold text-white lg:text-5xl mb-3 ${isSplitHeroDesktop ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]' : ''}`}>
              {currentPatientData.name}, {currentPatientData.age}
            </h1>
            <AnimatePresence mode="wait">
              <motion.div
                key={`quote-${currentPatientData.quote?.substring(0, 15) || ''}-${showSglt2iReasoning}`}
               
                transition={{ duration: 0.3 }}
              >
                {currentPatientData.quote && (
                  <div className={`text-white text-md 2xl:text-lg relative max-w-md mt-1 text-balance ${isSplitHeroDesktop ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]' : ''}`}>
                    "{currentPatientData.quote}"
                  </div>
                )}
              </motion.div>

            </AnimatePresence>
                   <div className="mt-6">
                                    {currentPatientData.imageSrc && !showSglt2iReasoning && (
              <div className="mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {!showSglt2iReasoning && (
                    <div className="max-w-max">
                      <HeartToggleSwitch
                        isActive={showHeartView}
                        onChange={handleHeartToggle}
                      />
                    </div>
                  )}
          
                </motion.div>
              </div>
            )}
                      </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>

      <div className={`relative pb-0 ${
        showSglt2iReasoning ? 'entry-screen-bg' : 'entry-screen'
    }`}>
        {isSplitHeroStacked && (
          <div
            className="pointer-events-none absolute left-1/2 top-0 z-0 h-[var(--joana-ap1-hero-height)] min-h-[var(--joana-ap1-hero-height)] max-h-[100dvh] w-screen max-w-none -translate-x-1/2 overflow-hidden transition-opacity duration-300"
            style={{ opacity: imageOpacity }}
          >
            <div className="relative h-full w-full" aria-hidden>
              <Image
                src={splitHeroImageSrc!}
                alt=""
                fill
                className="object-cover object-top"
                sizes="100vw"
                priority
              />
            </div>
            {/* Leggero fade in basso sulla foto (step 1 / 2) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[34%] bg-gradient-to-t from-[#056368]/55 via-[#056368]/14 to-transparent"
            />
            <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/50 via-black/15 to-[#056368]" aria-hidden />
            {isSmartphone && (
              <div className="absolute inset-x-0 bottom-36 z-20 px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-8">
                <p className="text-left text-white/60 text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]">
                  Not an actual patient. Visuals created with the help of AI.
                </p>
              </div>
            )}
          </div>
        )}

        <div
          className={`relative z-30 mx-auto flex w-full max-w-[1700px] justify-center px-4 2xl:px-8 patient-shell-fullwidth ${isSplitHeroStacked ? 'drop-shadow-[0_6px_28px_rgba(0,0,0,0.35)]' : ''}`}
        >
          <TimelineComponent activeYear={currentPatientData.timelineYear} patientName={patient.name} />
        </div>

      <div className="mx-auto px-4 2xl:px-8 max-w-[1700px] relative z-10 patient-shell-fullwidth">

        <div
          className={`grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-6 relative z-20 ${
            isSplitHeroDesktop ? 'lg:min-h-[var(--joana-ap1-hero-height)]' : ''
          }`}
        >
          {/* Left Column - Patient Info, Image and Action Selection */}
          <div className="2xl:col-span-1">
            {/* Patient Header and Quote */}
            <div className="mb-0">
              <div
                className={`relative z-30 w-full ${
                  isSplitHeroDesktop
                    ? 'flex justify-start lg:-translate-x-2 xl:-translate-x-2 2xl:-translate-x-0'
                    : 'flex justify-center 2xl:justify-start'
                } ${isSplitHeroStacked ? 'drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]' : ''}`}
              >
                {renderPatientHeader()}
              </div>
                {showInlinePatientPhoto && <div
                  className={currentPatientData.name === 'Linda' ? '' : currentPatientData.name === 'Joana' ? '' : '2xl:w-[448px]'}
                  style={{
                    transition: 'opacity 0.3s ease',
                    opacity: imageOpacity
                  }}
                >
                      <div
                        key={showHeartView ? 'heart' : 'normal'}
                        className="w-full relative flex justify-center 2xl:justify-start flex-row 2xl:block"
                      >
                        <div
                          className="relative inline-block"
                          style={{
                            maxHeight: isSmartphone ? '550px' : '700px',
                            overflow: 'hidden',
                            maskImage: isSmartphone
                              ? 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)'
                              : 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
                            WebkitMaskImage: isSmartphone
                              ? 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)'
                              : 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
                          }}
                        >
                          <Image
                            src={isSplitHeroStacked ? splitHeroImageSrc! : currentPatientData.imageSrc}
                            alt={currentPatientData.name}
                            title={currentPatientData.name}
                            width={isSplitHeroStacked ? 760 : 400}
                            height={isSplitHeroStacked ? 900 : 200}
                            className="z-20 relative 2xl:block w-auto h-auto"
                            priority
                          />
                          {/* Desktop (lg+): disclaimer in basso alla foto; su mobile resta il blocco sotto */}
                          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 hidden pb-2 pl-0 pr-2 pt-10 lg:block">
                            <p className="text-left text-white/60 text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                              Not an actual patient. Visuals created with the help of AI.
                            </p>
                          </div>
                        </div>
                      </div>
                  </div>}

                  {/* Disclaimer — split hero mobile: overlay in basso sull’hero; tablet: riga full width; desktop: striscia fissa / overlay inline */}
                  {!isTabletSplitHero && !isSplitHeroDesktop && !(isSplitHeroStacked && isSmartphone) && (
                  <div
                    className={`text-left mt-4 mb-4 ${showInlinePatientPhoto ? 'lg:hidden' : ''}`}
                  >
                    <p className="text-white/60 text-xs">
                      Not an actual patient. Visuals created with the help of AI.
                    </p>
                  </div>
                  )}
            </div>


        
           

          





            {/* Clinical Reasoning (when SGLT2i is selected) */}
            {showSglt2iReasoning && (
              <motion.div
                
                className="mb-6"
              >
                <ClinicalReasoningAccordion
                  patientId={patient.id}
                  patientName={patient.name}
                  isOpen={true}
                />
              </motion.div>
            )}
          </div>

          {isTabletSplitHero && (
            <div className="col-span-full relative z-30 mb-4 mt-[min(28vh,16rem)] max-lg:px-1 text-center">
              <p className="text-white/60 text-xs text-balance max-w-prose mx-auto">
                Not an actual patient. Visuals created with the help of AI.
              </p>
            </div>
          )}

          {/* Right Column — split hero narrow: cards sotto l’hero */}
          <div
            className={`lg:col-span-2 flex gap-8 flex-col lg:flex-row lg:items-start relative z-20 ${
              isSplitHeroStacked
                ? 'mt-[min(48vh,28rem)] pt-4'
                : ''
            }`}
          >
             {/* What would you like to do next? - Visual placeholder */}

<div className="w-full min-w-0 flex-1 basis-0 2xl:ml-[12px] flex flex-col items-stretch justify-start 2xl:block 2xl:mx-0 self-start">
            {!showSglt2iReasoning && (
              <div className="w-full min-w-0">
              <Image
                src={currentStepImage}
                alt="What would you like to do next?"
                title="What would you like to do next?"
                width={500}
                height={200}
                sizes="(max-width: 1023px) 92vw, (max-width: 1700px) min(40vw, 500px), 500px"
                className="mb-6 h-auto w-full max-w-[clamp(17rem,32vw,31.25rem)] object-contain mx-0 patient-panel-full"
              />
            </div>
            )}

              <ActionSelector
        actions={actions.map(a => ({ id: a.id, text: a.text }))}
        onSelect={handleActionSelect}
        selectedActionId={selectedAction}
        onGoBack={() => {
          setCurrentView('overview');
          setShowSglt2iReasoning(false);
          setSelectedAction(null);
          setCurrentStepImage(patient.stepImageSrc || `/next-steps/${patient.name.toLowerCase()}/final/step1.png`);
        }}
      />
    </div>

<div className="flex min-w-0 w-full max-w-[clamp(18rem,38vw,31.25rem)] 2xl:max-w-[500px] flex-1 basis-0 flex-col items-stretch justify-start 2xl:mx-0 patient-panel-full self-start">
    {/* Medical Record */}
            <motion.div
              key={`medical-${animationKey}`}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >

                <MedicalRecordContent
                  patient={currentPatientData}
                  defaultOpen={openAccordion === 'medical'}
                  onToggle={(isOpen) => {
                    setOpenAccordion(isOpen ? 'medical' : null);
                  }}
                />

            </motion.div>
            {!showSglt2iReasoning && (
              showInterconnectedSystem ? (
                <motion.div
                  key={`interconnected-${animationKey}`}
                  className="w-full patient-panel-full 2xl:w-[500px] bg-white/70 backdrop-blur-lg rounded-4xl h-fit pb-10"
                >
                  <InterconnectedSystemAccordion 
                    isOpen={true} 
                    patientId={patient.id}
                    patientName={patient.name}
                  />
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <motion.div
                    key={`guidelines-${animationKey}`}
                    className={`h-fit ${openAccordion === 'guidelines' || !shouldShowSglt2iAccordion ? 'pb-10' : ''}`}
                  >
                    <GuidelinesAccordion
                      patientId={patient.id}
                      patientName={patient.name}
                      hideSlide4={patient.name === 'Joana' && (!selectedAction || selectedAction === 'add-sglt2i' || selectedAction === 'optimize-antihypertensive')}
                      hideSlide3={patient.name === 'Joana' && !selectedAction}
                      isOpen={openAccordion === 'guidelines'}
                      onToggle={(isOpen) => {
                        setOpenAccordion(isOpen ? 'guidelines' : null);
                      }}
                    />
                  </motion.div>
                  {shouldShowSglt2iAccordion && (
                    <motion.div
                      key={`initiate-sglt2i-${animationKey}`}
                      className={`h-fit ${openAccordion === 'sglt2i' ? 'pb-10' : ''}`}
                    >
                      <DynamicSglt2iAccordion
                        patientId={patient.id}
                        patientName={patient.name}
                        isOpen={openAccordion === 'sglt2i'}
                        onToggle={(isOpen) => {
                          setOpenAccordion(isOpen ? 'sglt2i' : null);
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              )
            )}
          </div>
          </div>
        </div>

        {/* Background image for SGLT2i reasoning */}
        {showSglt2iReasoning && currentPatientData.backgroundSrc && (
          <div className="relative overflow-hidden mb-6">
            <Image
              src={currentPatientData.backgroundSrc}
              alt="Background"
              title="Background"
              width={1920}
              height={1080}
              className="object-cover object-center rounded-md"
              priority
            />
          </div>
        )}
        {isSplitHeroDesktop && (
          <div
            className="tablet-joana-fullbleed fixed left-0 top-0 z-0 h-[var(--joana-ap1-hero-height)] w-[min(50vw,var(--joana-ap1-strip-max-width))] overflow-hidden transition-opacity duration-300 pointer-events-none"
            style={{ opacity: imageOpacity }}
          >
            <Image
              src={splitHeroImageSrc!}
              alt={`${patient.name} — hero`}
              title={`${patient.name} — hero`}
              width={1200}
              height={1600}
              className="relative z-0 h-full w-full object-cover object-left-bottom max-md:object-[center_bottom] tablet-joana-image-cover lg:object-left-bottom xl:object-[56%_100%] 2xl:object-left-bottom"
              priority
            />
            {/* Leggero fade in basso sulla foto (step 1 / 2, desktop) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[38%] bg-gradient-to-t from-[#056368]/48 via-[#056368]/10 to-transparent"
            />
            {/* Tablet: full-bleed photo, no fade; desktop lg+: blend into content */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-[2] hidden w-[40%] min-w-[8rem] max-w-[52%] bg-gradient-to-l from-[#056368] via-[#056368]/50 to-transparent md:via-[#056368]/45 lg:block"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#056368] via-[#056368]/55 to-transparent px-3 pb-2 pt-10">
              <p className="text-left text-white/60 text-xs drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]">
                Not an actual patient. Visuals created with the help of AI.
              </p>
            </div>
          </div>
        )}
      </div>

    
    </div>
    </>
  );
}