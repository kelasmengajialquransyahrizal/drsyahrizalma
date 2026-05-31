"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { imagesConfig } from "@/lib/data";

interface Props extends Omit<ImageProps, "src"> {
  imageKey: keyof typeof imagesConfig;
  fallbackSrc: string;
}

export default function DynamicImage({ imageKey, fallbackSrc, ...props }: Props) {
  const [src, setSrc] = useState(fallbackSrc);

  useEffect(() => {
    const saved = localStorage.getItem("siteImages");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed[imageKey]) {
          setSrc(parsed[imageKey]);
        }
      } catch(e) {}
    }
  }, [imageKey]);

  return <Image src={src} {...props} />;
}
