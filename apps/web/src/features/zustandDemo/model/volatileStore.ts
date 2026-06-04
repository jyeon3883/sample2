import { create } from "zustand";

interface VolatileState {
  count: number;
  message: string;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setMessage: (msg: string) => void;
}

export const useVolatileStore = create<VolatileState>((set) => ({
  count: 0,
  message: "",
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0, message: "" }),
  setMessage: (msg) => set({ message: msg }),
}));
