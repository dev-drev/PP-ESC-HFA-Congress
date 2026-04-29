'use client'

import { usePathname } from 'next/navigation'
import ReferencesButton from './ReferencesButton'
import ReferencesButtonPatient1 from './ReferencesButtonPatient1'
import ReferencesButtonPatient3 from './ReferencesButtonPatient3'
import ReferencesButtonPatient4 from './ReferencesButtonPatient4'
import ReferencesButtonPatient5 from './ReferencesButtonPatient5'

export default function ConditionalReferencesButton() {
  const pathname = usePathname()
  
  const shouldHide = pathname === '/'
  
  if (shouldHide) {
    return null
  }

  // Joana (patient 3) – deve essere prima di Linda, così joana-add-sglt2i-case va a Patient3
  if (pathname === '/patient/3' || pathname.includes('joana-')) {
    return <ReferencesButtonPatient3 />
  }

  // Linda (patient 1) – step 1, 2 e 3: stesso blocco references/footnotes
  if (pathname === '/patient/1' || pathname.includes('sglt2i-case') || pathname.includes('beta-blocker-case')) {
    return <ReferencesButtonPatient1 />
  }

  // For James (patient 4) - include all James-related routes
  if (pathname === '/patient/4' || pathname.includes('james-')) {
    return <ReferencesButtonPatient4 />
  }

  // For Erik (patient 5) - include all Erik-related routes
  if (pathname === '/patient/5' || pathname.includes('erik-')) {
    return <ReferencesButtonPatient5 />
  }

  return <ReferencesButton />
}