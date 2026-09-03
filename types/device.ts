export type DeviceStatus = "Online" | "Offline" | "Warning";

export type Device = {
  id: string;
  name: string;
  ip: string;
  status: DeviceStatus;
  lastPing: string;
};

export type DeviceFormData = {
  name: string;
  ip: string;
  status: DeviceStatus;
};
