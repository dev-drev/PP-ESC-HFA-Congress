'use client';

import { Patient } from '@/types/patient';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface MedicalRecordContentProps {
  patient: Patient;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function MedicalRecordContent({
  patient,
  defaultOpen = true,
  onToggle,
}: MedicalRecordContentProps) {
  const { metrics, nyhaClass } = patient;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle?.(newIsOpen);
  };

  // Animation variants for metric values
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Detect different cases based on pathname
  const isAdvancedCase = pathname === '/sglt2i-case2';
  const isEnd2Case = pathname === '/end2';

  // For Case2, check the pathname
  const isInCase2 =
    pathname === '/prescription-result' ||
    pathname === '/' ||
    pathname === '/monitoring-result' ||
    pathname === '/case2';

  // Special case for detecting if we're in Case2 via image path in URL
  // This works well because we want to show different data in Case2 vs other cases
  const isCaseWithImage = (imagePath: string): boolean => {
    try {
      if (typeof window !== 'undefined') {
        return window.location.href.includes(imagePath);
      }
    } catch (e) {
      // Fallback for SSR or errors
      return false;
    }
    return false;
  };

  // Force Case2 values if we're on a route with the specific Case2 background image
  const forceCase2Values = isInCase2 || isCaseWithImage('01B.jpg');

  // Get case-specific metrics based on the current URL path
  const getCaseSpecificMetrics = () => {
    const baseMetrics = { ...metrics };

    // Check if Erik has SGLT2i in treatments (prescribe_sglt2i state)
    const erikHasSglt2i = patient.name === 'Erik' && patient.treatments.some(t => t.name.includes('SGLT2i'));

    // Erik with SGLT2i
    if (erikHasSglt2i) {
      return {
        ...baseMetrics,
        bloodPressure: '132/80',
        egfr: 45,
        uacr: '324',
        bmi: '25.4',
        hba1c: '5.5',
      };
    }

    // Complete therapy success case (end2 path)
    if (isEnd2Case) {
      return {
        ...baseMetrics,
        bloodPressure: '120/75',
        heartRate: 69,
        lvef: 42,
        ntProBNP: 624,
        egfr: 59,
        uacr: '292',
        echocardiography: 'Stable parameters',
      };
    }

    // Case2 patient with HFpEF and SGLT2i for 5 years
    if (forceCase2Values) {
      return {
        ...baseMetrics,
        bloodPressure: '134/82',
        heartRate: 81,
        lvef: 57,
        ntProBNP: 489,
        egfr: 43,
        uacr: '312',
        echocardiography:
          'Moderate left atrial dilatation, pulmonary hypertension',
      };
    } else if (pathname.includes('sglt2i-case2')) {
      // Check if we're in the advanced case
      if (isAdvancedCase) {
        // Advanced HFpEF with CKD data from the image
        return {
          ...baseMetrics,
          bloodPressure: '155/90',
          heartRate: 120,
          lvef: 55,
          ntProBNP: 1500,
          egfr: 29,
          uacr: '418',
          echocardiography:
            'Marked left atrial enlargement, pulmonary hypertension, significant left atrial dilatation',
        };
      }
      
      // Original Post-ECG monitoring metrics
      return {
        ...baseMetrics,
        bloodPressure: '138/86',
        heartRate: 73,
        ntProBNP: 425,
        egfr: 55,
        echocardiography:
          'Moderate left atrial enlargement, LV hypertrophy, mild pulmonary hypertension',
      };
    } else if (pathname.includes('sglt2i-arni-case')) {
      return {
        ...baseMetrics,
        bloodPressure: '132/82',
        heartRate: 76,
        lvef: 38,
        ntProBNP: 1320,
        egfr: 44,
        uacr: '378',
        echocardiography:
          'Mild left ventricular dilatation, discrete mitral regurgitation,  LVEF improved',
      };
    } else if (pathname.includes('continue-acei-case')) {
      return {
        ...baseMetrics,
        bloodPressure: '125/70',
        heartRate: 95,
        lvef: 28,
        ntProBNP: 2586,
        egfr: 20,
        uacr: '915',
        echocardiography:
          'Moderate left ventricular dilatation, moderate secondary mitral regurgitation; LVEF worsened, moderate pulmonary hypertension',
      };
    } else if (pathname.includes('beta-blocker-case')) {
      return {
        ...baseMetrics,
        bloodPressure: '134/82',
        heartRate: 81,
        lvef: 57,
        ntProBNP: 489,
        egfr: 43,
        uacr: '312',
        echocardiography:
          'Moderate left atrial dilatation, pulmonary hypertension',
      };
    } else if (pathname.includes('james-flow1-age60')) {
      return {
        ...baseMetrics,
        bloodPressure: '138/86',
        egfr: 63,
        uacr: '202',
        bmi: 25,
        hba1c: 5.5,
      };
    } else if (pathname.includes('james-flow1-age70')) {
      return {
        ...baseMetrics,
        bloodPressure: '132/80',
        egfr: 58,
        uacr: '210',
        bmi: 24.5,
        hba1c: 5.4,
      };
    } else if (pathname.includes('james-flow2-age60')) {
      return {
        ...baseMetrics,
        bloodPressure: '136/88',
        egfr: 45,
        uacr: '280',
        bmi: 25.3,
        hba1c: 5.5,
      };
    } else if (pathname.includes('james-flow2-age70')) {
      return {
        ...baseMetrics,
        bloodPressure: '136/88',
        egfr: 45,
        uacr: '280',
        bmi: 25.3,
        hba1c: 5.5,
      };
    } else if (pathname.includes('james-flow3-age60')) {
      return {
        ...baseMetrics,
        bloodPressure: '144/94',
        egfr: 35,
        uacr: '350',
        bmi: 25.5,
        hba1c: 5.7,
      };
    } else if (pathname.includes('james-flow3-age70')) {
      return {
        ...baseMetrics,
        bloodPressure: '144/94',
        egfr: 35,
        uacr: '350',
        bmi: 25.5,
        hba1c: 5.7,
      };
    } else if (pathname.includes('erik-flow1-age52')) {
      return {
        ...baseMetrics,
        bloodPressure: '128/78',
        egfr: 39,
        uacr: '362',
        bmi: '24.6',
        hba1c: '5.3',
      };
    } else if (pathname.includes('erik-flow2-age52')) {
      return {
        ...baseMetrics,
        bloodPressure: '134/82',
        egfr: 28,
        uacr: '482',
        bmi: 25.6,
        hba1c: 5.6,
      };
    } else if (pathname.includes('erik-flow3-age52')) {
      return {
        ...baseMetrics,
        bloodPressure: '142/88',
        egfr: 13,
        uacr: '622',
        bmi: '26.7',
        hba1c: '5.7',
      };
    } else if (pathname.includes('joana-add-sglt2i-case')) {
      // Custom data for Joana's add SGLT2i case
      return {
        ...baseMetrics,
        medicalConsiderations: 'HFpEF, CKD Stage 2 (G2A2)',
        bloodPressure: '126/78',
        heartRate: 72,
        lvef: 62,
        ntProBNP: 267,
        egfr: 66,
        uacr: '140',
        hba1c: '6.9',
        bmi: '26.2',
        echo: 'Mild left atrial enlargement, mild LVH',
        echocardiography:
          'Sinus rhythm, no acute ischemic changes, normal intervals',
      };
    } else if (pathname.includes('joana-optimize-case')) {
      // Custom data for Joana's optimize case
      return {
        ...baseMetrics,
        medicalConsiderations: 'HFpEF, CKD Stage 3a (G3aA2)',
        bloodPressure: '128/80',
        heartRate: 70,
        lvef: 58,
        ntProBNP: 279,
        egfr: 58,
        uacr: '170',
        hba1c: '7.0',
        bmi: '26.5',
        echo: 'Mild left atrial enlargement, no significant pulmonary hypertension',
        echocardiography:
          'Sinus rhythm, unchanged',
      };
    } else if (pathname.includes('joana-five-years')) {
      // Custom data for Joana's five years case
      return {
        ...baseMetrics,
        medicalConsiderations: 'HFpEF (NYHA Class III), CKD Stage 3b (G3bA3)',
        bloodPressure: '138/86',
        heartRate: 78,
        lvef: 56,
        ntProBNP: 568,
        egfr: 44,
        uacr: '302',
        hba1c: '8.0',
        bmi: '27.7',
        echo: 'Severe left atrial dilatation, moderate pulmonary hypertension',
        echocardiography:
          'Sinus rhythm, no acute changes',
      };
    } else if (pathname.includes('sglt2i-case')) {
      // Default SGLT2i case
      return {
        ...baseMetrics,
        medicalConsiderations: 'HFpEF (NYHA Class II) - diagnosed 10 years ago, CKD Stage 3a (G3aA2)',
        bloodPressure: '128/80',
        lvef: 59,
        heartRate: 74,
        ntProBNP: 236,
        egfr: 56,
        uacr: '286',
        echocardiography:
          'Stable pulmonary hypertension',
      };
    }

    return baseMetrics;
  };

  const caseMetrics = getCaseSpecificMetrics();

  // Get case-specific medical considerations
  const getMedicalConsiderations = () => {
    const erikHasSglt2i = patient.name === 'Erik' && patient.treatments.some(t => t.name.includes('SGLT2i'));

    if (erikHasSglt2i) {
      return 'CKD Stage 3b (G3bA3)';
    } else if (isEnd2Case) {
      return 'HFrEF (NYHA Class II), CKD Stage 3a (G3aA2)';
    } else if (forceCase2Values) {
      return 'HFpEF (NYHA Class III), CKD Stage 3b (G3bA3)';
    } else if (isAdvancedCase) {
      return 'HFpEF (NYHA Class IV), CKD Stage 4 (G4A3), AF';
    } else if (pathname.includes('james-flow1-age60')) {
      return 'Diagnosed with CKD 5 years ago';
    } else if (pathname.includes('james-flow1-age70')) {
      return 'CKD Stage 3a (G3aA2)';
    } else if (pathname.includes('james-flow2-age60')) {
      return 'CKD Stage 3 (G3aA2)';
    } else if (pathname.includes('james-flow2-age70')) {
      return 'CKD Stage 3 (G3aA2)';
    } else if (pathname.includes('james-flow3-age60')) {
      return 'CKD Stage 3b (G3bA3)';
    } else if (pathname.includes('james-flow3-age70')) {
      return 'CKD Stage 3b (G3bA3)';
    } else if (pathname.includes('erik-flow1-age52')) {
      return 'CKD Stage 3b (G3bA3)';
    } else if (pathname.includes('erik-flow2-age52')) {
      return 'CKD Stage 4 (G4A3), HFpEF (NYHA Class II)';
    } else if (pathname.includes('erik-flow3-age52')) {
      return 'CKD Stage 5 (G5A3), HFpEF (NYHA Class III)';
    } else if (pathname.includes('joana-add-sglt2i-case')) {
      return 'HFpEF, CKD Stage 2 (G2A2)';
    } else if (pathname.includes('joana-optimize-case')) {
      return 'HFpEF, CKD Stage 3a (G3aA2)';
    } else if (pathname.includes('joana-five-years')) {
      return 'HFpEF, CKD Stage 3b (G3bA3)';
    } else if (pathname.includes('sglt2i-case2')) {
      return 'HFpEF (NYHA Class II), ECG monitoring complete, ready for treatment optimization';
    } else if (pathname.includes('sglt2i-case')) {
      return 'HFpEF (NYHA Class II) - diagnosed 10 years ago, CKD Stage 3a (G3aA2)';
    } else if (pathname.includes('sglt2i-arni-case')) {
      return 'HFrEF (NYHA Class III), CKD Stage 3b (G3bA3)';
    } else if (pathname.includes('continue-acei-case')) {
      return 'HFrEF (NYHA Class IV), diagnosed 10 years ago, CKD Stage 4 (G4A3), history of MI';
    } else if (pathname.includes('beta-blocker-case')) {
      return 'HFpEF (NYHA Class III), CKD Stage 3b (G3bA3)';
    }
    
    return (
      patient.medicalConsiderations || (
        <>
          {patient.treatments.some((t) => t.name.includes('SGLT2i')) ? (
            <>
              Diagnosed with {patient.condition} ({nyhaClass}) 5 years ago
            </>
          ) : (
            <>
              Recently diagnosed with {patient.condition} ({nyhaClass})
            </>
          )}
          {patient.futureStates?.prescribe_sglt2i?.hasProgressed &&
            patient.nyhaClass !== nyhaClass && (
              <>, now progressed to {nyhaClass}</>
            )}
        </>
      )
    );
  };

  // Get case-specific current treatment
  const getCurrentTreatment = () => {
    const erikHasSglt2i = patient.name === 'Erik' && patient.treatments.some(t => t.name.includes('SGLT2i'));

    if (erikHasSglt2i) {
      return `ACEi (max tolerated dose)
Statin (moderate-intensity), Diuretic, SGLT2i
Lifestyle changes (physical activity, dietary changes, and weight loss)`;
    } else if (isEnd2Case) {
      return `Statin
Beta-blocker
SGLT2i
ARNi
MRA
Loop diuretic (as needed)`;
    } else if (forceCase2Values) {
      return `ACEi
Statin (high-intensity)
Loop diuretic
SGLT2i (since 5 years)
Lifestyle modifications`;
    } else if (isAdvancedCase) {
      return `ACEi
Statin
Loop diuretic (dose increased)
Beta-Blocker
Lifestyle modifications
CKD dietary modifications`;
    } else if (pathname.includes('james-flow1-age60')) {
      return `ACEi
Statin (low intensity), SGLT2i
Lifestyle changes (physical activity, dietary changes, and weight loss)`;
    } else if (pathname.includes('james-flow1-age70')) {
      return `ACEi (max. tolerated dose)
Statin (low intensity), SGLT2i
Lifestyle changes (physical activity, dietary changes, and weight loss)`;
    } else if (pathname.includes('james-flow2-age60')) {
      return `ACEi (max. tolerated dose)
Statin (moderate-intensity), Diuretic, SGLT2i
Lifestyle changes (physical activity, dietary changes, and weight loss)`;
    } else if (pathname.includes('james-flow2-age70')) {
      return `ACEi (max. tolerated dose)
Statin (moderate-intensity), Diuretic, SGLT2i
Lifestyle changes (physical activity, dietary changes, and weight loss)`;
    } else if (pathname.includes('james-flow3-age60')) {
      return `ACEi (max. tolerated dose)
Statin (moderate-intensity), Diuretic, Beta-blocker
Lifestyle changes (physical activity, dietary changes, and weight loss)`;
    } else if (pathname.includes('james-flow3-age70')) {
      return `ACEi (max. tolerated dose)
Statin (moderate-intensity), Diuretic, Beta-blocker
Lifestyle changes (physical activity, dietary changes, and weight loss)`;
    } else if (pathname.includes('erik-flow1-age52')) {
      return `ACEi (max tolerated dose)
Statin (moderate-intensity), Diuretic, SGLT2i
Lifestyle changes (physical activity, dietary changes, and weight loss)`;
} else if (pathname.includes('erik-flow2-age52')) {
      return `ACEi (max. tolerated dose)
Statin (moderate-intensity), Diuretic, CCB, SGLT2i
Lifestyle changes`;
    
    } else if (pathname.includes('joana-add-sglt2i-case')) {
      return `ACEi
Statin
SGLT2i
Lifestyle modifications`;
    } else if (pathname.includes('joana-optimize-case')) {
      return `ACEi
Statin
SGLT2i
Loop diuretic
Lifestyle modifications`;
    } else if (pathname.includes('joana-five-years')) {
      return `ACEi
Statin
Loop diuretic
Lifestyle modifications`;
    } else if (pathname.includes('sglt2i-case2')) {
      return `ACEi
Statin
Loop diuretic
Ready to initiate SGLT2i
Lifestyle modifications`;
    } else if (pathname.includes('sglt2i-case')) {
      return `ACEi
Statin, 
Loop diuretic, 
SGLT2i
Lifestyle modifications`;
    } else if (pathname.includes('sglt2i-arni-case')) {
      return `Statin
Beta-blocker
SGLT2i
ARNi
MRA
Loop diuretic as needed`;
    } else if (pathname.includes('continue-acei-case')) {
      return `ACEi 
Beta-blocker 
Statin
Loop diuretic as needed`;
    } else if (pathname.includes('beta-blocker-case')) {
      return `ACEi
Statin (high-intensity)
Loop diuretic
SGLT2i (since 5 years)
Lifestyle modifications`;
    } else if (pathname.includes('erik-flow3-age52')) {
      return `ACEi (max. tolerated dose)
Statin (high-intensity), Diuretic, Calcium-channel blocker, hemodialysis
Dietary guidance for dialysis patients`;
    }

    return patient.currentTreatment;
  };

  // Get case-specific history and comorbidities
  const getHistoryAndComorbidities = () => {
    const erikHasSglt2i = patient.name === 'Erik' && patient.treatments.some(t => t.name.includes('SGLT2i'));

    if (erikHasSglt2i) {
      return `Hypertension, hypercholesterolemia, overweight`;
    } else if (isEnd2Case) {
      return `Hypertension, dyslipidemia, history of smoking`;
    } else if (forceCase2Values) {
      return `Hypertension, dyslipidemia, overweight`;
    } else if (isAdvancedCase) {
      return `Hypertension (worsening), dyslipidemia, overweight Recurrent hospitalizations due to severe dyspnea`;
    } else if (pathname.includes('james-flow1-age60') || pathname.includes('james-flow1-age70')) {
      return `Uncontrolled hypertension, hypercholesterolemia, overweight`;
    } else if (pathname.includes('james-flow2-age60') || pathname.includes('james-flow2-age70')) {
      return `Uncontrolled hypertension, hypercholesterolemia, overweight`;
    } else if (pathname.includes('james-flow3-age60') || pathname.includes('james-flow3-age70')) {
      return `Uncontrolled hypertension, hypercholesterolemia, overweight`;
    } else if (pathname.includes('erik-flow1-age52')) {
      return `Hypertension, hypercholesterolemia, overweight`;
    } else if (pathname.includes('erik-flow3-age52')) {
      return `Uncontrolled hypertension, hypercholesterolemia, overweight`;
    } else if (pathname.includes('joana-add-sglt2i-case')) {
      return `Hypertension, hypercholesterolemia, overweight, CAD, T2D`;
    } else if (pathname.includes('joana-optimize-case')) {
      return `Hypertension, hypercholesterolemia, overweight, CAD, T2D`;
    } else if (pathname.includes('joana-five-years')) {
      return `Hypertension, hypercholesterolemia, overweight, CAD, T2D`;
    } else if (pathname.includes('sglt2i-arni-case')) {
      return `Hypertension, dyslipidemia, history of smoking`;
    } else if (pathname.includes('beta-blocker-case')) {
      return `Hypertension, dyslipidemia, overweight
`;
    }
    
    return patient.historyAndComorbidities || patient.comorbidities.join(', ');
  };

  return (
    <div className="w-full 2xl:w-[500px] bg-white/70 backdrop-blur-lg rounded-4xl z-30 relative">
      <button
        onClick={handleToggle}
        className="w-full bg-white/80 border border-white text-[#585858] backdrop-blur-lg text-[20px] lg:text-[32px] font-bold px-6 lg:px-10 py-4 rounded-xl 2xl:rounded-4xl flex items-center justify-between hover:bg-white/90 transition-colors"
      >
        <span>Medical Record</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#585858] lg:w-8 lg:h-8"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 px-8 py-6 gap-10">
      <div className="">
        <div>
          <h3 className="text-md text-gray-700 font-bold mb-1">
            Medical Considerations
          </h3>
          <div className="flex items-start gap-3">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`considerations-${nyhaClass}-${pathname}`}
                initial="hidden"
                animate="visible"
                variants={variants}
                className="text-gray-700 whitespace-pre-line"
              >
                {getMedicalConsiderations()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
 <div>
          <h3 className="text-md text-gray-700 font-bold mb-1 mt-4">
            Current Treatment
          </h3>
          <div className="flex items-start gap-3">
            
            <AnimatePresence mode="wait">
              {getCurrentTreatment() ? (
                <motion.div
                  key={`currentTreatment-${pathname}`}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  className={patient.name === 'Joana' ? "text-gray-700" : "text-gray-700 whitespace-pre-line"}
                >
                  {patient.name === 'Joana' 
                    ? getCurrentTreatment().replace(/\n/g, ', ')
                    : getCurrentTreatment()}
                </motion.div>
              ) : (
                <motion.div
                  key={`treatments-${patient.treatments
                    .map((t) => t.id)
                    .join('-')}`}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  className="space-y-0.5"
                >
                  {patient.treatments.map((treatment, index) => (
                    <motion.p
                      key={treatment.id + index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-gray-700"
                    >
                      {treatment.name}
                    </motion.p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <h3 className="text-md text-gray-700 font-bold mb-1 mt-4">
            History & Comorbidities
          </h3>
          <div className="flex items-start gap-3">
           
            <AnimatePresence mode="wait">
              <motion.div
                key={`historyComorbidities-${pathname}`}
                initial="hidden"
                animate="visible"
                variants={variants}
                className="text-gray-700 whitespace-pre-line"
              >
                {getHistoryAndComorbidities()}
              </motion.div>
            </AnimatePresence>
          </div>
            <div>
          <h3 className="text-gray-700 font-bold mt-4">Blood Pressure (mmHg)</h3>
          <AnimatePresence mode="wait">
            <motion.p
              key={`bp-${caseMetrics.bloodPressure}`}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="text-2xl font-normal text-[#585858]"
            >
              {caseMetrics.bloodPressure}
            </motion.p>
          </AnimatePresence>
        </div>
         {caseMetrics.bmi && (
          <div>
            <h3 className="text-gray-700 font-bold mt-4">BMI (kg/m²)</h3>
            <AnimatePresence mode="wait">
              <motion.p
                key={`bmi-${caseMetrics.bmi}`}
                initial="hidden"
                animate="visible"
                variants={variants}
                className="text-2xl font-normal text-[#585858]"
              >
                {caseMetrics.bmi}
              </motion.p>
            </AnimatePresence>
          </div>
        )}

        {caseMetrics.hba1c && (
          <div>
            <h3 className="text-gray-700 font-bold mt-4">HbA1c (%)</h3>
            <AnimatePresence mode="wait">
              <motion.p
                key={`hba1c-${caseMetrics.hba1c}`}
                initial="hidden"
                animate="visible"
                variants={variants}
                className="text-2xl font-normal text-[#585858]"
              >
                {typeof caseMetrics.hba1c === 'string' ? caseMetrics.hba1c : Number(caseMetrics.hba1c).toFixed(1)}
              </motion.p>
            </AnimatePresence>
          </div>
        )}

       

        </div>
       
      </div>

      {/* Right Column - Medical Metrics */}
      <div className="space-y-5">
      

        {caseMetrics.heartRate && caseMetrics.heartRate !== 'not ordered' && caseMetrics.heartRate !== 'not tested' && patient.name !== 'Joana' && patient.name !== 'James' && patient.name !== 'Erik' && (
          <div>
            <h3 className="text-gray-700 font-bold">Heart rate (bpm)</h3>
            <AnimatePresence mode="wait">
              <motion.p
                key={`hr-${caseMetrics.heartRate}`}
                initial="hidden"
                animate="visible"
                variants={variants}
                className="text-2xl font-normal text-[#585858]"
              >
                {caseMetrics.heartRate}
              </motion.p>
            </AnimatePresence>
          </div>
        )}

        {caseMetrics.lvef && patient.name !== 'Erik' && (
          <div>
            <h3 className="text-gray-700 font-bold">LVEF (%)</h3>
            <AnimatePresence mode="wait">
              <motion.p
                key={`lvef-${caseMetrics.lvef}`}
                initial="hidden"
                animate="visible"
                variants={variants}
                className="text-2xl font-normal text-[#585858]"
              >
                {caseMetrics.lvef}
              </motion.p>
            </AnimatePresence>
          </div>
        )}

        {caseMetrics.ntProBNP && caseMetrics.ntProBNP !== 'not ordered' && caseMetrics.ntProBNP !== 'not tested' && caseMetrics.ntProBNP > 0 && patient.name !== 'Erik' && (
          <div>
            <h3 className="text-gray-700 font-bold">NT-proBNP (pg/mL)</h3>
            <AnimatePresence mode="wait">
              <motion.p
                key={`bnp-${caseMetrics.ntProBNP}`}
                initial="hidden"
                animate="visible"
                variants={variants}
                className="text-2xl font-normal text-[#585858]"
              >
                {caseMetrics.ntProBNP}
              </motion.p>
            </AnimatePresence>
          </div>
        )}

        <div>
          <h3 className="text-gray-700 font-bold">eGFR (mL/min/1.73m²)</h3>
          <AnimatePresence mode="wait">
            <motion.p
              key={`egfr-${caseMetrics.egfr}`}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="text-2xl font-normal text-[#585858]"
            >
              {caseMetrics.egfr}
            </motion.p>
          </AnimatePresence>
        </div>

        <div>
          <h3 className="text-gray-700 font-bold">uACR (mg/g)</h3>
          <AnimatePresence mode="wait">
            <motion.p
              key={`uacr-${caseMetrics.uacr}`}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="text-2xl font-normal text-[#585858]"
            >
              {caseMetrics.uacr}
            </motion.p>
          </AnimatePresence>
        </div>



        {caseMetrics.echocardiography && caseMetrics.echocardiography !== 'not ordered' && (
          <div>
            <h3 className="text-gray-700 font-bold">{patient.name === 'Joana' ? 'ECG' : 'Echocardiography'}</h3>
            <AnimatePresence mode="wait">
              <motion.p
                key={`echo-${caseMetrics.echocardiography.substring(0, 15)}`}
                initial="hidden"
                animate="visible"
                variants={variants}
                className="text-base font-normal text-[#585858]"
              >
                {caseMetrics.echocardiography}
              </motion.p>
            </AnimatePresence>
          </div>
        )}

        {caseMetrics.echo && (
          <div>
            <h3 className="text-gray-700 font-bold mt-4">Echo</h3>
            <AnimatePresence mode="wait">
              <motion.p
                key={`echo-${caseMetrics.echo}`}
                initial="hidden"
                animate="visible"
                variants={variants}
                className="text-base font-normal text-[#585858]"
              >
                {caseMetrics.echo}
              </motion.p>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}