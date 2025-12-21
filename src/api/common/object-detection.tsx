// Це "Fake" сервіс. Саме тут у майбутньому буде завантаження моделі TensorFlow
// import * as tf from '@tensorflow/tfjs';
// import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

export type RecognitionResult = {
  label: string;
  confidence: number;
};

// Симуляція затримки розпізнавання
const MOCK_DELAY = 1000;

export const detectObject = async (
  imageUri: string
): Promise<RecognitionResult> => {
  // Тут має бути логіка:
  // 1. Resize image
  // 2. Convert to Tensor
  // 3. model.predict(tensor)

  console.log(`Analyzing image at: ${imageUri}`);

  // Імітуємо роботу нейромережі
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  // Повертаємо рандомний результат для демонстрації UI
  const mockObjects = [
    'Cat 🐱',
    'Laptop 💻',
    'Coffee ☕',
    'Plant 🌿',
    'Code 🚀',
  ];
  const randomObj = mockObjects[Math.floor(Math.random() * mockObjects.length)];
  const randomConf = (Math.random() * (0.99 - 0.7) + 0.7).toFixed(2);

  return {
    label: randomObj,
    confidence: Number(randomConf),
  };
};
