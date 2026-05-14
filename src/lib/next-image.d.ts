// Shim type declaration for next/image so cutout-card.tsx compiles in a Vite project.
// The actual runtime module is resolved via the Vite alias in vite.config.js.
declare module "next/image" {
  import * as React from "react";

  export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | { src: string; height: number; width: number; blurDataURL?: string };
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    quality?: number | string;
    priority?: boolean;
    placeholder?: "blur" | "empty" | `data:image/${string}`;
    blurDataURL?: string;
    unoptimized?: boolean;
    onLoadingComplete?: (img: HTMLImageElement) => void;
  }

  const Image: React.FC<ImageProps>;
  export default Image;
}
