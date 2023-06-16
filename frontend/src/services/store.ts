import { create } from "zustand";

interface DroneStore {
  droneState: string;
  setDroneState: (state: string) => void;
}

const useDroneStore = create<DroneStore>((set) => ({
  droneState: "landed",
  setDroneState: (state: string) => set({ droneState: state }),
}));

export default useDroneStore;
