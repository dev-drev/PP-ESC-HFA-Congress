'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function useSessionSync() {
  const searchParams = useSearchParams();

  const sessionCode = searchParams.get('session') || (typeof window !== 'undefined' ? localStorage.getItem('sessionCode') : null);
  const screenRole = searchParams.get('mode') || (typeof window !== 'undefined' ? localStorage.getItem('screenRole') : null);

  useEffect(() => {
    if (sessionCode) {
      localStorage.setItem('sessionCode', sessionCode);
    }
    if (screenRole) {
      localStorage.setItem('screenRole', screenRole);
    }
  }, [sessionCode, screenRole]);

  return { sessionCode, screenRole };
}