import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { type RecognitionResult } from '@/api/common/object-detection';

type OverlayProps = {
  result: RecognitionResult | null;
  isLive: boolean;
};

// Функція для визначення кольору залежно від типу знаку
const getSignColor = (label: string) => {
  if (label.includes('STOP') || label.includes('LIMIT') || label.includes('NO'))
    return 'border-red-600';
  if (label.includes('YIELD') || label.includes('PEDESTRIAN'))
    return 'border-yellow-500';
  return 'border-blue-500';
};

export const LiveOverlay = ({ result, isLive }: OverlayProps) => {
  if (!result || !isLive) return null;

  const borderColor = getSignColor(result.label);

  return (
    <View className="absolute inset-x-4 top-10 items-center">
      {/* Імітація дорожнього знаку */}
      <View
        className={`size-32 rounded-full border-[6px] bg-white ${borderColor} items-center justify-center shadow-lg`}
      >
        <Text className="text-center text-lg font-extrabold leading-5 text-black">
          {result.label.replace(' ', '\n')}
        </Text>
      </View>

      {/* Рівень впевненості */}
      <View className="mt-2 rounded-md bg-black/60 px-3 py-1">
        <Text className="font-mono text-xs text-white">
          CONFIDENCE: {(result.confidence * 100).toFixed(0)}%
        </Text>
      </View>
    </View>
  );
};

type ControlsProps = {
  isLive: boolean;
  onToggle: () => void;
  isProcessing: boolean;
};

export const CameraControls = ({
  isLive,
  onToggle,
  isProcessing,
}: ControlsProps) => (
  <View className="absolute bottom-10 w-full items-center">
    <TouchableOpacity
      onPress={onToggle}
      className={`size-24 items-center justify-center rounded-full border-4 shadow-lg ${
        isLive ? 'border-red-500 bg-white' : 'border-white bg-white/20'
      }`}
    >
      {isProcessing && isLive ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <View
          className={`rounded bg-red-600 ${
            isLive ? 'size-8 rounded-sm' : 'size-20 rounded-full'
          }`}
        />
      )}
    </TouchableOpacity>
    <View className="mt-4 rounded-full bg-black/50 px-4 py-1">
      <Text className="text-xs font-bold tracking-widest text-white">
        {isLive ? 'SYSTEM ACTIVE' : 'START ADAS'}
      </Text>
    </View>
  </View>
);
