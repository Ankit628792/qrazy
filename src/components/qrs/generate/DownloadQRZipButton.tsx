import React, { useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { QRCode } from 'react-qrcode-logo';
import JSZip from 'jszip';
import { productQRList } from './constant';
import { showInfo } from '@/lib';

interface ProductQRList {
    productId: string;
    productTitle: string;
    qrs: string[];
}

interface Props {
    qrList?: ProductQRList[];
    text: string;
}

const DownloadQrZipButton: React.FC<Props> = ({ qrList = productQRList, text }) => {
    const qrRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [loading, setLoading] = useState(false);

    const generateQrDataUrls = async (index: number) => {
        const canvases = qrRefs.current[index]?.querySelectorAll('canvas');
        const dataUrls: { id: string; url: string }[] = [];

        if (canvases) {
            for (let i = 0; i < canvases.length; i++) {
                const canvas = canvases[i] as HTMLCanvasElement; // Cast to HTMLCanvasElement
                dataUrls.push({ id: canvas.id, url: canvas.toDataURL('image/png') });
            }
        }

        return dataUrls;
    };

    const handleDownloadZip = async () => {
        const zip = new JSZip();

        try {
            for (let i = 0; i < qrList.length; i++) {
                const product = qrList[i];
                const folder = zip.folder(product.productTitle); // Create folder for each product

                if (folder) {
                    const dataUrls = await generateQrDataUrls(i);
                    dataUrls.forEach((data) => {
                        const base64Data = data.url.split(',')[1]; // Extract base64 data
                        folder.file(`${data.id}.png`, base64Data, { base64: true }); // Add to the folder
                    });
                }
            }

            // Generate the zip file and trigger the download
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, 'qr-codes.zip'); // Download the zip
        } catch (error) {
            console.error('Error creating zip:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button loading={loading} disabled={loading} className='bg-emerald-500 hover:bg-emerald-600 text-white' onClick={() => {
                showInfo("Downloading...");
                setTimeout(() => {
                    setLoading(true)
                }, 1000);
                setTimeout(() => {
                    handleDownloadZip()
                }, 2000);
            }}>
                {text}
            </Button>
            {loading && qrList.map((data, index) => (
                <div
                    id={data.productId}
                    key={data.productId}
                    // @ts-ignore
                    ref={(el) => (qrRefs.current[index] = el)}
                    className='fixed bottom-0 right-0 w-0 h-0 opacity-0 overflow-hidden'
                >
                    {data.qrs.map((el, i) => (
                        <QRCode
                            key={i}
                            id={el}
                            value={el}
                            size={100} // Set a size appropriate for rendering
                            ecLevel="H"
                            qrStyle="dots"
                            eyeRadius={10}
                        />
                    ))}
                </div>
            ))}
        </>
    );
};

export default DownloadQrZipButton;
