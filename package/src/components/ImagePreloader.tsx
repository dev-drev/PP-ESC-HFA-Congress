'use client';

import { useEffect } from 'react';

interface ImagePreloaderProps {
  onLoadingChange?: (loading: boolean) => void;
  onProgress?: (loaded: number, total: number) => void;
}

export default function ImagePreloader({ onLoadingChange, onProgress }: ImagePreloaderProps) {
  useEffect(() => {
    const imageUrls = [
      // Icons
      '/icons/21A.png',
      '/icons/21B.png',
      '/icons/21C.png',
      '/icons/25A.png',
      '/icons/28A.png',
      '/icons/28B.png',
      '/icons/28D.jpg',
      '/icons/28c.png',
      '/icons/38c.png',
      '/icons/Gruppe 294.png',
      '/icons/RRR21.png',
      '/icons/sglti.png',
      '/icons/heart_gray.png',
      '/icons/heart_red.png',
      '/icons/i.png',
      '/icons/sheet_brown.png',
      '/icons/sheet_green.png',
      '/icons/sheet_yellow.png',

      // Step images
      '/next-steps/joana/final/step1.png',
      '/next-steps/joana/final/step2.png',
      '/next-steps/joana/final/step3.png',
      '/next-steps/joana/final/step4.png',
      '/next-steps/joana/final/step5.png',
      '/next-steps/joana/final/step6.png',
      '/next-steps/joana/final/step7.png',
      '/next-steps/joana/final/step8.png',
      '/next-steps/joana/final/step9.png',

      '/next-steps/robert/final/step1.png',
      '/next-steps/robert/final/step2.png',
      '/next-steps/robert/final/step3.png',
      '/next-steps/robert/final/step4.png',
      '/next-steps/robert/final/step5.png',
      '/next-steps/robert/final/step6.png',
      '/next-steps/robert/final/step7.png',
      '/next-steps/robert/final/step8.png',
      '/next-steps/robert/final/step9.png',

      '/next-steps/linda/final/step1.png',
      '/next-steps/linda/final/step2.png',
      '/next-steps/linda/final/step3.png',
      '/next-steps/linda/final/step4.png',
      '/next-steps/linda/final/step5.png',
      '/next-steps/linda/final/step6.png',
      '/next-steps/linda/final/step7.png',
      '/next-steps/linda/final/step8.png',
      '/next-steps/linda/final/step9.png',



      // Guidelines
      '/guidelines.png',

      // 3D Heart
      '/3d-heart.png',

      // Arrows
      '/arrow-gray.svg',
      '/arrow-yellow-blur.svg',
      '/restart-icon.svg',

      // Backgrounds
      '/backgrounds/01C.jpg',
      '/backgrounds/01B.jpg',
      '/backgrounds/01C.jpg',
      '/backgrounds/02A.jpg',
      '/backgrounds/02B.jpg',
      '/backgrounds/02C.jpg',
      '/backgrounds/03A.jpg',
      '/backgrounds/03B.jpg',
      '/backgrounds/03C.jpg',
      '/background-1.jpg',
      '/background-2.jpg',
      '/background.jpg',

      // Overlays
      '/overlays/01.png',
      '/overlays/01A.png',
      '/overlays/01B.png',
      '/overlays/02.png',
      '/overlays/02A.png',
      '/overlays/03A.png',
      '/overlays/03B.png',
      '/overlays/03C.png',

      // Patient images (if any)
      '/linda.png',
      '/Card-Man_A_20241028.png',
      '/characters/03B.png',

      // Character images
      '/characters/01.png',
      '/characters/02.png',
      '/characters/01A.png',
      '/characters/01B.png',
      '/characters/02A.png',
      '/characters/02B.png',
      '/characters/03B.png',
      '/characters/03C.png',

      '/joana-3d.png',
      '/linda-3d.png',
      '/robert-3d.png',
      '/godmode-joana-next.png',
      '/godmode-linda-next.png',
      '/godmode-lock.png',
      '/godmode-robert-next.png',
      



      '/250819_ScreensaverFINAL_1920x1080.mp4',
      '/250819_ScreensaverFINAL_2560x1280px.mp4'

      
    ];

    let loaded = 0;
    const total = imageUrls.length;
    
    // Initial progress callback
    onProgress?.(0, total);
    onLoadingChange?.(true);

    // Preload all media files (images and videos)
    const promises = imageUrls.map(url => {
      return new Promise<void>((resolve) => {
        const handleLoad = () => {
          loaded++;
          onProgress?.(loaded, total);
          if (loaded === total) {
            onLoadingChange?.(false);
          }
          resolve();
        };

        // Check if it's a video file
        if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')) {
          const video = document.createElement('video');
          video.preload = 'auto';
          
          video.oncanplaythrough = handleLoad;
          video.onerror = () => {
            console.log(`Failed to preload video: ${url}`);
            handleLoad();
          };
          
          video.src = url;
        } else {
          // Handle as image
          const img = new Image();
          
          img.onload = handleLoad;
          img.onerror = () => {
            console.log(`Failed to preload image: ${url}`);
            handleLoad();
          };
          
          img.src = url;
        }
      });
    });

    Promise.all(promises);
  }, []); // Empty dependency array - only run once on mount

  return null; // This component doesn't render anything
}