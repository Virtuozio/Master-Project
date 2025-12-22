export type RecognitionResult = {
  label: string;
  confidence: number;
};

// Імітуємо швидку роботу нейромережі (швидше ніж 1с для плавності)
const MOCK_DELAY = 600;

const TRAFFIC_SIGNS = [
  'STOP',
  'SPEED LIMIT 50',
  'SPEED LIMIT 90',
  'YIELD',
  'NO ENTRY',
  'PEDESTRIAN',
  'PARKING',
];

export const detectObject = async (
  _imageUri: string
): Promise<RecognitionResult> => {
  // Тут в майбутньому буде:
  // const tensor = decodeJpeg(imageUri);
  // const prediction = await trafficSignModel.predict(tensor);

  // Імітація обробки
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  // Логіка для демо: повертаємо випадковий знак
  const randomSign =
    TRAFFIC_SIGNS[Math.floor(Math.random() * TRAFFIC_SIGNS.length)];
  const randomConf = (Math.random() * (0.99 - 0.85) + 0.85).toFixed(2);

  return {
    label: randomSign,
    confidence: Number(randomConf),
  };
};
