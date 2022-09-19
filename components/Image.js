import * as React from "react";

export default function Image({ src, alt, width = `100px`, height = `100px` }) {
  return (
    <picture>
      <source srcSet="" type="image/avif" />
      <source srcSet="" type="image/webp" />
      <img src={src} alt={alt} width={width} height={height} />
    </picture>
  );
}
