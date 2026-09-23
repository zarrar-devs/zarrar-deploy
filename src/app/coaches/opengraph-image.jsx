import { ImageResponse } from "next/og";
import { OgMark } from "@/lib/og-mark";

/* Social share card for /coaches. This route had no OG image at all —
   every share previously fell back to the site-wide default, which
   named none of the coaching-specific messaging. */

export const alt = "Zarrar for coaches: a website and pipeline that books discovery calls";
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
          <span>Zarrar for coaches</span>
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
          <div style={line}>More calls</div>
          <div style={{ ...line, color: "#5b3df5" }}>booked.</div>
        </div>

        <div style={{ ...line, fontSize: 28, color: "#565144" }}>
          Website, SEO and lead generation for coaches
        </div>
      </div>
    ),
    { ...size }
  );
}
