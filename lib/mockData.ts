import { Device } from "@/types/device";

export const MOCK_DEVICES: Device[] = [
  {
    id: "1",
    name: "Core-Switch-01",
    ip: "192.168.1.1",
    status: "Online",
    lastPing: "۲ دقیقه پیش",
  },
  {
    id: "2",
    name: "Edge-Router",
    ip: "10.0.0.1",
    status: "Warning",
    lastPing: "۱۵ دقیقه پیش",
  },
  {
    id: "3",
    name: "Storage-NAS",
    ip: "192.168.1.50",
    status: "Offline",
    lastPing: "۲ ساعت پیش",
  },
  {
    id: "4",
    name: "Backup-Server",
    ip: "192.168.2.10",
    status: "Online",
    lastPing: "همین حالا",
  },
];
