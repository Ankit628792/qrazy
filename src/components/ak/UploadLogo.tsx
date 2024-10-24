import { cn } from '@/lib/utils';
import { FileUploader } from 'react-drag-drop-files'
const initialSize = "w-60 h-60 md:w-72 md:h-72 2xl:w-80 2xl:h-80 "

function UploadLogo({ file, handleChange, size = "", name }: {
    file: File | null | string,
    handleChange: (file: File) => void,
    size?: string,
    name?: string
}) {
    return (
        <div className={cn('overflow-hidden fileUpload flex')}>
            <FileUploader
                handleChange={(file: File) => handleChange(file)}
                name={name || "logo"}
                types={["jpg", "JPG", "png", "PNG", "jpeg", "JPEG"]}
                children={<>
                    <div className={cn('logo p-10  absolute inset-0 bg-white dark:bg-black text-black dark:text-white border rounded-full place-items-center fileUploadOverlay z-20 shrink-0', initialSize, size)}>
                        <svg className='w-full h-full fill-gray-100 dark:fill-zinc-800 stroke-emerald-600' viewBox="0 0 501 501" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="250.68" cy="250.496" r="247.5" strokeWidth="5" strokeDasharray="30 30" />
                        </svg>
                        <p className='text-2xl max-w-max absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Drop Logo here</p>
                    </div>
                    {
                        file
                            ?
                            <div className={cn('rounded-full overflow-hidden bg-white dark:bg-black text-black dark:text-white border grid place-items-center cursor-pointer fileUploadContainer', initialSize, size)}>
                                <div className='w-full h-full rounded-full overflow-hidden relative group'>
                                    <img src={typeof file == 'object' ? URL.createObjectURL(file) : file} className='w-full h-full object-contain cursor-pointer' alt="" />
                                    <div className='absolute inset-0 bg-black bg-opacity-60 hidden group-hover:flex flex-col items-center justify-center opacAnimation2 cursor-pointer fileUploadContainer'>
                                        <svg className='w-20 h-20' viewBox="0 0 126 126" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M102.426 28.1836H88.8906L82.2354 18.2031C81.8788 17.6687 81.3959 17.2305 80.8295 16.9273C80.2632 16.6241 79.6307 16.4652 78.9883 16.4648H47.7383C47.0958 16.4652 46.4634 16.6241 45.897 16.9273C45.3306 17.2305 44.8478 17.6687 44.4912 18.2031L37.8311 28.1836H24.3008C21.1928 28.1836 18.2121 29.4182 16.0144 31.6159C13.8167 33.8136 12.582 36.7943 12.582 39.9023V94.5898C12.582 97.6979 13.8167 100.679 16.0144 102.876C18.2121 105.074 21.1928 106.309 24.3008 106.309H102.426C105.534 106.309 108.514 105.074 110.712 102.876C112.91 100.679 114.145 97.6979 114.145 94.5898V39.9023C114.145 36.7943 112.91 33.8136 110.712 31.6159C108.514 29.4182 105.534 28.1836 102.426 28.1836ZM106.332 94.5898C106.332 95.6258 105.92 96.6194 105.188 97.352C104.455 98.0845 103.462 98.4961 102.426 98.4961H24.3008C23.2648 98.4961 22.2712 98.0845 21.5386 97.352C20.8061 96.6194 20.3945 95.6258 20.3945 94.5898V39.9023C20.3945 38.8663 20.8061 37.8728 21.5386 37.1402C22.2712 36.4076 23.2648 35.9961 24.3008 35.9961H39.9258C40.569 35.9965 41.2025 35.8381 41.7698 35.5348C42.3371 35.2316 42.8207 34.7929 43.1777 34.2578L49.8281 24.2773H76.8936L83.5488 34.2578C83.9058 34.7929 84.3895 35.2316 84.9568 35.5348C85.5241 35.8381 86.1575 35.9965 86.8008 35.9961H102.426C103.462 35.9961 104.455 36.4076 105.188 37.1402C105.92 37.8728 106.332 38.8663 106.332 39.9023V94.5898ZM63.3633 43.8086C59.1141 43.8086 54.9603 45.0686 51.4272 47.4294C47.8941 49.7901 45.1404 53.1455 43.5143 57.0713C41.8882 60.997 41.4627 65.3168 42.2917 69.4844C43.1207 73.6519 45.1669 77.4801 48.1715 80.4847C51.1762 83.4894 55.0043 85.5356 59.1719 86.3645C63.3394 87.1935 67.6592 86.768 71.585 85.1419C75.5108 83.5158 78.8661 80.7621 81.2269 77.229C83.5876 73.696 84.8477 69.5422 84.8477 65.293C84.8412 59.5969 82.5756 54.1361 78.5479 50.1084C74.5202 46.0807 69.0593 43.8151 63.3633 43.8086ZM63.3633 78.9648C60.6592 78.9648 58.0159 78.163 55.7676 76.6607C53.5193 75.1584 51.7669 73.0232 50.7321 70.525C49.6973 68.0268 49.4266 65.2778 49.9541 62.6257C50.4816 59.9736 51.7838 57.5375 53.6958 55.6255C55.6079 53.7134 58.0439 52.4113 60.696 51.8838C63.3481 51.3563 66.0971 51.627 68.5953 52.6618C71.0935 53.6966 73.2287 55.449 74.731 57.6973C76.2333 59.9456 77.0352 62.5889 77.0352 65.293C77.0352 68.919 75.5947 72.3965 73.0308 74.9604C70.4668 77.5244 66.9893 78.9648 63.3633 78.9648Z" fill="white" />
                                        </svg>
                                        <p className='text-2xl'>Edit Logo</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className={cn('rounded-full overflow-hidden bg-white dark:bg-black text-black dark:text-white border grid place-items-center cursor-pointer fileUploadContainer', initialSize, size)}>

                                <div className='flex flex-col items-center justify-center gap-2 sm:gap-3 2xl:gap-4'>
                                    <svg className='stroke-black dark:stroke-white w-12 sm:w-16 md:w-20 2xl:w-24' viewBox="0 0 107 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.89844 61.5273L29.7682 34.6576C30.8564 33.5693 32.1483 32.7061 33.5701 32.1172C34.9919 31.5283 36.5157 31.2252 38.0547 31.2252C39.5936 31.2252 41.1175 31.5283 42.5393 32.1172C43.9611 32.7061 45.253 33.5693 46.3411 34.6576L73.2109 61.5273M65.3984 53.7148L72.737 46.3763C73.8252 45.2881 75.117 44.4249 76.5388 43.836C77.9606 43.247 79.4845 42.9439 81.0234 42.9439C82.5624 42.9439 84.0863 43.247 85.508 43.836C86.9298 44.4249 88.2217 45.2881 89.3099 46.3763L104.461 61.5273M10.7109 81.0586H96.6484C98.7204 81.0586 100.708 80.2355 102.173 78.7704C103.638 77.3052 104.461 75.3181 104.461 73.2461V10.7461C104.461 8.67409 103.638 6.68695 102.173 5.22182C100.708 3.75669 98.7204 2.93359 96.6484 2.93359H10.7109C8.63893 2.93359 6.65179 3.75669 5.18667 5.22182C3.72154 6.68695 2.89844 8.67409 2.89844 10.7461V73.2461C2.89844 75.3181 3.72154 77.3052 5.18667 78.7704C6.65179 80.2355 8.63893 81.0586 10.7109 81.0586ZM65.3984 22.4648H65.4401V22.5065H65.3984V22.4648ZM67.3516 22.4648C67.3516 22.9828 67.1458 23.4796 66.7795 23.8459C66.4132 24.2122 65.9164 24.418 65.3984 24.418C64.8804 24.418 64.3837 24.2122 64.0174 23.8459C63.6511 23.4796 63.4453 22.9828 63.4453 22.4648C63.4453 21.9468 63.6511 21.4501 64.0174 21.0838C64.3837 20.7175 64.8804 20.5117 65.3984 20.5117C65.9164 20.5117 66.4132 20.7175 66.7795 21.0838C67.1458 21.4501 67.3516 21.9468 67.3516 22.4648Z" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className='text-base sm:text-lg md:text-xl 2xl:text-2xl text-center'>Upload your company logo</p>
                                    <p className='italic text-xs md:text-sm 2xl:text-base text-center'>Upload jpg, jpeg and png</p>
                                </div>
                            </div>
                    }
                </>}
            />
        </div>
    )
}

export default UploadLogo