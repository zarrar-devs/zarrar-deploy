import { ImageResponse } from "next/og";
import { OgMark } from "@/lib/og-mark";

/* Social share card for /authors. Generated at build time, so there is
   no PNG to design, host or forget to upload. (The route used to point
   at /og/authors.png, which was never in public/ — broken preview on
   every share.) */

export const alt = "Zarrar for authors: website development, lead generation, cold email outreach and social media";
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
          <span>Zarrar for authors</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: -3,
            textTransform: "uppercase",
          }}
        >
          <div style={line}>Build a home</div>
          <div style={line}>for your books.</div>
          <div style={{ ...line, color: "#5b3df5" }}>Reach the right</div>
          <div style={{ ...line, color: "#5b3df5" }}>people.</div>
        </div>

        <div style={{ ...line, fontSize: 28, color: "#565144" }}>
          Website, lead generation, cold email outreach and social media for authors
        </div>
      </div>
    ),
    { ...size }
  );
}
