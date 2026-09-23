import { ImageResponse } from "next/og";
import { OgMark } from "@/lib/og-mark";
import { BRAND } from "@/lib/site";

export const alt =
  "Zarrar services: website development, lead generation, cold email outreach and social media management";
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
          background: "#f2eee3",
          color: "#101010",
          padding: 72,
        }}
      >
        <div
          style={{ ...row, alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700, color: "#5b3df5" }}
        >
          <OgMark size={52} />
          <span>{BRAND} — services</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 0.98,
            letterSpacing: -3,
            textTransform: "uppercase",
          }}
        >
          <div style={row}>Get found.</div>
          <div style={{ ...row, color: "#5b3df5" }}>Get booked.</div>
        </div>
        <div style={{ ...row, fontSize: 27, color: "#565144" }}>
          Web development · Lead generation · Cold email · Social media
        </div>
      </div>
    ),
    { ...size }
  );
}
