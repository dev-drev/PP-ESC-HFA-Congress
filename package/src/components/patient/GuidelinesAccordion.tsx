'use client';

import PatientAccordion from './PatientAccordion';
import ClinicalReasoningSlides from './ClinicalReasoningSlides';
import Image from 'next/image';
import type { ReactNode } from 'react';

interface GuidelinesAccordionProps {
  patientId?: string;
  patientName?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  hideSlide4?: boolean;
  hideSlide3?: boolean;
}

export default function GuidelinesAccordion({
  patientId,
  patientName,
  isOpen,
  onToggle,
  hideSlide4 = false,
  hideSlide3 = false,
}: GuidelinesAccordionProps) {
  const guidelineSlide1 = (
    <div className="space-y-8 pb-4 ">
      <p className="text-gray-900 font-bold text-md">
        Heart failure is a progressive condition that needs urgent, optimal intervention<sup>1-4</sup>
      </p>
      <p className="text-gray-700">In patients living with HFrEF (LVEF ≤40%):</p>
      <Image
        src="/PP-new/5year37.png"
        alt="Guidelines placeholder"
        title="Guidelines placeholder"
        width={420}
        height={300}
        className="rounded-lg w-full h-auto"
      />
    </div>
  );

  const guidelineSlide3 = (
    <div className="space-y-8 pb-4">
      <p className="text-gray-700">However, in practice<sup>7</sup>:</p>
      <Image
        src="/PP-new/1in20.png"
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
      <p className="text-gray-900 font-bold text-xl ">Don&apos;t miss the moment.</p>
    </div>
  );

  

  // Patient-specific content
  const getGuidelinesContent = () => {
    const name = patientName?.toLowerCase();
    const withOptionalSlides = (slides: { id: string; content: ReactNode }[]) =>
      slides.filter((slide) => {
        if (hideSlide4 && slide.id.endsWith('-slide-4')) return false;
        if (hideSlide3 && slide.id.endsWith('-slide-3')) return false;
        return true;
      });
    
    // Linda (HFpEF)
    if (name === 'linda' || patientId === '1') {
      const lindaSlides = [
        {
          id: "linda-slide-1",
          content: (
            <div className="space-y-8 pb-4 ">
              <p className="text-gray-900 font-bold text-md">
                Heart failure is a progressive condition that needs urgent, optimal intervention<sup>1-3</sup>
              </p>
              <p className="text-gray-700">In patients living with HFpEF:</p>
              <Image
                src="/PP-new/5year45.png"
                alt="HFpEF 5-year outcomes"
                title="HFpEF 5-year outcomes"
                width={420}
                height={300}
                className="rounded-lg w-full h-auto"
              />
            </div>
          ),
        },
        {
          id: "linda-slide-2",
          content: (
            <div className="space-y-4">
              <p className="text-gray-700 font-bold">
                2023 Focused Update of the 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure<sup>4</sup>
              </p>
              <p className="text-gray-700">
                The guidelines recommend SGLT2is as Class I, Level A therapy for patients with HFmrEF (LVEF 41-49%) and HFpEF (LVEF ≥50%) to reduce the risk of HHF or CV death, which makes <b>SGLT2is the only class with Class I, Level A recommendation.</b> <sup>4</sup>
              </p>
              <div className="space-y-3">
                <Image src="/icons/sglti.png" alt="Guidelines Image HFpEF" title="Guidelines Image HFpEF" width={420} height={300} className="rounded-lg w-full h-auto" />
              </div>
            </div>
          ),
        },
        {
          id: "linda-slide-3",
          content: (
            <div className="space-y-8 pb-4">
              <p className="text-gray-700">However, in practice<sup>5</sup>:</p>
              <Image
                src="/PP-new/1in14.png"
                alt="HFpEF treatment gap"
                title="HFpEF treatment gap"
                width={420}
                height={300}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-gray-800">
                Patients with HFpEF require urgent and appropriate intervention with foundational treatments like SGLT2is.<sup>4</sup>
              </p>
              <p className="text-gray-900 font-bold text-xl ">Don&apos;t miss the moment.</p>
            </div>
          ),
        },
      ];

      return <ClinicalReasoningSlides patientId={patientId || '1'} slides={withOptionalSlides(lindaSlides)} slideKey="linda-guidelines" />;
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
          <div className="space-y-3 py-4">
            <Image src="/guidelines.png" alt="Guidelines Image HFrEF" title="Guidelines Image HFrEF" width={420} height={300} className="rounded-lg w-full h-auto" />
          </div>
        </div> },
        { id: "robert-slide-3", content: guidelineSlide3 },
      ];

      return <ClinicalReasoningSlides patientId={patientId || '2'} slides={withOptionalSlides(robertSlides)} slideKey="robert-guidelines" />;
    }
    
    // Joana (T2D+CAD)
    if (name === 'joana' || patientId === '3') {
      const joanaSlides = [
        {
          id: "joana-slide-1",
          content: (
            <div className="space-y-8 pb-4 ">
              <p className="text-gray-900 font-bold text-md">
                CVD is the #1 cause of death in patients with T2D<sup>1</sup>
              </p>
              <Image
                src="/PP-new/organism-heart.png"
                alt="CVD risk in patients with T2D"
                title="CVD risk in patients with T2D"
                width={420}
                height={300}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-gray-700">
                Early intervention is needed before CVD occurs.<sup>1,2</sup> For patients already living with established CVD and T2D, early intervention is key to reducing the risk of cardio-renal complications.<sup>3-5</sup>
              </p>
            </div>
          ),
        },
        {
          id: "joana-slide-2",
          content: (
            <div className="space-y-4">
              <p className="text-gray-700 font-bold">2023 ESC Guidelines for the management of cardiovascular disease in patients with diabetes<sup>3</sup></p>
              <p className="text-gray-700">
                The guidelines recommend SGLT2is as Class I, Level A therapy for patients with <b>ASCVD and T2D</b> to reduce cardiovascular risk, for patients with <b>T2D and HF</b> (HFpEF, HFmrEF, HFrEF) to reduce the risk of HHF and CV death, and for patients with <b>T2D and CKD</b> to reduce the CV and kidney failure risk - independent of glucose control and in addition to standard of care.<sup>3</sup>
              </p>
              <div className="space-y-3">
                <Image src="/icons/sglti.png" alt="Guidelines Image T2D" title="Guidelines Image T2D" width={420} height={300} className="rounded-lg w-full h-auto" />
              </div>
              <p className="text-gray-700 font-bold text-xl py-6">
                Don&apos;t miss the moment.
              </p>
            </div>
          ),
        },
        {
          id: "joana-slide-3",
          content: (
            <div className="space-y-8 pb-4">
              <p className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Did you know?
              </p>
              <p className="text-gray-800">
                <b>uACR</b> is a prognostic marker for HF and CVD outcomes, and CKD progression.<sup>6</sup>
              </p>
              <p className="text-gray-800">
                <b>Elevated uACR or reduced eGFR</b> is associated with an increased risk of CV mortality, independently of each other.<sup>7</sup>
              </p>
              <p className="text-gray-800">
                <b>But, uACR</b> identifies CV risk much earlier than eGFR decline.<sup>7</sup>
              </p>
              <Image
                src="/PP-new/uACR-symbols.png"
                alt="uACR and eGFR"
                title="uACR and eGFR"
                width={420}
                height={300}
                className="rounded-lg w-full h-auto"
              />
            </div>
          ),
        },
        {
          id: "joana-slide-4",
          content: (
            <div className="space-y-6 pb-4">
              <p className="text-gray-700 font-bold">
                Early intervention can help reduce cardio-renal risk progression in patients with T2D and established CVD.<sup>1,3-5</sup>
              </p>
              <Image
                src="/PP-new/guidelines-vcf.png"
                alt="Early intervention for cardio-renal risk"
                title="Early intervention for cardio-renal risk"
                width={420}
                height={300}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-gray-900 font-bold text-xl">Don&apos;t miss the moment.</p>
            </div>
          ),
        },
      ];

      return <ClinicalReasoningSlides patientId={patientId || '3'} slides={withOptionalSlides(joanaSlides)} slideKey="joana-guidelines" />;
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
       
      ];

      return <ClinicalReasoningSlides patientId={patientId || '4'} slides={withOptionalSlides(jamesSlides)} slideKey="james-guidelines" />;
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
      
      ];

      return <ClinicalReasoningSlides patientId={patientId || '5'} slides={withOptionalSlides(erikSlides)} slideKey="erik-guidelines" />;
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