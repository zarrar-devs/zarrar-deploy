import { ImageResponse } from "next/og";
import { OgMark } from "@/lib/og-mark";

/* Social share card for /authors. Generated at build time, so there is
   no PNG to design, host or forget to upload. (The route used to point
   at /og/authors.png, which was never in public/ — broken preview on
   every share.) */

export const alt = "Zarrar for authors: you wrote the book, we build its audience";
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
          <div style={line}>You wrote</div>
          <div style={line}>the book.</div>
          <div style={{ ...line, color: "#5b3df5" }}>We build its</div>
          <div style={{ ...line, color: "#5b3df5" }}>audience.</div>
        </div>

        <div style={{ ...line, fontSize: 28, color: "#565144" }}>
          Website, outreach and social media for authors
        </div>
      </div>
    ),
    { ...size }
  );
}
