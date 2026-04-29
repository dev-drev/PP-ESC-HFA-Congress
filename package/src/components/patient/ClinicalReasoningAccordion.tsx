'use client';

import PatientAccordion from './PatientAccordion';
import ClinicalReasoningSlides from './ClinicalReasoningSlides';
import Image from 'next/image';

interface ClinicalReasoningAccordionProps {
  patientId: string;
  patientName: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function ClinicalReasoningAccordion({
  patientId,
  patientName,
  isOpen,
  onToggle,
}: ClinicalReasoningAccordionProps) {
  const getSlides = () => {
    if (patientId === '1') {
      // Linda
      return [
        {
          id: 'linda-slide-1',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-4 font-medium text-gray-700">
                Did you know that SGLT2is, such as JARDIANCE<sup>®</sup>,
                provide protection by significantly reducing the risk of CV
                death or HHF for patients with HFpEF?<sup>*2</sup>
              </p>
              <div className="flex items-center justify-between mt-4 max-w-[380px] w-full mx-auto">
                <div className="relative">
                  <Image
                    src="/icons/21C.png"
                    alt="Heart"
                    title="Heart"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-base mt-6 text-gray-700">
                The earlier you initiate JARDIANCE<sup>®</sup>, the more likely
                your patients are to benefit from improved long-term outcomes.
                <sup>†3</sup>
              </p>
            </div>
          ),
        },
        {
          id: 'linda-slide-2',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-6 text-gray-700">
                While managing comorbidities and underlying conditions is
                important in the treatment of HFpEF, therapies such as ACE
                inhibitors, statins, and beta-blockers have limited evidence for
                improving outcomes.<sup>4</sup>
              </p>

              <div className="mb-6">
                <Image
                  src="/icons/sglti.png"
                  alt="Heart"
                  title="SGLT2i"
                  width={400}
                  height={150}
                  className="object-contain"
                />
              </div>

              <p className="text-base font-bold mb-3 text-gray-700">
                The only disease-modifying therapy recommended by the 2023 ESC
                HF guidelines is an SGLT2i.<sup>4</sup>
              </p>
              <p className="text-sm text-gray-700">
                Initiate JARDIANCE<sup>®</sup> early so that your patients with
                HFpEF like Linda can benefit from significant risk reduction –
                as early as Day 18!<sup>*†2,3</sup>
              </p>
            </div>
          ),
        },
        {
          id: 'linda-slide-3',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-6 text-gray-700 font-bold">
                Would you like to continue with your next patient Robert?
              </p>

              <div className="flex items-center gap-6 mb-6">
                <div>
                  <p className="text-lg text-gray-700">
                    Robert was recently diagnosed with HFrEF (NYHA Class II) and
                    would benefit from your care.
                  </p>
                </div>
                <div className="w-[100px] h-[100px] rounded-full bg-white overflow-hidden flex-shrink-0">
                  <Image
                    src="/avatars/robert.png"
                    alt="Robert"
                    title="Robert"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <a
                  href="/patient/2"
                  rel="noopener"
                  title="See Robert"
                  data-it-button="see-robert"
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                >
                  See Robert
                </a>
              </div>
            </div>
          ),
        },
      ];
    } else if (patientId === '2') {
      // Robert's slides
      return [
        {
          id: 'robert-slide-1',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-4 font-medium text-gray-700">
                By prescribing Robert an SGLT2i such as JARDIANCE<sup>®</sup> as
                part of his treatment plan, you've significantly improved his
                HFrEF prognosis and enhanced his quality of life.<sup>*1</sup>
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
                JARDIANCE<sup>®</sup> has been shown to significantly reduce the
                risk of cardiovascular death and hospitalization for heart
                failure in patients with HFrEF while also providing benefits for
                his comorbid diabetes.<sup>2,4</sup>
              </p>
            </div>
          ),
        },
        {
          id: 'robert-slide-2',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-6 text-gray-700">
                SGLT2i therapy with JARDIANCE<sup>®</sup> is strongly
                recommended in the latest guidelines (Class I, Level A) for
                patients with HFrEF like Robert, regardless of diabetes status.
                <sup>3</sup>
              </p>

              <div className="mb-6">
                <Image 
                  src="/icons/sglti.png"
                  alt="Heart"
                  width={400}
                  height={150}
                  className="object-contain" />
              </div>

              <p className="text-base text-gray-700">
                Your decision to add SGLT2i to Robert's treatment regimen
                demonstrates your commitment to providing comprehensive GDMT for
                HFrEF, offering both cardiovascular and renal protection.
              </p>
            </div>
          ),
        },
        {
          id: 'robert-slide-3',
          content: (
            <div className="flex flex-col h-full">
              <p className="text-lg mb-6 text-gray-700">
                Thanks to your intervention with SGLT2i therapy:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Robert's LVEF has improved from 36% to 42%</li>
                <li>
                  His NT-proBNP levels have decreased from 824 to 560 pg/mL
                </li>
                <li>His blood pressure is better controlled at 132/80 mmHg</li>
                <li>
                  His kidney function has remained stable despite age
                  progression
                </li>
              </ul>

              <div className="flex justify-center mt-6">
                <a
                  href="/"
                  rel="noopener"
                  title="Return to Home"
                  data-it-button="return-to-home"
                  className="bg-[#095960]  text-white px-8 py-3 rounded-md font-semibold text-xl transition-colors"
                >
                  Return to Home
                </a>
              </div>
            </div>
          ),
        },
      ];
    }
    return [];
  };

  return (
    <PatientAccordion
      title="Initiate SGLT2i"
      isOpen={isOpen}
      onToggle={onToggle}
      titleColor="bg-white/80 border border-white"
      contentColor="bg-transparent"
    >
      <ClinicalReasoningSlides patientId={patientId} slides={getSlides()} slideKey={`clinical-reasoning-${patientId}`} />
    </PatientAccordion>
  );
}