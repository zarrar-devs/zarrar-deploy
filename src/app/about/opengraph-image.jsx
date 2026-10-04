import { ImageResponse } from "next/og";
import { OgMark, BRAND_RED } from "@/lib/og-mark";
import { BRAND } from "@/lib/site";
import { FOUNDER } from "./about-data";

export const alt = "About Zarrar: the founder and CEO behind the web development and lead generation agency";
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
        <div style={{ ...row, alignItems: "center", gap: 20, fontSize: 34, fontWeight: 700, letterSpacing: 4 }}>
          <OgMark size={56} tile="#232326" />
          <span>{BRAND.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 82, fontWeight: 700, lineHeight: 1.04, letterSpacing: -3, maxWidth: 1000 }}>
          <div style={row}>A founder-led agency.</div>
          <div style={{ ...row, color: BRAND_RED }}>{FOUNDER.title}: {FOUNDER.name}.</div>
        </div>
        <div style={{ ...row, fontSize: 27, color: "#a8a8a8" }}>
          Web development · Lead generation · Cold email · Social media
        </div>
      </div>
    ),
    { ...size }
  );
}
