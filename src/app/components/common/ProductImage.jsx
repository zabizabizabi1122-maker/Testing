"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductImage({ src, alt, className, sizes, priority = false }) {
  const [failed, setFailed] = useState(false);
  const usingFallback = failed || !src;
  const imageSrc = usingFallback ? "/images/product-placeholder.svg" : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      unoptimized
      onError={() => {
        if (!usingFallback) setFailed(true);
      }}
      className={className}
    />
  );
}
