// src/app/api/downloadQrZip/route.ts
import { NextResponse } from 'next/server';
import JSZip from 'jszip';

interface QRDataUrl {
    id: number;
    dataUrl: string;
}

export async function POST(request: Request) {
    const { qrDataUrls }: { qrDataUrls: QRDataUrl[] } = await request.json();
    const zip = new JSZip();

    qrDataUrls.forEach(({ id, dataUrl }) => {
        const imgData = dataUrl.replace(/^data:image\/png;base64,/, '');
        const imgBuffer = Buffer.from(imgData, 'base64');
        zip.file(`qr-code-${id}.png`, imgBuffer);
    });

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // Set headers for zip file download
    return new NextResponse(zipBuffer, {
        status: 200,
        headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename="qr-codes.zip"',
        },
    });
}
