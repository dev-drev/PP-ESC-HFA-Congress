'use client';

import { useEffect } from 'react';

interface ImagePreloaderProps {
  onLoadingChange?: (loading: boolean) => void;
  onProgress?: (loaded: number, total: number) => void;
}

const INITIAL_ASSETS = [
  '/background-1.jpg',
  '/background-2.jpg',
  '/background.jpg',
  '/linda.png',
  '/Card-Man_A_20241028.png',
  '/characters/03B.png',
  '/patient-circle.svg',
  '/logo-white.svg',
];

const PATIENT_SELECTION_ASSETS = [
  '/Card-Man_A_20241028.png',
  '/linda.png',
  '/characters/03B.png',
  '/patient-circle.svg',
  '/arrow.svg',
];

const FLOW_ASSETS: Record<string, string[]> = {
  robert: [
    '/next-steps/robert/final/step1.png',
    '/next-steps/robert/final/step2.png',
    '/next-steps/robert/final/step3.png',
    '/next-steps/robert/final/step4.png',
  ],
  linda: [
    '/next-steps/linda/final/step1.png',
    '/next-steps/linda/final/step2.png',
    '/next-steps/linda/final/step3.png',
    '/next-steps/linda/final/step4.png',
  ],
  joana: [
    '/next-steps/joana/final/step1.png',
    '/next-steps/joana/final/step2.png',
    '/next-steps/joana/final/step3.png',
    '/next-steps/joana/final/step4.png',
  ],
};

const preloadedAssets = new Set<string>();

function preloadAsset(url: string): Promise<void> {
  if (preloadedAssets.has(url)) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const done = () => {
      preloadedAssets.add(url);
      resolve();
    };

    if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadeddata = done;
      video.onerror = done;
      video.src = url;
      return;
    }

    const img = new Image();
    img.onload = done;
    img.onerror = done;
    img.src = url;
  });
}

export async function preloadAssets(
  urls: string[],
  onProgress?: (loaded: number, total: number) => void
) {
  const queue = urls.filter((url) => !preloadedAssets.has(url));
  const total = queue.length;

  onProgress?.(0, total);
  if (total === 0) return;

  let loaded = 0;
  await Promise.all(
    queue.map(async (url) => {
      await preloadAsset(url);
      loaded += 1;
      onProgress?.(loaded, total);
    })
  );
}

export function preloadPatientFlowAssets(patientId: string) {
  const urls = FLOW_ASSETS[patientId];
  if (!urls) return Promise.resolve();
  return preloadAssets(urls);
}

export async function preloadPatientSelectionAssets(minDelayMs = 3000) {
  const start = Date.now();
  await preloadAssets(PATIENT_SELECTION_ASSETS);
  const elapsedMs = Date.now() - start;
  if (elapsedMs < minDelayMs) {
    await new Promise((resolve) => setTimeout(resolve, minDelayMs - elapsedMs));
  }
}

export default function ImagePreloader({ onLoadingChange, onProgress }: ImagePreloaderProps) {
  useEffect(() => {
    onLoadingChange?.(true);
    preloadAssets(INITIAL_ASSETS, onProgress).finally(() => {
      onLoadingChange?.(false);
    });
  }, [onLoadingChange, onProgress]);

  return null;
}