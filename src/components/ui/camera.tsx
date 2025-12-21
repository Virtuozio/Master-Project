import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { type RecognitionResult } from '@/api/common/object-detection';

type OverlayProps = {
  result: RecognitionResult | null;
  isLive: boolean;
};

export const LiveOverlay = ({ result, isLive }: OverlayProps) => {
  if (!result || !isLive) return null;

  return (
    <View className="absolute inset-x-4 top-20 items-center">
      <View className="rounded-full border border-white bg-green-500/80 px-6 py-2 shadow-md">
        <Text className="text-xl font-bold text-white">
          {result.label} {(result.confidence * 100).toFixed(0)}%
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
      className={`size-20 items-center justify-center rounded-full border-4 ${
        isLive ? 'border-red-500 bg-red-500/20' : 'border-white bg-white/20'
      }`}
    >
      {isProcessing && isLive ? (
        <ActivityIndicator color={isLive ? 'red' : 'white'} />
      ) : (
        <View
          className={`rounded-full ${
            isLive ? 'size-8 bg-red-500' : 'size-16 bg-white'
          }`}
        />
      )}
    </TouchableOpacity>
    <Text className="mt-4 font-semibold text-white shadow-black">
      {isLive ? 'STOP SCAN' : 'START LIVE'}
    </Text>
  </View>
);
