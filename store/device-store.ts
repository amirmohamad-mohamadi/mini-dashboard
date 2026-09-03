import { create } from "zustand";
import { type Device } from "@/types/device";
import { MOCK_DEVICES } from "@/lib/mock-data";

type DeviceStore = {
  devices: Device[];
  addDevice: (device: Device) => void;
  removeDevice: (id: string) => void;
};

export const useDeviceStore = create<DeviceStore>((set) => ({
  devices: MOCK_DEVICES,
  addDevice: (device) =>
    set((state) => ({ devices: [device, ...state.devices] })),
  removeDevice: (id) =>
    set((state) => ({ devices: state.devices.filter((d) => d.id !== id) })),
}));
