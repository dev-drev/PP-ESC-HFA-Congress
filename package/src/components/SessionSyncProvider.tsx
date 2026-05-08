'use client';

import { useEffect, useRef } from 'react';
import { useSessionSync } from '@/hooks/useSessionSync';
import { usePathname, useRouter } from 'next/navigation';

const INACTIVITY_TIMEOUT_MS = 45_000;
const ACTIVITY_EVENTS: Array<keyof WindowEventMap> = [
  'pointerdown',
  'pointermove',
  'keydown',
  'scroll',
  'touchstart',
];

export default function SessionSyncProvider({ children }: { children: React.ReactNode }) {
  const { sessionCode, screenRole } = useSessionSync();
  const pathname = usePathname();
  const router = useRouter();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearExistingTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const scheduleRedirect = () => {
      clearExistingTimer();
      timeoutRef.current = setTimeout(() => {
        if (window.location.pathname !== '/') {
          router.push('/');
        }
      }, INACTIVITY_TIMEOUT_MS);
    };

    const resetTimer = () => {
      scheduleRedirect();
    };

    scheduleRedirect();
    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, resetTimer, { passive: true });
    });

    return () => {
      clearExistingTimer();
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, resetTimer);
      });
    };
  }, [pathname, router]);

  return (
    <>
      {children}
      
    </>
  );
}