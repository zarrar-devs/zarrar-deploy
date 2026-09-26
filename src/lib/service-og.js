import { ImageResponse } from "next/og";
import { BRAND } from "./site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function renderServiceOgImage(service) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          color: "#fff",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 700, letterSpacing: 4 }}>
          {BRAND.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div style={{ display: "flex", fontSize: 62, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {service.socialTitle.replace(" | Zarrar", "")}
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 26, color: "#b8b8b8", lineHeight: 1.35 }}>
            {service.description}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 25, color: "#bf4f2c" }}>
          Zarrar · {service.eyebrow.replace(/-/g, " ")}
        </div>
      </div>
    ),
    size,
  );
}
