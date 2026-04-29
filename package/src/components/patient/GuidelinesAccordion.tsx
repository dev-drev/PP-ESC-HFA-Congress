'use client';

import PatientAccordion from './PatientAccordion';
import ClinicalReasoningSlides from './ClinicalReasoningSlides';
import Image from 'next/image';

interface GuidelinesAccordionProps {
  patientId?: string;
  patientName?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function GuidelinesAccordion({
  patientId,
  patientName,
  isOpen,
  onToggle,
}: GuidelinesAccordionProps) {
  // Patient-specific content
  const getGuidelinesContent = () => {
    const name = patientName?.toLowerCase();
    
    // Linda (HFpEF)
    if (name === 'linda' || patientId === '1') {
      return (
        <div className="space-y-4">
          <p className="text-gray-700 font-bold">2023 Focused Update of the 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure<sup>1</sup>

</p>
          <p className="text-gray-700">
         The guidelines recommend SGLT2is as Class I, Level A therapy for patients with HFmrEF (LVEF  41-49%) and HFpEF (LVEF ≥50%) to reduce the risk of HHF or CV death, which makes <span className="font-bold">SGLT2is the only class with Class I, Level A recommendation.</span><sup>1</sup>
          </p>
          <div className="space-y-3">
            <Image src="/icons/sglti.png" alt="Guidelines Image HFpEF" title="Guidelines Image HFpEF" width={420} height={300} className="rounded-lg w-full h-auto" />
          </div>
        </div>
      );
    }
    
    // Robert (HFrEF)
    if (name === 'robert' || patientId === '2') {
      return (
        <div className="space-y-4">
          <p className="text-gray-700 font-bold">2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure…
</p>
          <p className="text-gray-700">
          … provide recommendations for the management of HFrEF (LVEF≤40%). The following four disease-modifying drugs should be administered to all patients with HFrEF and up-titrated to optimal doses without significant delay.<sup>1,2</sup>
          </p>
          <div className="space-y-3">
            <Image src="/guidelines.png" alt="Guidelines Image HFrEF" title="Guidelines Image HFrEF" width={420} height={300} className="rounded-lg w-full h-auto" />
          </div>
        </div>
      );
    }
    
    // Joana (T2D+CAD)
    if (name === 'joana' || patientId === '3') {
      return (
        <div className="space-y-4">
          <p className="text-gray-700 font-bold">2023 ESC Guidelines for the management of cardiovascular disease in  patients with diabetes<sup>1</sup>
</p>
          <p className="text-gray-700">
         The guidelines recommend SGLT2is as Class I, Level A therapy for patients with ASCVD and T2D to reduce cardiovascular risk, for patients with T2D and HF (HFpEF, HFmrEF, HFrEF) to reduce the risk of HHF and CV death, and for patients with T2D and CKD to reduce the CV and kidney failure risk - independent of glucose control and in addition to standard of care.<sup>1</sup>
          </p>
          <div className="space-y-3">
            <Image src="/icons/sglti.png" alt="Guidelines Image T2D" title="Guidelines Image T2D" width={420} height={300} className="rounded-lg w-full h-auto" />
          </div>
        </div>
      );
    }

    // James (CKD)
    if (name === 'james' || patientId === '4') {
      const jamesSlides = [
        {
          id: "james-slide-1",
          content: (
            <div className="space-y-4">
              <p className="text-gray-700 font-bold">
                KDIGO 2024 Clinical Practice Guideline for the Evaluation and
                Management of Chronic Kidney Disease:
              </p>
              <p className="text-gray-700">
                The guideline, within a comprehensive treatment strategy,
                recommends SGLT2is as a first-line therapy for the management of
                CKD in a range of patient types to delay the CKD progression and
                to reduce cardiovascular mortality:<sup>2</sup>
              </p>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="font-bold">CKD</p>
                  <p className="ml-4">Adults with CKD with:</p>
                  <ul className="ml-8 list-disc">
                    <li>
                      An eGFR ≥20 mL/min/1.73 m<sup>2</sup> with uACR ≥200 mg/g
                      (Level 1A)
                    </li>
                    <li>
                      An eGFR 20 to 45 mL/min/1.73 m<sup>2</sup> with uACR
                      &lt;200 mg/g (Level 2B)
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">CKD + HF</p>
                  <p className="ml-4">Adults with CKD with:</p>
                  <ul className="ml-8 list-disc">
                    <li>
                      An eGFR ≥20 mL/min/1.73 m<sup>2</sup> with HF irrespective
                      of level of albuminuria (Level 1A)
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">T2D + CKD</p>
                  <p className="ml-4">
                    Patients with T2D + CKD, and an eGFR ≥20 mL/min/1.73 m
                    <sup>2</sup> (Level 1A)
                  </p>
                </div>
              </div>
            </div>
          ),
        },
        {
          id: "james-slide-2",
          content: (
            <div className="space-y-4">
              <p className="text-gray-700 font-bold">
                Useful tips for the diagnosis and management of CKD
              </p>
              <p className="text-gray-700">
                The KDIGO Heatmap is a risk stratification tool that integrates
                eGFR and uACR to categorize patients into prognostic risk levels
                using a color-coded grid.<sup>2</sup>
              </p>
              <Image
                src="/guidelines-tips.png"
                alt="Guidelines"
                title="Guidelines tips"
                width={420}
                height={300}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-gray-700">
                These risk categories indicate the likelihood of CKD
                progression, CV events, and mortality, helping clinicians make
                informed decisions on monitoring frequency, specialist
                referrals, and treatment adjustments.<sup>2</sup>
              </p>
            </div>
          ),
        },
      ];

      return <ClinicalReasoningSlides patientId={patientId || '4'} slides={jamesSlides} slideKey="james-guidelines" />;
    }

    // Erik (HFrEF)
    if (name === 'erik' || patientId === '5') {
      const erikSlides = [
        {
          id: "erik-slide-1",
          content: (
            <div className="space-y-4">
              <p className="text-gray-700 font-bold">
                KDIGO 2024 Clinical Practice Guideline for the Evaluation and
                Management of Chronic Kidney Disease:
              </p>
              <p className="text-gray-700">
                The guideline, within a comprehensive treatment strategy,
                recommends SGLT2is as a first-line therapy for the management of
                CKD in a range of patient types to delay the CKD progression and
                to reduce cardiovascular mortality:<sup>2</sup>
              </p>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="font-bold">CKD</p>
                  <p className="ml-4">Adults with CKD with:</p>
                  <ul className="ml-8 list-disc">
                    <li>
                      An eGFR ≥20 mL/min/1.73 m<sup>2</sup> with uACR ≥200 mg/g
                      (Level 1A)
                    </li>
                    <li>
                      An eGFR 20 to 45 mL/min/1.73 m<sup>2</sup> with uACR
                      &lt;200 mg/g (Level 2B)
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">CKD + HF</p>
                  <p className="ml-4">Adults with CKD with:</p>
                  <ul className="ml-8 list-disc">
                    <li>
                      An eGFR ≥20 mL/min/1.73 m<sup>2</sup> with HF irrespective
                      of level of albuminuria (Level 1A)
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">T2D + CKD</p>
                  <p className="ml-4">
                    Patients with T2D + CKD, and an eGFR ≥20 mL/min/1.73 m
                    <sup>2</sup> (Level 1A)
                  </p>
                </div>
              </div>
            </div>
          ),
        },
        {
          id: "erik-slide-2",
          content: (
            <div className="space-y-4">
              <p className="text-gray-700 font-bold">
                Useful tips for the diagnosis and management of CKD
              </p>
              <p className="text-gray-700">
                The KDIGO Heatmap is a risk stratification tool that integrates
                eGFR and uACR to categorize patients into prognostic risk levels
                using a color-coded grid.<sup>2</sup>
              </p>
              <Image
                src="/guidelines-tips.png"
                alt="Guidelines"
                title="Guidelines tips"
                width={420}
                height={300}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-gray-700">
                These risk categories indicate the likelihood of CKD
                progression, CV events, and mortality, helping clinicians make
                informed decisions on monitoring frequency, specialist
                referrals, and treatment adjustments.<sup>2</sup>
              </p>
            </div>
          ),
        },
      ];

      return <ClinicalReasoningSlides patientId={patientId || '5'} slides={erikSlides} slideKey="erik-guidelines" />;
    }

    // Default fallback
    return (
      <div className="space-y-4">
        <p className="text-gray-700 font-bold">2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure…
</p>
        <p className="text-gray-700">
        … provide comprehensive recommendations for the management of heart failure across the spectrum of ejection fraction.<sup>1,2</sup>
        </p>
        <div className="space-y-3">
          <Image src="/guidelines.png" alt="Guidelines Image" title="Guidelines Image" width={420} height={300} className="rounded-lg w-full h-auto" />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full 2xl:w-[500px] bg-white/70 backdrop-blur-lg rounded-4xl">
      <PatientAccordion
        title="Guidelines"
        isOpen={isOpen}
        onToggle={onToggle}
        titleColor="bg-white/80 border border-white"
        contentColor="bg-transparent"
      >
        {getGuidelinesContent()}
      </PatientAccordion>
    </div>
  );
}