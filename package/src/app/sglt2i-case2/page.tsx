'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function SGLT2iCase2Page() {
  const patient = mockPatients.find((p) => p.condition === 'HFpEF') || mockPatients[0];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2036}
        quote="Recently, I was hospitalized again due to severe dyspnea. Can you help me feel better, doctor?"
        backgroundImage="/backgrounds/01C.jpg"
        currentStepImage="/next-steps/linda/final/step10.png"
        sglt2iAccordionTitle="Don't miss the moment"
        showClinicalReasoning={false}
      />
    </ClientWrapper>
  );
}