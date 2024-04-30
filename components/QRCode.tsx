'use client';

import { useQRCode } from 'next-qrcode';

export default function QRCode(
    { url }: { url: string }
) {

    const { Canvas } = useQRCode();

    return (
        <div className="mt-10">
            <Canvas
                text={url}
                options={{
                    errorCorrectionLevel: 'M',
                    margin: 0,
                    scale: 3,
                    width: 150,
                    color: {
                        dark: '#14532d',
                        light: '#4ade80',
                    }
                }}
            />
        </div>
    )
}
