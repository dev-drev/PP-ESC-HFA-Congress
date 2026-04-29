'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function JamesFlow2Age70Page() {
  const patient = mockPatients.find((p) => p.name === 'James') || mockPatients[3];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2040}
        age={70}
        quote="I do feel more tired than before, and my legs swell now and then. But at least I haven't had any major setbacks, and I'm managing as best I can."
        backgroundImage="/backgrounds/james-70b.jpg"
        currentStepImage="/next-steps/james/step6.png"
        sglt2iAccordionTitle="The earlier, the better"
        showClinicalReasoning={true}
        endActions={[
          { id: 'go-back', text: 'Travel back in time' },
          { id: 'restart', text: 'Restart' },
          { id: 'select-another', text: 'Select another patient' }
        ]}
      />
    </ClientWrapper>
  );
}
