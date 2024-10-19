import { Button } from '@/components/ui/button'
import Link from 'next/link'
import PopUp from '../ak/PopUp';

type Props = {
    open: boolean,
    title: string,
    description?: string,
    onClose: () => void,
}

function AuthSuccess({ open, title, description = "", onClose }: Props) {

    if (!open) return <></>;
    return (
        <PopUp link='/login'>
            <div className='w-full max-w-2xl p-10 sm:p-16 lg:px-20 bg-white dark:bg-zinc-900 rounded-xl relative y-translate'>
                <h1 className='text-4xl sm:text-5xl font-bold text-center leading-normal'>{title}</h1>
                {description ? <p className='text-center text-sm sm:text-base my-4'>{description}</p> : <></>}
                <Button onClick={onClose} size={"lg"} className='mx-auto block mt-10'>
                    <span className='text-lg select-none'>Close</span>
                </Button>
            </div>
        </PopUp>
    )
}

export default AuthSuccess