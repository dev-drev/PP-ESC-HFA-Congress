'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function SGLT2iCasePage() {
  const patient = mockPatients.find((p) => p.condition === 'HFpEF') || mockPatients[0];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2035}
        quote="I'm grateful that I can still meet my friends and that my doctor takes care of my heart failure."
        backgroundImage="/backgrounds/01A.jpg"
        currentStepImage="/next-steps/linda/final/step8.png"
        sglt2iAccordionTitle="Commit to standing against CV risk."
        showClinicalReasoning={true}
      />
    </ClientWrapper>
  );
}