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
  const isJoanaAp1 = patient.name === 'Joana' && currentView === 'overview';

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
    setIsSmartphone(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const smartphone = window.innerWidth < 768;
      setIsSmartphone(smartphone);

      if (!smartphone) {
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
  }, []);

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
      <div className="flex justify-center 2xl:justify-between items-start">
        <div className="flex gap-6 items-center">
       
          <div className="pl-[0px] relative">
            <h1 className={`text-[32px] font-semibold text-white lg:text-5xl mb-3 ${isJoanaAp1 ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]' : ''}`}>
              {currentPatientData.name}, {currentPatientData.age}
            </h1>
            <AnimatePresence mode="wait">
              <motion.div
                key={`quote-${currentPatientData.quote?.substring(0, 15) || ''}-${showSglt2iReasoning}`}
               
                transition={{ duration: 0.3 }}
              >
                {currentPatientData.quote && (
                  <div className={`text-white text-md 2xl:text-lg relative max-w-md mt-1 text-balance ${isJoanaAp1 ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]' : ''}`}>
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
      {/* Session indicator */}



        <div className="relative z-30 mx-auto flex w-full max-w-[1700px] justify-center px-4 2xl:px-8">
          <TimelineComponent activeYear={currentPatientData.timelineYear} patientName={patient.name} />
        </div>

      <div className="mx-auto px-4 2xl:px-8 max-w-[1700px] relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-6 relative z-20">
          {/* Left Column - Patient Info, Image and Action Selection */}
          <div className="2xl:col-span-1">
            {/* Patient Header and Quote */}
            <div className="mb-0">
              <div className="flex justify-center 2xl:justify-start relative z-30">{renderPatientHeader()}</div>
                {!isJoanaAp1 && <div
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
                            maxHeight: isJoanaAp1 ? (isSmartphone ? '520px' : '700px') : (isSmartphone ? '550px' : '700px'),
                            overflow: 'hidden',
                            maskImage: isJoanaAp1
                              ? 'linear-gradient(to right, black 0%, black 72%, transparent 100%)'
                              : (isSmartphone
                                ? 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)'
                                : 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'),
                            WebkitMaskImage: isJoanaAp1
                              ? 'linear-gradient(to right, black 0%, black 72%, transparent 100%)'
                              : (isSmartphone
                                ? 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)'
                                : 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)')
                          }}
                        >
                          <Image
                            src={isJoanaAp1 ? '/charactersNew/joana-ap1.png' : currentPatientData.imageSrc}
                            alt={currentPatientData.name}
                            title={currentPatientData.name}
                            width={isJoanaAp1 ? 760 : 400}
                            height={isJoanaAp1 ? 900 : 200}
                            className={isJoanaAp1
                              ? "z-20 relative 2xl:block w-auto h-[70vh] max-w-none object-cover object-left"
                              : "z-20 relative 2xl:block w-auto h-auto"}
                            priority
                          />
                        </div>
                      </div>
                  </div>}

                  {/* Disclaimer */}
                  <div className="text-left mt-4 mb-4">
                    <p className="text-white/60 text-xs">
                      Not an actual patient. Visuals created with the help of AI.
                    </p>
                  </div>
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

          {/* Right Column - Guidelines */}
          <div className="lg:col-span-2 flex gap-8 flex-col lg:flex-row relative z-20">
             {/* What would you like to do next? - Visual placeholder */}

<div className="w-full min-w-0 flex-1 basis-0 2xl:ml-[12px] flex justify-start flex-col 2xl:block 2xl:mx-auto">
            {!showSglt2iReasoning && (
              <div className="w-full min-w-0">
              <Image
                src={currentStepImage}
                alt="What would you like to do next?"
                title="What would you like to do next?"
                width={500}
                height={200}
                sizes="(max-width: 1023px) 92vw, (max-width: 1700px) min(40vw, 500px), 500px"
                className="mb-6 h-auto w-full max-w-[clamp(17rem,32vw,31.25rem)] object-contain mx-auto lg:mx-0"
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

<div className="flex flex-col min-w-0 flex-1 basis-0 2xl:ml-auto 2xl:mr-0 justify-center 2xl:justify-start mx-auto w-full 2xl:w-auto max-w-[clamp(18rem,38vw,31.25rem)] 2xl:max-w-[500px]">
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
                  className="2xl:w-[500px] bg-white/70 backdrop-blur-lg rounded-4xl h-fit pb-10"
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
        {isJoanaAp1 && (
          <div
            className="fixed left-0 top-0 z-0 h-[calc(100dvh-var(--joana-ap1-bg-bottom-reserve))] max-h-[calc(100dvh-var(--joana-ap1-bg-bottom-reserve))] w-[40vw] max-w-[980px] overflow-hidden transition-opacity duration-300 pointer-events-none"
            style={{ opacity: imageOpacity }}
          >
            <Image
              src="/charactersNew/joana-ap1.png"
              alt="Joana AP1 background"
              title="Joana AP1 background"
              width={1200}
              height={1600}
              className="object-cover object-center h-full w-full"
              priority
            />
            <div className="absolute inset-y-0 right-0 w-[52%] bg-gradient-to-t 2xl:bg-gradient-to-l from-[#056368] via-[#056368]/75 to-transparent" />
          </div>
        )}
      </div>

    
    </div>
    </>
  );
}