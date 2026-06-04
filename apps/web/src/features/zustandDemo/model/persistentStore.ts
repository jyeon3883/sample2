import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersistentState {
  count: number;
  message: string;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setMessage: (msg: string) => void;
}

export const usePersistentStore = create<PersistentState>()(
  persist(
    (set) => ({
      count: 0,
      message: "",
      increment: () => set((s) => ({ count: s.count + 1 })),
      decrement: () => set((s) => ({ count: s.count - 1 })),
      reset: () => set({ count: 0, message: "" }),
      setMessage: (msg) => set({ message: msg }),
    }),
    { name: "zustand-demo-persistent" },
  ),
);
