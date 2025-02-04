import React, { useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { QRCode } from 'react-qrcode-logo';
import JSZip from 'jszip';
import { showInfo } from '@/lib';
import { useGetQrCodes } from '@/hooks/qr/useGetQRCodes';

interface ProductQRList {
    productId: string;
    productTitle: string;
    qrCodes: string[];
}

interface Props {
    qrList?: ProductQRList[];
    text: string;
    orderId: string;
}

const DownloadQrZipButton: React.FC<Props> = ({ text, orderId }) => {
    const qrRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [loading, setLoading] = useState(false);
    const { isPending, data, refetch } = useGetQrCodes({ orderId })

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
        await refetch();
        // return;
        const qrList = data?.data
        if (!qrList.length) {
            return;
        }
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
            <Button loading={isPending || loading} disabled={isPending || loading} className='bg-emerald-500 hover:bg-emerald-600 text-white' onClick={() => {
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
            {loading && data?.data?.map((item: ProductQRList, index: number) => (
                <div
                    id={item.productId}
                    key={item.productId}
                    // @ts-ignore
                    ref={(el) => (qrRefs.current[index] = el)}
                    className='fixed bottom-0 right-0 w-0 h-0 opacity-0 overflow-hidden'
                >
                    {item.qrCodes.map((el, i) => (
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
