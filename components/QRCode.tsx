"use client";

import { useQRCode } from "next-qrcode";

export default function QRCode({ url }: { url: string }) {
  const { Canvas } = useQRCode();

  return (
    <div className="w-full max-w-[300px] aspect-square mx-auto">
      <Canvas
        text={url}
        options={{
          errorCorrectionLevel: "M",
          margin: 0,
          scale: 3,
          width: 300,
          color: {
            dark: "#14532d",
            light: "#4ade80",
          },
        }}
      />
    </div>
  );
}
