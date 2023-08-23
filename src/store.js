import { create } from "zustand";
const tourStore = (set) => ({
  name: "Hello world",
  changeName: (val) => set((state) => ({ name: state.name + val })),
});
export const useTourStore = create(tourStore);
