import React from 'react'
import ToggleTheme from '../ak/ToggleTheme'
import Avatar from '../ui/avatar'
import { ChevronLeft, LogOut } from 'lucide-react'
import Tooltip from '../ui/tooltip'

function Sidebar() {
    return (
        <aside className='flex flex-col py-5 items-center justify-between pt-28'>
            <div>
                <Tooltip title='Go Back'>
                    <Avatar fallback={<ChevronLeft />} />
                </Tooltip>
            </div>
            <div className='flex flex-col gap-4 justify-end'>
                <Tooltip title="Toggle Theme">
                    <Avatar fallback={<ToggleTheme />} />
                </Tooltip>
                <Tooltip title="Logout">
                    <Avatar fallback={<LogOut />} />
                </Tooltip>
            </div>
        </aside>
    )
}

export default Sidebar