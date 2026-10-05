import { Globe, Lightbulb, Megaphone, Palette, type LucideIcon } from "lucide-react";
import type { ServiceId } from "@/data/services";

const icons: Record<ServiceId, LucideIcon> = {
  customers: Megaphone,
  presence: Globe,
  professional: Palette,
  ideas: Lightbulb,
};

export function ServiceIcon({ id, size = 22 }: { id: ServiceId; size?: number }) {
  const Icon = icons[id];
  return <Icon size={size} strokeWidth={1.75} aria-hidden="true" />;
}
