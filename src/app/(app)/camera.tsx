import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import {
  CameraControls,
  FocusAwareStatusBar,
  LiveOverlay,
  SafeAreaView,
} from '@/components/ui';
import { useCameraStore } from '@/lib/auth';
import { useCameraScanner } from '@/lib/hooks';

export default function SmartCameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const {
    setPermission,
    isLiveMode,
    toggleLiveMode,
    lastResult,
    isProcessing,
  } = useCameraStore();

  // Підключаємо наш хук логіки
  const { cameraRef } = useCameraScanner();

  useEffect(() => {
    if (permission) setPermission(permission.granted);
  }, [permission, setPermission]);

  if (!permission?.granted) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white p-6">
        <Text className="mb-6 text-center text-lg text-gray-800">
          Для роботи AI-сканера необхідний доступ до камери
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="rounded-full bg-black px-8 py-4"
        >
          <Text className="font-bold text-white">Надати доступ</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleToggle = () => toggleLiveMode(!isLiveMode);

  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex-1 bg-black">
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back">
          <SafeAreaView className="relative flex-1">
            {/* Статус бар режиму */}
            <View className="items-end p-4">
              <View className="rounded-lg bg-black/50 px-3 py-1">
                <Text className="font-mono text-xs text-white">
                  MODE: {isLiveMode ? 'REAL-TIME ⚡' : 'STANDBY'}
                </Text>
              </View>
            </View>

            {/* Оверлей з результатом розпізнавання */}
            <LiveOverlay result={lastResult} isLive={isLiveMode} />

            {/* Кнопки керування */}
            <CameraControls
              isLive={isLiveMode}
              onToggle={handleToggle}
              isProcessing={isProcessing}
            />
          </SafeAreaView>
        </CameraView>
      </View>
    </>
  );
}
