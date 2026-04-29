'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function JamesFlow2Age60Page() {
  const patient = mockPatients.find((p) => p.name === 'James') || mockPatients[3];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2035}
        age={70}
        quote="I do feel more tired than before, and my legs swell now and then. But at least I haven’t had any major setbacks, and I’m managing as best I can."
        backgroundImage="/backgrounds/james/02C.jpg"
        currentStepImage="/next-steps/james/step10.png"
        sglt2iAccordionTitle="The earlier, the better"
        showClinicalReasoning={true}
        endActions={[
          { id: 'restart', text: 'Restart' },
          { id: 'time-travel', text: 'Travel back in time' }
        ]}
      />
    </ClientWrapper>
  );
}
