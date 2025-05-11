import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface SupportCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    buttonText: string;
}

const SupportCard: React.FC<SupportCardProps> = ({ title, description, icon: Icon, buttonText }) => {
    return (
        <div className='flex-grow flex flex-col gap-2 rounded-xl bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm p-4 w-full sm:max-w-96'>
            <div className='flex items-center gap-2'>
                <div className='bg-white dark:bg-black bg-opacity-20 dark:bg-opacity-20 backdrop-blur-sm p-2 rounded-full max-w-max'>
                    <Icon className='w-5 h-5' />
                </div>
                <h1 className='font-man text-xl font-semibold leading-none'>{title}</h1>
            </div>

            <h1 className='font-man text-lg font-medium mb-4 mt-3'>
                {description}
            </h1>
            <Button>{buttonText}</Button>
        </div>
    );
};

export default SupportCard;
