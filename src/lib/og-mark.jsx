/* The Zarrar Z monogram as inline SVG, so next/og (satori) can draw it
   inside generated share cards and the footer can reuse it.

   Geometry is copied from src/app/icon1.svg (the favicon): white top
   and bottom bars, red gradient slash, near-black tile. If the logo
   ever changes, update icon1.svg, public/logo/* and this file together.

   `tile` is optional. Without it the tile uses the logo's own
   near-black gradient. On dark cards pass a flat, slightly lighter
   colour (e.g. "#232326") so the tile doesn't vanish into the card. */

export const BRAND_RED = "#FF4B3E";

export function OgMark({ size = 48, tile }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512">
      <defs>
        <radialGradient id="ogm-bg" cx="25%" cy="15%" r="95%">
          <stop offset="0" stopColor="#1C1C1E" />
          <stop offset="1" stopColor="#0A0A0A" />
        </radialGradient>
        <linearGradient id="ogm-z" gradientUnits="userSpaceOnUse" x1="330" y1="30" x2="40" y2="300">
          <stop offset="0" stopColor="#FF4B3E" />
          <stop offset="1" stopColor="#D01C12" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="116" fill={tile || "url(#ogm-bg)"} />
      <g transform="translate(91 125.737) scale(0.8684)">
        <path d="M0 15Q0 0 15 0L265 0Q280 0 280 11L280 11Q280 22 269.39 32.61L228.61 73.39Q218 84 203 84L15 84Q0 84 0 69Z" fill="#FFFFFF" />
        <path d="M215.39 226.61Q226 216 241 216L325 216Q340 216 340 231L340 285Q340 300 325 300L179 300Q164 300 164 289L164 289Q164 278 174.61 267.39Z" fill="#FFFFFF" />
        <path d="M317.39 2.61Q328 -8 338.61 2.61L369.39 33.39Q380 44 369.39 54.61L126.61 297.39Q116 308 105.39 297.39L74.61 266.61Q64 256 74.61 245.39Z" fill="url(#ogm-z)" />
      </g>
    </svg>
  );
}
