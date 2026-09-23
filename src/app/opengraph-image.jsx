import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/site";

export const alt =
  "Zarrar — website development, lead generation, cold email outreach and social media management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const row = { display: "flex" };

export default function OgImage() {
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
          color: "#ffffff",
          padding: 72,
        }}
      >
        <div style={{ ...row, fontSize: 34, fontWeight: 700, letterSpacing: 4 }}>
          {BRAND.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: -3,
            maxWidth: 1000,
          }}
        >
          <div style={row}>Websites that rank.</div>
          <div style={{ ...row, color: "#bf4f2c" }}>Outreach that books.</div>
        </div>
        <div style={{ ...row, fontSize: 27, color: "#a8a8a8" }}>
          Web development · Lead generation · Cold email · Social media
        </div>
      </div>
    ),
    { ...size }
  );
}
