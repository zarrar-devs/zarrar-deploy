import { serviceByPath, serviceMetadata, serviceJsonLd } from "@/lib/service-pages";
import ServicePage from "@/app/ServicePage";
import { serviceFontClasses } from "@/lib/service-fonts";
import { safeJsonLd } from "@/lib/site";

const service = serviceByPath("/web-development");

export const metadata = serviceMetadata(service);

const jsonLd = serviceJsonLd(service);

export default function Page() {
  return (
    <div className={serviceFontClasses} data-service={service.path}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <ServicePage service={service} />
    </div>
  );
}
