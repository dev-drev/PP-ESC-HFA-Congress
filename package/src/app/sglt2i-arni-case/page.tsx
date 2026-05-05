'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function SGLT2iARNIPage() {
  const patient = mockPatients.find((p) => p.condition === 'HFrEF') || mockPatients[1];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2036}
        quote="I'm grateful that I can still enjoy the time with my wife and that my heart failure is well managed."
        backgroundImage="/backgrounds/02B.jpg"
        currentStepImage="/next-steps/robert/final/step7.png"
        sglt2iAccordionTitle="Initiate SGLT2i"
        showClinicalReasoning={true}
      />
    </ClientWrapper>
  );
}