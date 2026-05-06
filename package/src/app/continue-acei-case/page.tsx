'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function ContinueACEIPage() {
  const patient = mockPatients.find((p) => p.condition === 'HFrEF') || mockPatients[1];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2036}
        age={72}
        quote="Recently, I was hospitalized again due to acute decompensated HF. Can you help me feel better, doctor?"
        backgroundImage="/backgrounds/02C.jpg"
        currentStepImage="/next-steps/robert/final/step8.png"
        sglt2iAccordionTitle="Don't miss the moment"
        showClinicalReasoning={false}
      />
    </ClientWrapper>
  );
}