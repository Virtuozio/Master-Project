import { type CameraView } from 'expo-camera';
import { useEffect, useRef } from 'react';

import { useCameraStore } from '@/lib/auth';

// Інтервал між кадрами (мс). 500мс = 2 кадри/сек.
// Для емулятора це оптимально, щоб не перегріти процесор.
const SCAN_INTERVAL = 1000;

export const useCameraScanner = () => {
  const cameraRef = useRef<CameraView>(null);
  const { isLiveMode, analyzeImage, isProcessing } = useCameraStore();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const captureFrame = async () => {
    if (cameraRef.current && !isProcessing) {
      try {
        // base64: true не потрібен для фейкового API, але знадобиться для TFJS
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.3, // Низька якість для швидкості
          skipProcessing: true, // Пропускаємо обробку Android для швидкості
        });

        if (photo?.uri) {
          await analyzeImage(photo.uri);
        }
      } catch (e) {
        console.log('Frame skip', e);
      }
    }
  };

  useEffect(() => {
    if (isLiveMode) {
      timerRef.current = setInterval(
        captureFrame as unknown as TimerHandler,
        SCAN_INTERVAL
      );
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLiveMode]);

  return { cameraRef };
};
