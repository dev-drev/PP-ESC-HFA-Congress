'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function BetaBlockerPage() {
  const patient = mockPatients.find((p) => p.condition === 'HFpEF') || mockPatients[0];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2035}
        quote="In recent years, my symptoms have been more manageable, and I haven’t needed a hospital stay — which I’m thankful for."
        backgroundImage="/backgrounds/01B.jpg"
        currentStepImage="/next-steps/linda/final/step9.png"
        sglt2iAccordionTitle="The earlier, the better"
        showClinicalReasoning={true}
      />
    </ClientWrapper>
  );
}