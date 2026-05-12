'use client';

import { useEffect } from 'react';

interface ImagePreloaderProps {
  onLoadingChange?: (loading: boolean) => void;
  onProgress?: (loaded: number, total: number) => void;
}

function dedupeUrls(urls: string[]): string[] {
  return [...new Set(urls)];
}

function rangeSteps(folder: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${folder}/step${i + 1}.png`);
}

/** Every step image used in Linda, Robert, Joana flows (PatientDetail + case pages). */
const LINDA_STEP_IMAGES = rangeSteps('/next-steps/linda/final', 10);
const ROBERT_STEP_IMAGES = dedupeUrls([
  ...rangeSteps('/next-steps/robert/final', 9),
  '/next-steps/robert/final/step3b.png',
]);
const JOANA_STEP_IMAGES = rangeSteps('/next-steps/joana/final', 10);

/**
 * Portraits, overlays, hero backgrounds, and step art for Linda, Robert, Joana
 * so the patient photo is already in cache at each step.
 */
export const LINDA_ROBERT_JOANA_PATIENT_IMAGE_URLS = dedupeUrls([
  // Linda
  '/linda.png',
  '/characters/01.png',
  '/characters/01A.png',
  '/characters/01B.png',
  '/avatars/linda.png',
  '/overlays/01.png',
  '/overlays/01A.png',
  '/overlays/01B.png',
  '/backgrounds/01A.jpg',
  '/backgrounds/01B.jpg',
  '/backgrounds/01C.jpg',
  ...LINDA_STEP_IMAGES,
  // Robert
  '/Card-Man_A_20241028.png',
  '/characters/02.png',
  '/characters/02A.png',
  '/characters/02B.png',
  '/avatars/robert.png',
  '/overlays/02.png',
  '/overlays/02A.png',
  '/backgrounds/02A.jpg',
  '/backgrounds/02B.jpg',
  '/backgrounds/02C.jpg',
  ...ROBERT_STEP_IMAGES,
  // Joana
  '/characters/03A.png',
  '/characters/03B.png',
  '/characters/03C.png',
  '/avatars/characters/03B.png',
  '/overlays/03A.png',
  '/overlays/03B.png',
  '/overlays/03C.png',
  '/backgrounds/03A.jpg',
  '/backgrounds/03A.png',
  '/backgrounds/03B.png',
  '/backgrounds/03C.png',
  ...JOANA_STEP_IMAGES,
]);

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

const BOOTSTRAP_IMAGE_URLS = dedupeUrls([
  ...INITIAL_ASSETS,
  ...LINDA_ROBERT_JOANA_PATIENT_IMAGE_URLS,
]);

const PATIENT_SELECTION_ASSETS = dedupeUrls([
  '/Card-Man_A_20241028.png',
  '/linda.png',
  '/characters/03B.png',
  '/patient-circle.svg',
  '/arrow.svg',
  ...LINDA_ROBERT_JOANA_PATIENT_IMAGE_URLS,
]);

const FLOW_ASSETS: Record<string, string[]> = {
  robert: ROBERT_STEP_IMAGES,
  linda: LINDA_STEP_IMAGES,
  joana: JOANA_STEP_IMAGES,
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
    preloadAssets(BOOTSTRAP_IMAGE_URLS, onProgress).finally(() => {
      onLoadingChange?.(false);
    });
  }, [onLoadingChange, onProgress]);

  return null;
}