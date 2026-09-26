import { ImageResponse } from "next/og";
import { OgMark } from "@/lib/og-mark";

/* Social share card for /real-estate (used by Open Graph; copy this
   file to twitter-image.jsx too if a platform doesn't pick it up). */

export const alt = "Zarrar for real estate agents: website development, local SEO, lead generation and social media";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const line = { display: "flex" };

export default function Image() {
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
          style={{ ...line, alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700, color: "#5b3df5" }}
        >
          <OgMark size={52} />
          <span>Zarrar for real estate agents</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: -3,
            textTransform: "uppercase",
          }}
        >
          <div style={line}>Get found</div>
          <div style={{ ...line, color: "#5b3df5" }}>locally.</div>
          <div style={line}>Turn visits into</div>
          <div style={line}>enquiries.</div>
        </div>

        <div style={{ ...line, fontSize: 28, color: "#565144" }}>
          Website, local SEO, lead generation and social media for real estate agents
        </div>
      </div>
    ),
    { ...size }
  );
}
