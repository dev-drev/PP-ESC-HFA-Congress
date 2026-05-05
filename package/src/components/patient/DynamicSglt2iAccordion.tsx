'use client';

import { usePathname } from 'next/navigation';
import PatientAccordion from './PatientAccordion';
import ClinicalReasoningSlides from './ClinicalReasoningSlides';
import Image from 'next/image';

interface DynamicSglt2iAccordionProps {
  patientId: string;
  patientName: string;
  title?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function DynamicSglt2iAccordion({
  patientId,
  patientName,
  title = "Initiate SGLT2i",
  isOpen,
  onToggle,
}: DynamicSglt2iAccordionProps) {
  const pathname = usePathname();
  
  // Determine content based on current route
  const getContent = () => {
    // For case result pages, show the slides
    if (pathname.includes('sglt2i-case2') || 
        pathname.includes('sglt2i-case') || 
        pathname.includes('beta-blocker-case') ||
        pathname.includes('sglt2i-arni-case') ||
        pathname.includes('continue-acei-case') ||
        pathname.includes('joana-optimize-case') ||
        pathname.includes('joana-five-years') ||
        pathname.includes('joana-add-sglt2i-case')) {
      return <ClinicalReasoningSlides patientId={patientId} slides={getSlides()} slideKey={`sglt2i-${pathname}`} />;
    } else {
      // Default: Use ClinicalReasoningSlides for other pages too
      return <ClinicalReasoningSlides patientId={patientId} slides={getSlides()} slideKey={`sglt2i-${pathname}`} />;
    }
  };

  const getSlides = () => {
    // For James (patient 4)
    if (patientId === '4') {
      // Check if we're in the james-flow1-age60, james-flow1-age70, james-flow2-age60, james-flow2-age70, or james-flow3-age60 case
      if (pathname.includes('james-flow1-age60') || pathname.includes('james-flow1-age70') || pathname.includes('james-flow2-age70')) {
        return [
          {
            id: 'james-flow1-slide-1',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-base mb-4 text-gray-700">
                  By prescribing James an SGLT2i, such as JARDIANCE<sup>®</sup> (empagliflozin), soon after his diagnosis, you helped protect him by reducing his kidney disease progression or risk of CV death.<sup>*9</sup>
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/icons/28c.png"
                    alt="Kidney"
                    title="Kidney"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base mt-6 text-gray-700">
                  And did you know that JARDIANCE<sup>®</sup> reduced kidney disease progression regardless of diabetes status?<sup>‡7</sup>
                </p>
              </div>
            ),
          },
          {
            id: 'james-flow1-slide-2',
            content: (
              <div className="flex flex-col h-full space-y-4">
                <p className="text-base text-gray-700">
                  You're well aware: SGLT2is, such as JARDIANCE<sup>®</sup>, are a first-line therapy recommended by KDIGO for kidney and cardiovascular protection in patients with CKD like James.<sup>2</sup>
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/kdigosglt2i.png"
                    alt="kdigo-sglt2i"
                    title="KDIGO SGLT2i"
                    width={400}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base text-gray-700">
                  Continue delivering the best care by implementing the guideline-recommended foundational therapy for CKD and help drive meaningful change for your patients.
                </p>
              </div>
            ),
          },
          {
            id: 'james-flow1-slide-3',
            content: (
              <div className="flex flex-col h-full space-y-4">
                <p className="text-base font-bold text-gray-700">Useful tips for the diagnosis and management of CKD</p>
                <p className="text-base text-gray-700">
                  The KDIGO Heatmap is a risk stratification tool that integrates eGFR and uACR to categorize patients into prognostic risk levels using a color-coded grid.<sup>2</sup>
                </p>
                <Image src="/guidelines-tips.png" alt="Guidelines" title="Guidelines" width={420} height={300} className="rounded-lg w-full h-auto" />
                <p className="text-base text-gray-700">
                  These risk categories indicate the likelihood of CKD progression, CV events, and mortality, helping clinicians make informed decisions on monitoring frequency, specialist referrals, and treatment adjustments.<sup>2</sup>
                </p>
              </div>
            ),
          },
          {
            id: 'james-flow1-slide-4',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-lg mb-6 text-gray-700">
                  Would you like to continue with your next patient? <br />
                  Select the next patient you would like to see!
                </p>
                <div className="flex justify-center mt-6 mb-6">
                  <a
                    href="/"
                    rel="noopener"
                    title="Choose patient"
                    data-it-button="choose-patient-james-flow1-slide-4"
                    className="bg-[#095960] text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                  >
                    Choose patient
                  </a>
                </div>
              </div>
            ),
          },
        ];
      } else if (pathname.includes('james-flow3-age60')) {
 return [
          {
            id: 'james-flow1-slide-1',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-base mb-4 text-gray-700">
                 Did you know that SGLT2i, such as
JARDIANCE<sup>®</sup>, can help protect patients like James
by reducing their kidney disease progression or risk of CV death.<sup>*6</sup>

                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/icons/28c.png"
                    alt="Kidney"
                    title="Kidney"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base mt-6 text-gray-700">
                And did you know that JARDIANCE<sup>®</sup> reduced kidney disease
progression regardless of diabetes status?<sup>‡7</sup>
                </p>
              </div>
            ),
          },
          {
            id: 'james-flow1-slide-2',
            content: (
              <div className="flex flex-col h-full space-y-4">
                <p className="text-base text-gray-700">
                  You're well aware: SGLT2is, such as JARDIANCE<sup>®</sup>, are a first-line therapy recommended by KDIGO for kidney and cardiovascular protection in patients with CKD like James.<sup>2</sup>
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/kdigosglt2i.png"
                    alt="kdigo-sglt2i"
                    title="KDIGO SGLT2i"
                    width={400}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base text-gray-700">
                  Continue delivering the best care by implementing the guideline-recommended foundational therapy for CKD and help drive meaningful change for your patients.
                </p>
              </div>
            ),
          },
          {
            id: 'james-flow1-slide-3',
            content: (
              <div className="flex flex-col h-full space-y-4">
                <p className="text-base font-bold text-gray-700">Useful tips for the diagnosis and management of CKD</p>
                <p className="text-base text-gray-700">
                  The KDIGO Heatmap is a risk stratification tool that integrates eGFR and uACR to categorize patients into prognostic risk levels using a color-coded grid.<sup>2</sup>
                </p>
                <Image src="/guidelines-tips.png" alt="Guidelines" title="Guidelines" width={420} height={300} className="rounded-lg w-full h-auto" />
                <p className="text-base text-gray-700">
                  These risk categories indicate the likelihood of CKD progression, CV events, and mortality, helping clinicians make informed decisions on monitoring frequency, specialist referrals, and treatment adjustments.<sup>2</sup>
                </p>
              </div>
            ),
          },
          {
            id: 'james-flow1-slide-4',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-lg mb-6 text-gray-700">
                  Would you like to continue with your next patient? <br />
                  Select the next patient you would like to see!
                </p>
                <div className="flex justify-center mt-6 mb-6">
                  <a
                    href="/"
                    rel="noopener"
                    title="Choose patient"
                    data-it-button="choose-patient-james-flow1-else-slide-4"
                    className="bg-[#095960] text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                  >
                    Choose patient
                  </a>
                </div>
              </div>
            ),
          },
        ];

      } else {
        return [
          {
            id: 'james-flow1-slide-1',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-base mb-4 text-gray-700">
                  Did you know that SGLT2i, such as
JARDIANCE<sup>®</sup>,  can help protect patients like James by reducing their kidney disease progression or risk of CV death.<sup>*6</sup>

                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/icons/28c.png"
                    alt="Kidney"
                    title="Kidney"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base mt-6 text-gray-700">
                 And did you know that JARDIANCE<sup>®</sup> reduced kidney disease
progression regardless of diabetes status?<sup>‡7</sup>
                </p>
              </div>
            ),
          },
          {
            id: 'james-flow1-slide-2',
            content: (
              <div className="flex flex-col h-full space-y-4">
                <p className="text-base text-gray-700">
                  SGLT2is, such as JARDIANCE<sup>®</sup>, are a first-line therapy recommended by KDIGO for kidney and cardiovascular protection in patients with CKD like James.<sup>2</sup>
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/kdigosglt2i.png"
                    alt="kdigo-sglt2i"
                    title="KDIGO SGLT2i"
                    width={400}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base text-gray-700">
                 Deliver the best care by implementing the guideline-recommended foundational therapy for CKD and help drive meaningful change for your patients.
                </p>
              </div>
            ),
          },
          {
            id: 'james-flow1-slide-3',
            content: (
              <div className="flex flex-col h-full space-y-4">
                <p className="text-base font-bold text-gray-700">Useful tips for the diagnosis and management of CKD</p>
                <p className="text-base text-gray-700">
                  The KDIGO Heatmap is a risk stratification tool that integrates eGFR and uACR to categorize patients into prognostic risk levels using a color-coded grid.<sup>2</sup>
                </p>
                <Image src="/guidelines-tips.png" alt="Guidelines" title="Guidelines" width={420} height={300} className="rounded-lg w-full h-auto" />
                <p className="text-base text-gray-700">
                  These risk categories indicate the likelihood of CKD progression, CV events, and mortality, helping clinicians make informed decisions on monitoring frequency, specialist referrals, and treatment adjustments.<sup>2</sup>
                </p>
              </div>
            ),
          },
          {
            id: 'james-flow1-slide-4',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-lg mb-6 text-gray-700">
                  Would you like to continue with your next patient? <br />
                  Select the next patient you would like to see!
                </p>
                <div className="flex justify-center mt-6 mb-6">
                  <a
                    href="/"
                    rel="noopener"
                    title="Choose patient"
                    data-it-button="choose-patient-james-flow3-slide-4"
                    className="bg-[#095960] text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                  >
                    Choose patient
                  </a>
                </div>
              </div>
            ),
          },
        ];
      }
      // Check if we're in the james-flow2-age60 or james-flow3-age60 case
      if (pathname.includes('james-flow2-age60') || pathname.includes('james-flow3-age60')) {
        return [
          {
            id: 'james-flow-slide-1',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-base mb-4 text-gray-700">
                  Did you know that SGLT2i, such as JARDIANCE<sup>®</sup>, can help protect patients like James by reducing their kidney disease progression or risk of CV death.<sup>*6</sup>
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/icons/28c.png"
                    alt="Kidney"
                    title="Kidney"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base mt-6 text-gray-700">
                  And did you know that JARDIANCE<sup>®</sup> reduced kidney disease progression regardless of diabetes status?<sup>‡7</sup>
                </p>
              </div>
            ),
          },
        ];
      }
    }
    // For Erik (patient 5)
    if (patientId === '5') {
      // Check if we're in the erik-flow1-age52, erik-flow2-age52, or erik-flow3-age52 case
      if (pathname.includes('erik-flow2-age52')) {
        return [
          {
            id: 'erik-flow-slide-1',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-base mb-4 text-gray-700">
                 Did you know that SGLT2i, such as
JARDIANCE<sup>®</sup>,  can help protect patients like Erik by reducing their kidney disease progression or risk of CV death.<sup>*6</sup>

                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/icons/28c.png"
                    alt="Kidney"
                    title="Kidney"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base mt-6 text-gray-700">
                 And did you know that JARDIANCE<sup>®</sup> reduced kidney disease
progression regardless of diabetes status?<sup>‡7</sup>
                </p>
              </div>
            ),
          },
          {
            id: 'erik-flow-slide-2',
            content: (
              <div className="flex flex-col h-full space-y-4">
                <p className="text-base text-gray-700">
                 SGLT2is, such as JARDIANCE<sup>®</sup>, are a first-line therapy recommended by KDIGO for kidney and cardiovascular protection in patients with CKD like Erik.<sup>2</sup>

                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/kdigosglt2i.png"
                    alt="kdigo-sglt2i"
                    title="KDIGO SGLT2i"
                    width={400}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base text-gray-700">
                 Deliver the best care by implementing the guideline-recommended foundational therapy for CKD and help drive meaningful change for your patients.
                </p>
              </div>
            ),
          },
          {
            id: 'erik-flow-slide-3',
            content: (
              <div className="flex flex-col h-full space-y-4">
                <p className="text-base font-bold text-gray-700">Useful tips for the diagnosis and management of CKD</p>
                <p className="text-base text-gray-700">
                  The KDIGO Heatmap is a risk stratification tool that integrates eGFR and uACR to categorize patients into prognostic risk levels using a color-coded grid.<sup>2</sup>
                </p>
                <Image src="/guidelines-tips.png" alt="Guidelines" title="Guidelines" width={420} height={300} className="rounded-lg w-full h-auto" />
                <p className="text-base text-gray-700">
                  These risk categories indicate the likelihood of CKD progression, CV events, and mortality, helping clinicians make informed decisions on monitoring frequency, specialist referrals, and treatment adjustments.<sup>2</sup>
                </p>
              </div>
            ),
          },
          {
            id: 'erik-flow-slide-4',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-lg mb-6 text-gray-700">
                  Would you like to continue with your next patient? <br />
                  Select the next patient you would like to see!
                </p>
                <div className="flex justify-center mt-6 mb-6">
                  <a
                    href="/"
                    rel="noopener"
                    title="Choose patient"
                    data-it-button="choose-patient-erik-flow2-slide-4"
                    className="bg-[#095960] text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                  >
                    Choose patient
                  </a>
                </div>
              </div>
            ),
          },
        ];
      } else if (pathname.includes('erik-flow1-age52')) {
         return [
  {
            id: 'erik-flow-slide-1',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-base mb-4 text-gray-700">
                  By prescribing Erik an SGLT2i, such as JARDIANCE<sup>®</sup> (empagliflozin), soon after his diagnosis, you helped protect him by reducing his kidney disease progression or risk of CV death.<sup>*9</sup>
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/icons/28c.png"
                    alt="Kidney"
                    title="Kidney"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base mt-6 text-gray-700">
                  And did you know that JARDIANCE<sup>®</sup> reduced kidney disease progression regardless of diabetes status?<sup>‡7</sup>
                </p>
              </div>
            ),
          },
          {
            id: 'erik-flow-slide-2',
            content: (
              <div className="flex flex-col h-full space-y-4">
                <p className="text-base text-gray-700">
                
You’re well aware: SGLT2is, such as JARDIANCE<sup>®</sup>, are a first-line therapy recommended by KDIGO for kidney and cardiovascular protection in patients with CKD like Erik.<sup>2</sup>
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/kdigosglt2i.png"
                    alt="kdigo-sglt2i"
                    title="KDIGO SGLT2i"
                    width={400}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base text-gray-700">
                
Continue delivering the best care by implementing the guideline-recommended foundational therapy for CKD and help drive meaningful change for your patients.
                </p>
              </div>
            ),
          },
          {
            id: 'erik-flow-slide-3',
            content: (
              <div className="flex flex-col h-full space-y-4">
                <p className="text-base font-bold text-gray-700">Useful tips for the diagnosis and management of CKD</p>
                <p className="text-base text-gray-700">
                  The KDIGO Heatmap is a risk stratification tool that integrates eGFR and uACR to categorize patients into prognostic risk levels using a color-coded grid.<sup>2</sup>
                </p>
                <Image src="/guidelines-tips.png" alt="Guidelines" title="Guidelines" width={420} height={300} className="rounded-lg w-full h-auto" />
                <p className="text-base text-gray-700">
                  These risk categories indicate the likelihood of CKD progression, CV events, and mortality, helping clinicians make informed decisions on monitoring frequency, specialist referrals, and treatment adjustments.<sup>2</sup>
                </p>
              </div>
            ),
          },
          {
            id: 'erik-flow-slide-4',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-lg mb-6 text-gray-700">
                  Would you like to continue with your next patient? <br />
                  Select the next patient you would like to see!
                </p>
                <div className="flex justify-center mt-6 mb-6">
                  <a
                    href="/"
                    rel="noopener"
                    title="Choose patient"
                    data-it-button="choose-patient-erik-flow1-slide-4"
                    className="bg-[#095960] text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                  >
                    Choose patient
                  </a>
                </div>
              </div>
            ),
          },
         ];
      } else {
        return [
{
            id: 'erik-flow-slide-1',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-lg mb-6 text-gray-700">
                  Would you like to continue with your next patient? <br />
                  Select the next patient you would like to see!
                </p>
                <div className="flex justify-center mt-6 mb-6">
                  <a
                    href="/"
                    rel="noopener"
                    title="Choose patient"
                    data-it-button="choose-patient-erik-else-slide-1"
                    className="bg-[#095960] text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                  >
                    Choose patient
                  </a>
                </div>
              </div>
            ),
          },
        ];

      }
    }
    // For Joana (patient 3)
    if (patientId === '3') {
      // Check if we're in the joana-five-years case
      if (pathname.includes('joana-five-years')) {
        // Joana five years case specific slides
        return [
          {
            id: 'joana-five-years-slide-1',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-base mb-4 text-gray-700">
                Did you know that SGLT2is, such as JARDIANCE<sup>®</sup> (empagliflozin), provide protection by significantly reducing the risk of CV death for patients with eCVD and T2D?<sup>*8</sup>
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/PP-new/38.png"
                    alt="Heart"
                    title="Heart"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base mt-6 text-gray-700">
                The earlier you initiate JARDIANCE<sup>®</sup> (empagliflozin), the more likely your patients are to benefit from improved long-term outcomes.<sup>*5,9</sup>  
                </p>
              </div>
            ),
          },
          {
            id: 'joana-five-years-slide-2',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-base mb-4 text-gray-700">
                 SGLT2is, such as JARDIANCE<sup>®</sup> (empagliflozin), are Class 1 recommended for first-line use in patients like Joana, to reduce the cardiovascular risk, heart failure hospitalizations, and CV and kidney failure risk.<sup>3</sup>
                </p>
                <div className="mb-6">
                  <Image
                    src="/icons/sglti.png"
                    alt="SGLT2i"
                    title="SGLT2i"
                    width={400}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base text-gray-700">
                 Initiate JARDIANCE<sup>®</sup> (empagliflozin) <b>right from the start</b> so that your patients with eCVD and T2D like Joana can benefit from significant risk reduction – as early as Day 59!<sup>*5,9</sup>
                </p>
              </div>
            ),
          },
          {
            id: 'joana-five-years-slide-3',
            content: (
              <div className="flex flex-col h-full p-4 rounded-md">
                <p className="text-2xl font-semibold text-center text-gray-800 mb-6">
                  Did you know?
                </p>

                <p className="text-lg text-center text-gray-700 mb-6">
                <b>uACR</b> is a prognostic marker for HF and CVD outcomes, and CKD progression.<sup>6</sup>
                </p>

                <p className="text-lg text-center text-gray-700 mb-6">
                 <b>Elevated uACR or reduced eGFR</b>  is associated with an increased risk of CV mortality, <b>independently of each other</b>.<sup>7</sup>
                </p>

                <p className="text-lg text-center text-gray-700 mb-8">
                  <b>But, uACR</b> identifies CV risk <b>much earlier</b> than eGFR decline.<sup>7</sup>
                </p>

                 <img src="/PP-new/uACR-symbols.png" alt="uACR and eGFR" title="uACR and eGFR" width={400} height={150} className="object-contain" />
              </div>
            ),
          },
          {
            id: 'joana-five-years-slide-4',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-lg mb-6 text-gray-700">
                  Would you like to continue with your next patient? <br />
                  Select the next patient you would like to see!
                </p>
                <div className="flex justify-center mt-6 mb-6">
                  <a
                    href="/"
                    rel="noopener"
                    title="Choose patient"
                    data-it-button="choose-patient-joana-five-years-slide-4"
                    className="bg-[#095960] text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                  >
                    Choose patient
                  </a>
                </div>
              </div>
            ),
          },
        ];
      }
      // Check if we're in the joana-add-sglt2i-case
      if (pathname.includes('joana-add-sglt2i-case')) {
        // Joana add SGLT2i case specific slides
        return [
          {
            id: 'joana-add-sglt2i-slide-1',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-base mb-4 text-gray-700">
                 By prescribing Joana an SGLT2i such as JARDIANCE<sup>®</sup> (empagliflozin), soon after her diagnosis, you helped protect her by reducing her risk of CV death.<sup>*8</sup>

                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/PP-new/38.png"
                    alt="Heart"
                    title="Heart"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base mt-6 text-gray-700">
                 And did you know that JARDIANCE<sup>®</sup> (empagliflozin) is the <b>first and only</b> SGLT2i proven to reduce the risk of CV death in patients with eCVD and T2D<sup>*†8</sup>
                </p>
              </div>
            ),
          },
          {
            id: 'joana-add-sglt2i-slide-2',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-base mb-4 text-gray-700">
                  You are well aware: SGLT2is, such as JARDIANCE<sup>®</sup> (empagliflozin), are Class 1 recommended for first-line use in patients like Joana, to reduce the cardiovascular risk.<sup>3</sup>
                </p>
                <div className="mb-6">
                  <Image
                    src="/icons/sglti.png"
                    alt="SGLT2i"
                    title="SGLT2i"
                    width={400}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base text-gray-700">
                  Continue delivering the best care by implementing GDMT for patients with eCVD and T2D and help drive meaningful change for your patients.
                </p>
              </div>
            ),
          },
          {
            id: 'joana-add-sglt2i-slide-3',
            content: (
              <div className="flex flex-col h-full p-4 rounded-md">
                <p className="text-2xl font-semibold text-center text-gray-800 mb-6">
                  Did you know?
                </p>

                <p className="text-lg text-center text-gray-700 mb-6">
                <b>uACR</b> is a prognostic marker for HF and CVD outcomes, and CKD progression.<sup>6</sup>
                </p>

                <p className="text-lg text-center text-gray-700 mb-6">
                 <b>Elevated uACR or reduced eGFR</b>  is associated with an increased risk of CV mortality, <b>independently of each other</b>.<sup>7</sup>
                </p>

                <p className="text-lg text-center text-gray-700 mb-8">
                  <b>But, uACR</b> identifies CV risk <b>much earlier</b> than eGFR decline.<sup>7</sup>
                </p>

                <img src="/PP-new/uACR-symbols.png" alt="uACR and eGFR" title="uACR and eGFR" width={400} height={150} className="object-contain" />
              </div>
            ),
          },
          {
            id: 'joana-add-sglt2i-slide-4',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-lg mb-6 text-gray-700">
                  Would you like to continue with your next patient? <br />
                  Select the next patient you would like to see!
                </p>
                <div className="flex justify-center mt-6 mb-6">
                  <a
                    href="/"
                    rel="noopener"
                    title="Choose patient"
                    data-it-button="choose-patient-joana-add-sglt2i-slide-4"
                    className="bg-[#095960] text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                  >
                    Choose patient
                  </a>
                </div>
              </div>
            ),
          },
        ];
      }
      // Check if we're in the optimize case
      if (pathname.includes('joana-optimize-case')) {
        // Joana optimize case specific slides
        return [
          {
            id: 'joana-optimize-slide-1',
            content: (
              <div className="flex flex-col h-full">
               
                <p className="text-base mb-4 text-gray-700">
                  Did you know that SGLT2is, such as JARDIANCE<sup>®</sup> (empagliflozin), provide protection by significantly reducing the risk of CV death for patients with eCVD and T2D?<sup>*8</sup>
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Image
                    src="/PP-new/38.png"
                    alt="Heart"
                    title="Heart"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base mt-6 text-gray-700">
                  The earlier you initiate JARDIANCE<sup>®</sup> (empagliflozin), the more likely your patients are to benefit from improved long-term outcomes.<sup>*5,9</sup>  
                </p>
              </div>
            ),
          },
          {
            id: 'joana-optimize-slide-2',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-base mb-4 text-gray-700">
                 SGLT2is, such as JARDIANCE<sup>®</sup> (empagliflozin), are Class 1 recommended for first-line use in patients like Joana, to reduce the cardiovascular risk, heart failure hospitalizations, and CV and kidney falure risk.<sup>3</sup>
                </p>
                <div className="mb-6">
                  <Image
                    src="/icons/sglti.png"
                    alt="SGLT2i"
                    title="SGLT2i"
                    width={400}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className="text-base text-gray-700">
                  Initiate JARDIANCE<sup>®</sup> (empagliflozin) <b>right from the start</b> so that your patients with eCVD and T2D like Joana can benefit from significant risk reduction – as early as Day 59!<sup>*5,9</sup>
                </p>
              </div>
            ),
          },
          {
            id: 'joana-optimize-slide-3',
            content: (
              <div className="flex flex-col h-full p-4 rounded-md">
                <p className="text-2xl font-semibold text-center text-gray-800 mb-6">
                  Did you know?
                </p>

                <p className="text-lg text-center text-gray-700 mb-6">
                <b>uACR</b> is a prognostic marker for HF and CVD outcomes, and CKD progression.<sup>6</sup>
                </p>

                <p className="text-lg text-center text-gray-700 mb-6">
                 <b>Elevated uACR or reduced eGFR</b>  is associated with an increased risk of CV mortality, <b>independently of each other</b>.<sup>7</sup>
                </p>

                <p className="text-lg text-center text-gray-700 mb-8">
                  <b>But, uACR</b> identifies CV risk <b>much earlier</b> than eGFR decline.<sup>7</sup>
                </p>

                <img src="/PP-new/uACR-symbols.png" alt="uACR and eGFR" title="uACR and eGFR" width={400} height={150} className="object-contain" />
              </div>
            ),
          },
          {
            id: 'joana-optimize-slide-4',
            content: (
              <div className="flex flex-col h-full">
                <p className="text-lg mb-6 text-gray-700">
                  Would you like to continue with your next patient? <br />
                  Select the next patient you would like to see!
                </p>
                <div className="flex justify-center mt-6 mb-6">
                  <a
                    href="/"
                    rel="noopener"
                    title="Choose patient"
                    data-it-button="choose-patient-joana-optimize-slide-4"
                    className="bg-[#095960] text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                  >
                    Choose patient
                  </a>
                </div>
              </div>
            ),
          },
        ];
      }
      // Default Joana slides
      return [
        {
          id: "joana-slide-1",
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-4 font-bold text-gray-700">
                Sound clinical reasoning!
              </p>
              <p className="text-base mb-4 text-gray-700">
                By prescribing Joana an SGLT2i such as JARDIANCE<sup>®</sup> (empagliflozin),
                soon after her diagnosis, you helped protect her by reducing her
                risk of CV death.<sup>*†5</sup>
              </p>
              <div className="flex items-center justify-between mt-4">
                <Image
                  src="/PP-new/38.png"
                  alt="Heart"
                    title="Heart"
                  width={500}
                  height={150}
                  className="object-contain"
                />
              </div>
              <p className="text-base mt-6 text-gray-700">
                And did you know that JARDIANCE<sup>®</sup> is the only SGLT2i
                proven to reduce the risk of CV death in patients with eCVD and
                T2D<sup>*†‡5</sup>
              </p>
            </div>
          ),
        },
        {
          id: "joana-slide-2",
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-4 font-bold text-gray-700">
                Sound clinical reasoning!
              </p>
              <p className="text-base mb-4 text-gray-700">
                You are well aware: SGLT2is, such as JARDIANCE<sup>®</sup> are
                Class 1 recommended for first-line use in patients like Joana,
                to reduce the cardiovascular risk.<sup>1</sup>
              </p>
              <div className="mb-6">
                <Image
                  src="/icons/sglti.png"
                  alt="SGLT2i"
                    title="SGLT2i"
                  width={400}
                  height={150}
                  className="object-contain"
                />
              </div>
              <p className="text-base text-gray-700">
                Continue delivering the best care by implementing GDMT for
                patients with eCVD and T2D and help drive meaningful change for
                your patients.
              </p>
            </div>
          ),
        },
        {
          id: "joana-slide-3",
          content: (
            <div className="flex flex-col h-full p-4 rounded-md">
              <p className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Did you know?
              </p>

              <p className="text-lg text-center text-gray-700 mb-6">
              <b>uACR</b> is a prognostic marker for HF and CVD outcomes, and CKD progression.<sup>24</sup>
              </p>

              <p className="text-lg text-center text-gray-700 mb-6">
               <b>Elevated uACR or reduced eGFR</b>  is associated with an increased risk of CV mortality, <b>independently of each other</b>.<sup>15</sup>
              </p>

              <p className="text-lg text-center text-gray-700 mb-8">
                <b>But, uACR</b> identifies CV risk much earlier than eGFR decline.<sup>23</sup>
              </p>

              <img src="/PP-new/uACR-symbols.png" alt="uACR and eGFR" title="uACR and eGFR" width={400} height={150} className="object-contain" />
            </div>
          ),
        },
      ];
    }
    // For other unknown patients, use default slides
    if (!patientId || (patientId !== '1' && patientId !== '2' && patientId !== '3')) {
      // Default slides
      return [
        {
          id: 'default-slide-1',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-4 font-medium text-gray-700">
                SGLT2i therapy provides comprehensive cardiovascular protection
                for patients with diabetes and cardiovascular disease.
              </p>
              <div className="flex items-center justify-center mt-4">
                <Image
                  src="/icons/21A.png"
                  alt="Clinical reasoning"
                    title="Clinical reasoning"
                  width={400}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>
          ),
        },
      ];
    }
    if (patientId === '1') {
       if (pathname.includes('/beta-blocker-case')) {
            return [
       {
          id: 'linda-slide-1',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-4 font-medium text-gray-700">
              Did you know that SGLT2is, such as JARDIANCE<sup>®</sup> (empagliflozin), provide protection by significantly reducing the risk of CV death or HHF for patients with HFpEF?<sup>*5</sup>
              </p>
              <div className="flex items-center justify-center mt-4 max-w-[340px] w-full mx-auto">
                <div className="relative">
                  <Image
                    src="/PP-new/21.png"
                    alt="Heart"
                    title="Heart"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-base mt-6 text-gray-700">
                The earlier you initiate JARDIANCE<sup>®</sup> (empagliflozin), the more likely your patients are to benefit from improved long-term outcomes.
                <sup>*‡6,12 </sup>
              </p>
            </div>
          ),
        },
        {
          id: 'linda-slide-2',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-6 text-gray-700">
              While managing comorbidities and underlying conditions is important in the treatment of HFpEF, therapies such as ACE inhibitors, statins, and beta-blockers have limited evidence for improving outcomes.<sup>4</sup>

              </p>

              <div className="mb-6">
                <Image
                  src="/icons/sglti.png"
                  alt="SGLT2i"
                    title="SGLT2i"
                  width={400}
                  height={150}
                  className="object-contain"
                />
              </div>

              <p className="text-base mb-3 text-gray-700">
               The <b>only disease-modifying therapy </b>recommended by the 2023 ESC HF guidelines is an SGLT2i.<sup>4</sup> <br /> <br />Initiate JARDIANCE<sup>®</sup> (empagliflozin) early so that your patients with HFpEF like Linda can benefit from significant risk reduction – as early as Day 18!<sup>*‡6,12</sup> 
              </p>
            
            </div>
          ),
        },
        {
          id: 'linda-slide-3',
          content: (
               <div className="flex flex-col h-full p-4 rounded-md">
              <p className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Did you know?
              </p>

              <p className="text-lg text-center text-gray-700 mb-6">
              <b>uACR</b> is a prognostic marker for HF and CVD outcomes, and CKD progression.<sup>10</sup>
              </p>

              <p className="text-lg text-center text-gray-700 mb-6">
               <b>Elevated uACR or reduced eGFR</b>  is associated with an increased risk of CV mortality, <b>independently of each other</b>.<sup>11</sup>
              </p>

              <p className="text-lg text-center text-gray-700 mb-8">
                <b>But, uACR</b> identifies CV risk much earlier than eGFR decline.<sup>11</sup>
              </p>

              <img src="/PP-new/uACR-symbols.png" alt="uACR and eGFR" title="uACR and eGFR" width={400} height={150} className="object-contain" />
            </div>
          ),
        },
        {
          id: 'linda-slide-4',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-6 text-gray-700">
                Would you like to continue with your next patient? <br />
                Select the next patient you would like to see!
              </p>
              <div className="flex justify-center mt-6 mb-6">
                <a
                  href="/"
                  rel="noopener"
                  title="Choose patient"
                  data-it-button="choose-patient-linda-beta-blocker-slide-4"
                  className="bg-[#095960] text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                >
                  Choose patient
                </a>
              </div>
            </div>
          ),
        },
      ];      
    }
    if (pathname.includes('/sglt2i-case2')) {
            return [
       {
          id: 'linda-slide-1',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-4 font-medium text-gray-700">
              Did you know that SGLT2is, such as JARDIANCE<sup>®</sup> (empagliflozin), provide protection by significantly reducing the risk of CV death or HHF for patients with HFpEF?<sup>†6</sup>
              </p>
              <div className="flex items-center justify-center mt-4 max-w-[340px] w-full mx-auto">
                <div className="relative">
                  <Image
                    src="/PP-new/21.png"
                    alt="Heart"
                    title="Heart"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-lg mt-8 text-gray-700">
              The earlier you initiate JARDIANCE<sup>®</sup> (empagliflozin), the more likely your patients are to benefit from improved long-term outcomes.
                <sup>†§
                6,12 </sup>
              </p>
            </div>
          ),
        },
        {
          id: 'linda-slide-2',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-6 text-gray-700">
              While managing comorbidities and underlying conditions is important in the treatment of HFpEF, therapies such as ACE inhibitors, statins, and beta-blockers have limited evidence for improving outcomes.<sup>4</sup>

              </p>

              <div className="mb-6">
                <Image
                  src="/icons/sglti.png"
                  alt="SGLT2i"
                    title="SGLT2i"
                  width={400}
                  height={150}
                  className="object-contain"
                />
              </div>

              <p className="text-base mb-3 text-gray-700">
               The <b>only disease-modifying therapy </b>recommended by the 2023 ESC HF guidelines is an SGLT2i.<sup>4</sup> <br /> <br />Initiate JARDIANCE<sup>®</sup> (empagliflozin) early so that your patients with HFpEF like Linda can benefit from significant risk reduction – as early as Day 18!<sup>†§
                6,12</sup> 
              </p>
            
            </div>
          ),
        },
        {
          id: 'linda-slide-3',
          content: (
               <div className="flex flex-col h-full p-4 rounded-md">
              <p className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Did you know?
              </p>

              <p className="text-lg text-center text-gray-700 mb-6">
              <b>uACR</b> is a prognostic marker for HF and CVD outcomes, and CKD progression.<sup>10</sup>
              </p>

              <p className="text-lg text-center text-gray-700 mb-6">
               <b>Elevated uACR or reduced eGFR</b>  is associated with an increased risk of CV mortality, <b>independently of each other</b>.<sup>11</sup>
              </p>

              <p className="text-lg text-center text-gray-700 mb-8">
                <b>But, uACR</b> identifies CV risk much earlier than eGFR decline.<sup>11</sup>
              </p>

              <img src="/PP-new/uACR-symbols.png" alt="uACR and eGFR" title="uACR and eGFR" width={400} height={150} className="object-contain" />
            </div>
          ),
        },
        {
          id: 'linda-slide-4',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-6 text-gray-700">
                Would you like to continue with your next patient? <br />
                Select the next patient you would like to see!
              </p>
              <div className="flex justify-center mt-6 mb-6">
                <a
                  href="/"
                  rel="noopener"
                  title="Choose patient"
                  data-it-button="choose-patient-linda-sglt2i-case2-slide-4"
                  className="bg-[#095960] text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                >
                  Choose patient
                </a>
              </div>
            </div>
          ),
        },
      ];      
    }
      // Linda
      return [
        {
          id: 'linda-slide-1',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-4 font-medium text-gray-700">
               By prescribing Linda an SGLT2i such as JARDIANCE<sup>®</sup> (empagliflozin), soon after her diagnosis, you helped protect her by reducing her risk of CV death or HHF.<sup>†6</sup>

              </p>
              <div className="flex items-center justify-center mt-4 max-w-[380px] w-full mx-auto">
                <div className="relative">
                  <Image
                    src="/icons/21D.png"
                    alt="Heart"
                    title="Heart"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-base mt-6 text-gray-700">
                And did you know that, in addition to improving CV outcomes, JARDIANCE<sup>®</sup> (empagliflozin) improved quality of life regardless of LVEF?
                <sup>†8,9</sup>
              </p>
            </div>
          ),
        },
        {
          id: 'linda-slide-2',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-6 text-gray-700">
               You are well aware: SGLT2is, such as JARDIANCE<sup>®</sup> (empagliflozin), are the only guideline-recommended disease-modifying therapy (Class I, Level A) for patients with HFpEF like Linda.<sup>4</sup>

              </p>

              <div className="mb-6">
                <Image
                  src="/icons/sglti.png"
                  alt="SGLT2i"
                    title="SGLT2i"
                  width={400}
                  height={150}
                  className="object-contain"
                />
              </div>

              <p className="text-base mb-3 text-gray-700">
                Continue delivering the best care by implementing GDMT for HF across the LVEF spectrum and help drive meaningful change for your patients.
              </p>
            
            </div>
          ),
        },
        {
          id: 'linda-slide-3',
          content: (
               <div className="flex flex-col h-full p-4 rounded-md">
              <p className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Did you know?
              </p>

              <p className="text-lg text-center text-gray-700 mb-6">
              <b>uACR</b> is a prognostic marker for HF and CVD outcomes, and CKD progression.<sup>10</sup>
              </p>

              <p className="text-lg text-center text-gray-700 mb-6">
               <b>Elevated uACR or reduced eGFR</b>  is associated with an increased risk of CV mortality, <b>independently of each other</b>.<sup>11</sup>
              </p>

              <p className="text-lg text-center text-gray-700 mb-8">
                <b>But, uACR</b> identifies CV risk much earlier than eGFR decline.<sup>11</sup>
              </p>

              <img src="/PP-new/uACR-symbols.png" alt="uACR and eGFR" title="uACR and eGFR" width={400} height={150} className="object-contain" />
            </div>
          ),
        },
        {
          id: 'linda-slide-4',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-6 text-gray-700">
                Would you like to continue with your next patient? <br />
                Select the next patient you would like to see!
              </p>
              <div className="flex justify-center mt-6 mb-6">
                <a
                  href="/"
                  rel="noopener"
                  title="Choose patient"
                  data-it-button="choose-patient-linda-default-slide-4"
                  className="bg-[#095960] text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                >
                  Choose patient
                </a>
              </div>
            </div>
          ),
        },
      ];
    } else if (patientId === '2') {
      // Use the 4-slide closing variant on Robert final-stage routes
      if (
        pathname.includes('/end2') ||
        pathname.includes('/continue-acei-case') ||
        pathname.includes('/sglt2i-arni-case')
      ) {
            return [
        {
          id: 'robert-slide-1',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-4 font-medium text-gray-700">
            By prescribing Robert an SGLT2i, such as JARDIANCE<sup>®</sup> (empagliflozin), soon after his diagnosis, you helped protect him by reducing his risk of CV death or HHF.<sup>*9</sup>

              </p>
              <div className="flex items-center justify-center mt-4 max-w-[380px] w-full mx-auto">
                <div className="relative">
                  <Image
                    src="/icons/25A.png"
                    alt="Heart"
                    title="Heart"
                    width={400}
                    height={150}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-lg mt-6 text-gray-700">
              And did you know that, in addition to improving CV outcomes, JARDIANCE<sup>®</sup> (empagliflozin) improved quality of life regardless of LVEF?<sup>†12,13</sup>
              </p>
            </div>
          ),
        },
        {
          id: 'robert-slide-2',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-6 text-gray-700">
             
               You are well aware: SGLT2is, such as JARDIANCE<sup>®</sup> (empagliflozin), are 1 of 4 foundational guideline-recommended treatments (Class I, Level A) for patients with HFrEF like Robert.<sup>5</sup>

              </p>

              <div className="mb-6">
                <Image 
                  src="/guidelines.png"
                  alt="SGLT2i"
                  title="SGLT2i guidelines"
                  width={400}
                  height={150}
                  className="object-contain" />
              </div>

              <p className="text-lg text-gray-700">
                Continue delivering the best care by implementing GDMT for HF across the LVEF spectrum and help drive meaningful change for your patients.
              </p>
            </div>
          ),
        },
        {
          id: 'robert-slide-3',
          content: (
            <div className="flex flex-col h-full p-4 rounded-md">
              <p className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Did you know?
              </p>

              <p className="text-lg text-center text-gray-700 mb-6">
              <b>uACR</b> is a prognostic marker for HF and CVD outcomes, and CKD progression.<sup>14</sup>
              </p>

              <p className="text-lg text-center text-gray-700 mb-6">
               <b>Elevated uACR or reduced eGFR</b>  is associated with an increased risk of CV mortality, <b>independently of each other</b>.<b><sup>15</sup></b> 
              </p>

              <p className="text-lg text-center text-gray-700 mb-8">
                <b>But, uACR</b> identifies CV risk much earlier than eGFR decline.<sup>15</sup>
              </p>

                <img src="/PP-new/uACR-symbols.png" alt="uACR and eGFR" title="uACR and eGFR" width={400} height={150} className="object-contain" />
            </div>
          ),
        },
        {
          id: 'robert-slide-4',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-6 text-gray-700">
                Would you like to continue with your next patient? <br />

Select the next patient you would like to see!
              </p>

              
              <div className="flex justify-center mt-6 mb-6">
                <a
                  href="/"
                  rel="noopener"
                  title="Choose patient"
                  data-it-button="choose-patient-robert-end2-slide-3"
                  className="bg-[#095960] text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                >
                  Choose patient
                </a>
              </div>
            </div>
          ),
        },
      ];
      }
      // Default Robert slides (when not /end2)
      return [
        {
          id: 'robert-slide-1',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-4 font-medium text-gray-700">
             Did you know that SGLT2is, such as JARDIANCE<sup>®</sup> (empagliflozin), provide protection by significantly reducing the risk of CV death or HHF for patients with HFrEF?<sup>*6</sup>

              </p>
              <div className="flex items-center justify-center mt-4 max-w-[380px] w-full mx-auto">
                <div className="relative">
                  <Image
                    src="/icons/25A.png"
                    alt="Heart"
                    title="Heart"
                    width={400}
                    height={150}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-base mt-6 text-gray-700">
             The earlier you initiate JARDIANCE<sup>®</sup> (empagliflozin), the more likely your patients are to benefit from improved long-term outcomes. <sup>*‡6,9</sup> 
              </p>
            </div>
          ),
        },
        {
          id: 'robert-slide-2',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-6 text-gray-700">
             
               SGLT2is, such as JARDIANCE<sup>®</sup> (empagliflozin), are 1 of 4 foundational guideline-recommended treatments (Class I, Level A) for patients with HFrEF like Robert.<sup>5</sup>

              </p>

              <div className="mb-6">
                <Image 
                  src="/guidelines.png"
                  alt="SGLT2i"
                  title="SGLT2i guidelines"
                  width={400}
                  height={150}
                  className="object-contain" />
              </div>

              <p className="text-base text-gray-700">
               Major guidelines recommend rapid initiation and up-titration of all four foundational treatments for all patients with HFrEF.<sup>5</sup>
              </p>
            </div>
          ),
        },
        {
          id: 'robert-slide-3',
          content: (
            <div className="flex flex-col h-full p-4 rounded-md">
              <p className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Did you know?
              </p>

              <p className="text-lg text-center text-gray-700 mb-6">
              <b>uACR</b> is a prognostic marker for HF and CVD outcomes, and CKD progression.<sup>14</sup>
              </p>

              <p className="text-lg text-center text-gray-700 mb-6">
               <b>Elevated uACR or reduced eGFR</b>  is associated with an increased risk of CV mortality, <b>independently of each other</b>.<b><sup>15</sup></b> 
              </p>

              <p className="text-lg text-center text-gray-700 mb-8">
                <b>But, uACR</b> identifies CV risk much earlier than eGFR decline.<sup>15</sup>
              </p>

              <img src="/PP-new/uACR-symbols.png" alt="uACR and eGFR" title="uACR and eGFR" width={400} height={150} className="object-contain" />
            </div>
          ),
        },
        
      ];
    }
    // Fallback: return empty slide if no patient matched
    return [
      {
        id: 'fallback-slide',
        content: (
          <div className="flex flex-col h-full">
            <p className="text-lg text-gray-700">
              SGLT2i therapy is recommended for cardiovascular protection.
            </p>
          </div>
        ),
      },
    ];
  };

  return (
    <div className="w-full 2xl:w-[500px] bg-white/70 backdrop-blur-lg rounded-4xl">
      <PatientAccordion
        title={title}
        isOpen={isOpen}
        onToggle={onToggle}
        titleColor="bg-white/80 border border-white"
        contentColor="bg-transparent"
      >
        {getContent()}
      </PatientAccordion>
    </div>
  );
}