import { renderServiceOgImage, size, contentType } from "@/lib/service-og";
import { serviceByPath } from "@/lib/service-pages";

export { size, contentType };
export const alt = "social media management service by Zarrar";

export default function Image() {
  return renderServiceOgImage(serviceByPath("/social-media-management"));
}
