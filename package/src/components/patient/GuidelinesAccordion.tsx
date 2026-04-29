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
  const guidelineSlide1 = (
    <div className="space-y-4 text-center">
      <p className="text-gray-900 font-bold text-xl">
        Heart failure is a progressive condition that needs urgent, optimal intervention<sup>1-4</sup>
      </p>
      <p className="text-gray-700">In patients living with HFrEF (LVEF ≤40%):</p>
      <Image
        src="/guidelines.png"
        alt="Guidelines placeholder"
        title="Guidelines placeholder"
        width={420}
        height={300}
        className="rounded-lg w-full h-auto"
      />
    </div>
  );

  const guidelineSlide3 = (
    <div className="space-y-4 text-center">
      <p className="text-gray-700">However, in practice:</p>
      <Image
        src="/guidelines.png"
        alt="Guidelines placeholder"
        title="Guidelines placeholder"
        width={420}
        height={300}
        className="rounded-lg w-full h-auto"
      />
      <p className="text-gray-800">
        Patients with HFrEF require urgent and appropriate intervention with foundational treatments like SGLT2is,
        such as JARDIANCE<sup>®</sup> (empagliflozin).<sup>5,8</sup>
      </p>
      <p className="text-gray-900 font-bold text-2xl">Don&apos;t miss the moment.</p>
    </div>
  );

  const guidelineSlide4 = (
    <div className="space-y-4 text-center">
      <p className="text-gray-900 font-bold text-2xl">KDIGO Digital Heatmap</p>
      <p className="text-gray-700">
        Do you want to visualize your patients&apos; risk for adverse CV and kidney outcomes by entering their uACR and eGFR values?
      </p>
      <p className="text-gray-900 font-bold text-2xl">Scan and Learn More</p>
      <Image
        src="/guidelines.png"
        alt="KDIGO heatmap placeholder"
        title="KDIGO heatmap placeholder"
        width={420}
        height={300}
        className="rounded-lg w-full h-auto"
      />
      <p className="text-gray-700 text-sm">
        This interactive risk calculator - developed in collaboration with Boehringer Ingelheim and KDIGO - is intended for informational purposes only and does not constitute medical advice or recommendations. It is not a substitute for professional medical advice, diagnosis, or treatment and is not a treatment decision tool. Practitioners should use their own clinical judgment when diagnosing and treating patients.
      </p>
    </div>
  );

  // Patient-specific content
  const getGuidelinesContent = () => {
    const name = patientName?.toLowerCase();
    
    // Linda (HFpEF)
    if (name === 'linda' || patientId === '1') {
      const lindaSlides = [
        {
          id: "linda-slide-1",
          content: guidelineSlide1,
        },
        {
          id: "linda-slide-2",
          content: (
            <div className="space-y-4">
              <p className="text-gray-700 font-bold">
                2023 Focused Update of the 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure<sup>4</sup>
              </p>
              <p className="text-gray-700">
                The guidelines recommend SGLT2is as Class I, Level A therapy for patients with HFmrEF (LVEF 41-49%) and HFpEF (LVEF ≥50%) to reduce the risk of HHF or CV death, which makes SGLT2is the only class with Class I, Level A recommendation.<sup>4</sup>
              </p>
              <div className="space-y-3">
                <Image src="/icons/sglti.png" alt="Guidelines Image HFpEF" title="Guidelines Image HFpEF" width={420} height={300} className="rounded-lg w-full h-auto" />
              </div>
            </div>
          ),
        },
        { id: "linda-slide-3", content: guidelineSlide3 },
        { id: "linda-slide-4", content: guidelineSlide4 },
      ];

      return <ClinicalReasoningSlides patientId={patientId || '1'} slides={lindaSlides} slideKey="linda-guidelines" />;
    }
    
    // Robert (HFrEF)
    if (name === 'robert' || patientId === '2') {
      const robertSlides = [
        {
          id: "robert-slide-1",
          content: guidelineSlide1,
        },
        { id: "robert-slide-2", content: <div className="space-y-4">
          <p className="text-gray-700 font-bold">2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure…</p>
          <p className="text-gray-700">
            … provide recommendations for the management of HFrEF (LVEF≤40%). The following four disease-modifying drugs should be administered to all patients with HFrEF and up-titrated to optimal doses without significant delay.<sup>5,6</sup>
          </p>
          <div className="space-y-3">
            <Image src="/guidelines.png" alt="Guidelines Image HFrEF" title="Guidelines Image HFrEF" width={420} height={300} className="rounded-lg w-full h-auto" />
          </div>
        </div> },
        { id: "robert-slide-3", content: guidelineSlide3 },
        { id: "robert-slide-4", content: guidelineSlide4 },
      ];

      return <ClinicalReasoningSlides patientId={patientId || '2'} slides={robertSlides} slideKey="robert-guidelines" />;
    }
    
    // Joana (T2D+CAD)
    if (name === 'joana' || patientId === '3') {
      const joanaSlides = [
        {
          id: "joana-slide-1",
          content: guidelineSlide1,
        },
        {
          id: "joana-slide-2",
          content: (
            <div className="space-y-4">
              <p className="text-gray-700 font-bold">2023 ESC Guidelines for the management of cardiovascular disease in patients with diabetes<sup>1</sup></p>
              <p className="text-gray-700">
                The guidelines recommend SGLT2is as Class I, Level A therapy for patients with ASCVD and T2D to reduce cardiovascular risk, for patients with T2D and HF (HFpEF, HFmrEF, HFrEF) to reduce the risk of HHF and CV death, and for patients with T2D and CKD to reduce the CV and kidney failure risk - independent of glucose control and in addition to standard of care.<sup>1</sup>
              </p>
              <div className="space-y-3">
                <Image src="/icons/sglti.png" alt="Guidelines Image T2D" title="Guidelines Image T2D" width={420} height={300} className="rounded-lg w-full h-auto" />
              </div>
            </div>
          ),
        },
        { id: "joana-slide-3", content: guidelineSlide3 },
        { id: "joana-slide-4", content: guidelineSlide4 },
      ];

      return <ClinicalReasoningSlides patientId={patientId || '3'} slides={joanaSlides} slideKey="joana-guidelines" />;
    }

    // James (CKD)
    if (name === 'james' || patientId === '4') {
      const jamesSlides = [
        {
          id: "james-slide-1",
          content: guidelineSlide1,
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
        {
          id: "james-slide-3",
          content: guidelineSlide3,
        },
        {
          id: "james-slide-4",
          content: guidelineSlide4,
        },
      ];

      return <ClinicalReasoningSlides patientId={patientId || '4'} slides={jamesSlides} slideKey="james-guidelines" />;
    }

    // Erik (HFrEF)
    if (name === 'erik' || patientId === '5') {
      const erikSlides = [
        {
          id: "erik-slide-1",
          content: guidelineSlide1,
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
        {
          id: "erik-slide-3",
          content: guidelineSlide3,
        },
        {
          id: "erik-slide-4",
          content: guidelineSlide4,
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
        title="Early & Foundational Treatment"
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