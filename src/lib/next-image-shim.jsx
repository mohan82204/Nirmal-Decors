// Shim for next/image — makes the original CutoutCard component work in Vite/React
// without any changes to the component source.
import React from "react";

const Image = ({
  src,
  alt = "",
  fill,
  sizes: _sizes,
  className,
  priority: _priority,
  quality: _quality,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  ...rest
}) => {
  const style = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
    : undefined;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
    />
  );
};

export default Image;
