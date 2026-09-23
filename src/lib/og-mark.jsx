/* The Zarrar Z monogram, drawn as inline SVG so next/og (satori) can
   render it inside generated share cards. Same geometry as
   src/app/icon.svg — change the mark there and here together.

   `tile` is the rounded-square colour. Use the default on light cards;
   on dark cards pass a slightly lighter tile so the mark doesn't
   disappear into the background. */
export function OgMark({ size = 48, tile = "#0b0b0c" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512">
      <rect width="512" height="512" rx="116" fill={tile} />
      <g transform="translate(256 256) scale(1.32) translate(-256 -256)">
        <path d="M128 132H384V184H128Z" fill="#f2eee3" />
        <path d="M128 328H384V380H128Z" fill="#f2eee3" />
        <path d="M301 183.5H384L211 328.5H128Z" fill="#bf4f2c" />
      </g>
    </svg>
  );
}
