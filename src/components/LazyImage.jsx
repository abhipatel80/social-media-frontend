import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const LazyImage = ({ src, alt, className }) => {
  return (
    <div>
      <LazyLoadImage
        alt={alt}
        src={src}
        className={className}
      />
    </div>
  );
};

export default LazyImage;
