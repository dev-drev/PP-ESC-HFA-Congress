'use client';

import { useSessionSync } from '@/hooks/useSessionSync';
import { useSearchParams, usePathname } from 'next/navigation';

export default function SessionSyncProvider({ children }: { children: React.ReactNode }) {
  const { sessionCode, screenRole } = useSessionSync();
  const pathname = usePathname();
  

  return (
    <>
      {children}
      
    </>
  );
}