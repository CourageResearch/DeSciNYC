"use client";

import Image from "next/image";
import { useState } from "react";

const StoreGalleryComponent = () => {
  const [selectedImage, setSelectedImage] = useState("/images/t-shirt.png");

  const images = ["/images/t-shirt.png", "/images/t_shirt_back.webp"];

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full md:w-2/5">
      <Image
        src={selectedImage}
        alt="Product Image"
        width={400}
        height={400}
        className="border border-[#202020] p-4"
      />
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Product Image ${index + 1}`}
            width={200}
            height={200}
            className={`border border-[#202020] p-4 cursor-pointer ${
              selectedImage === image ? "border-[#0FA711]" : ""
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreGalleryComponent;
