import { renderServiceOgImage, size, contentType } from "@/lib/service-og";
import { serviceByPath } from "@/lib/service-pages";

export { size, contentType };
export const alt = "cold email outreach service by Zarrar";

export default function Image() {
  return renderServiceOgImage(serviceByPath("/cold-email-outreach"));
}
