"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Device, type DeviceFormData } from "@/types/device";
import { useDeviceStore } from "@/store/device-store";
import { log } from "console";

const fetchDevices = async (): Promise<Device[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return useDeviceStore.getState().devices;
};

export function useDevices() {
  const queryClient = useQueryClient();
  const { devices, addDevice, removeDevice } = useDeviceStore();

  const query = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
    initialData: devices,
  });

  const addMutation = useMutation({
    mutationFn: async (data: DeviceFormData) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newDevice: Device = {
        id: String(Date.now()),
        name: data.name,
        ip: data.ip,
        status: data.status,
        lastPing: "همین حالا",
      };
      addDevice(newDevice);
      return newDevice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      removeDevice(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });

  return {
    devices: query.data || [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    addDevice: addMutation.mutateAsync,
    isAdding: addMutation.isPending,
    deleteDevice: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
