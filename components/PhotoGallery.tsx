'use client';

// import "~react-image-gallery/styles/scss/image-gallery.scss";
// import "~react-image-gallery/styles/css/image-gallery.css";
// import "react-image-gallery/styles/css/image-gallery.css";

import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";


interface PhotoGalleryProps {
    images: ReactImageGalleryItem[];
}


export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
    // const images = imageLinks.map(link => ({
    //     original: link,
    //     thumbnail: link,
    // }));

    return (
        <>
            <div id='gallery'>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Image Gallery.</h2>
                    <div
                        className="mt-8"
                    >
                        < ImageGallery
                            thumbnailPosition="bottom"
                            items={images}
                        />;
                    </div>
                </div>
            </div>
        </>
    )
}
