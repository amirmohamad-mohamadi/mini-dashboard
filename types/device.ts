export type DeviceStatus = "Online" | "Offline" | "Warning";

export interface Device {
  id: string;
  name: string;
  ip: string;
  status: DeviceStatus;
  lastPing: string;
}

export type Filters = {
  search: string;
  status: DeviceStatus | "All";
};
