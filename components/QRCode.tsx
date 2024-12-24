"use client";

import { useQRCode } from "next-qrcode";

export default function QRCode({ url }: { url: string }) {
  const { SVG } = useQRCode();

  return (
    <div className="w-40 border border-[#202020] p-4 mt-2">
      <SVG
        text={url}
        options={{
          margin: 0,
          width: 20,
          color: {
            dark: "#0FA711",
            light: "#000000",
          },
        }}
      />
    </div>
  );
}
