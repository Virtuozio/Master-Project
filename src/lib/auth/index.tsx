import { create } from 'zustand';

import {
  detectObject,
  type RecognitionResult,
} from '@/api/common/object-detection';

import { createSelectors } from '../utils';
import type { TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';

interface CameraState {
  hasPermission: boolean | null;
  isProcessing: boolean;
  isLiveMode: boolean; // Новий прапорець для Real-Time
  lastResult: RecognitionResult | null;

  setPermission: (status: boolean) => void;
  toggleLiveMode: (status: boolean) => void;
  analyzeImage: (imageUri: string) => Promise<void>;
  reset: () => void;
}

export const useCameraStore = create<CameraState>((set, get) => ({
  hasPermission: null,
  isProcessing: false,
  isLiveMode: false,
  lastResult: null,

  setPermission: (status) => set({ hasPermission: status }),

  toggleLiveMode: (status) => {
    set({ isLiveMode: status });
    if (!status) {
      set({ isProcessing: false }); // Скидаємо обробку при вимиканні
    }
  },

  analyzeImage: async (imageUri) => {
    // Якщо вже йде обробка в Live режимі - пропускаємо кадр (Debounce)
    if (get().isProcessing && get().isLiveMode) return;

    set({ isProcessing: true });
    try {
      const result = await detectObject(imageUri);
      // Оновлюємо результат, тільки якщо ми все ще в тому ж режимі
      if (get().isLiveMode || !get().lastResult) {
        set({ lastResult: result, isProcessing: false });
      }
    } catch (error) {
      console.error('Detection failed', error);
      set({ isProcessing: false });
    }
  },

  reset: () =>
    set({ lastResult: null, isProcessing: false, isLiveMode: false }),
}));
interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (data: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  signIn: (token) => {
    setToken(token);
    set({ status: 'signIn', token });
  },
  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      // only to remove eslint error, handle the error properly
      console.error(e);
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();
