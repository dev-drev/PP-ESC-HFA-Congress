'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function End2Page() {
  const patient = mockPatients.find((p) => p.condition === 'HFrEF') || mockPatients[1];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2036}
        age={72}
        currentStepImage="/next-steps/robert/final/step9.png"
        quote="I'm grateful that I can still enjoy the time with my wife and that my heart failure is well managed."
        backgroundImage="/backgrounds/02A.jpg"
        sglt2iAccordionTitle="Commit to standing against CV risk."

        showClinicalReasoning={true}
      />
    </ClientWrapper>
  );
}