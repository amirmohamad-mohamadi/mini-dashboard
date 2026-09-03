import { z } from "zod";

const ipv4Regex =
  /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;

export const deviceSchema = z.object({
  name: z.string().min(1, "نام دستگاه الزامی است"),
  ip: z.string().regex(ipv4Regex, "آدرس IPv4 معتبر نیست"),
  status: z.enum(["Online", "Offline", "Warning"]),
});

export type DeviceFormSchema = z.infer<typeof deviceSchema>;
