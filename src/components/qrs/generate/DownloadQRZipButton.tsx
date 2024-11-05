
import React, { useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { QRCode } from 'react-qrcode-logo';
import JSZip from 'jszip';
import { generateQRList, productQRList } from './constant';

interface Props {
    qrList?: ProductQRList[];
    text: string;
}

interface ProductQRList {
    productId: string;
    productTitle: string;
    qrs: string[];
}

const DownloadQrZipButton: React.FC<Props> = ({ qrList = productQRList, text }) => {
    const qrRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [loading, setLoading] = useState(false)

    const generateQrDataUrls = async (index: number) => {
        const canvas = qrRefs.current[index]?.querySelectorAll('canvas');
        let dataUrls = []
        if (canvas)
            for (let i = 0; i < canvas.length; i++) {
                dataUrls.push({ id: canvas[i].id, url: canvas[i].toDataURL('image/png') })
            }

        return dataUrls
    };



    const handleDownloadZip = async () => {
        const zip = new JSZip();
        setLoading(true)
        for (let i = 0; i < qrList.length; i++) {
            let product = qrList[i]
            const folder = zip.folder(product.productTitle); // Create folder for each product
            const dataUrls = await generateQrDataUrls(i);

            dataUrls.forEach((data, index) => {
                const dataUrl = dataUrls[index]; // Get the corresponding data URL for the QR code
                if (dataUrl) {
                    const base64Data = data.url.split(',')[1]; // Extract base64 data
                    folder.file(`${data.id}.png`, base64Data, { base64: true }); // Add to the folder
                }
            });
        }

        // Generate the zip file and trigger the download
        zip.generateAsync({ type: 'blob' }).then((content) => {
            saveAs(content, 'qr-codes.zip'); // Download the zip
        });

        setLoading(false)
    };

    return (
        <>
            {qrList.map((data, index) => (
                <div id={data.productId} key={data.productId} ref={(el) => (qrRefs.current[index] = el)} className='fixed bottom-0 right-0 w-0 h-0 opacity-0 overflow-hidden'>
                    {data.qrs.map((el, i) => (
                        <QRCode
                            key={i}
                            id={el}
                            value={el}
                            size={100} // You might want to adjust this size for visibility
                            ecLevel="H"
                            qrStyle="dots"
                            eyeRadius={10}
                        />
                    ))}
                </div>
            ))}
            <Button disabled={loading} className='bg-emerald-500 hover:bg-emerald-600 text-white' onClick={() => {
                handleDownloadZip();
            }}>{text}</Button>
        </>
    );
};

export default DownloadQrZipButton;
