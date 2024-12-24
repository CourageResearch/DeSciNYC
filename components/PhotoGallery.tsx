"use client";

import Heading from "./ui/heading";
import "react-image-gallery/styles/css/image-gallery.css";
import dynamic from "next/dynamic";
import Image from "next/image";

const ImageGallery = dynamic(() => import("react-image-gallery"), {
  ssr: false,
});

const PhotoGallery = ({
  images,
}: {
  images: { original: string; thumbnail: string }[];
}) => {
  return (
    <div
      className="flex flex-col gap-4 pb-20 md:pb-40 px-4 md:px-0"
      id="gallery"
    >
      <Heading title="Photo Gallery" />
      <div className="flex flex-col gap-4">
        <ImageGallery
          thumbnailPosition="bottom"
          items={images}
          useBrowserFullscreen={false}
          showPlayButton={false}
          showFullscreenButton={false}
          additionalClass="image-gallery-custom"
          renderItem={(item) => (
            <div className="aspect-video w-full relative">
              <Image
                src={item.original as string}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          )}
          renderThumbInner={(item) => (
            <div className="aspect-video w-full relative">
              <Image
                src={item.thumbnail as string}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default PhotoGallery;
