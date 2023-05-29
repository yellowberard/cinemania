import React from 'react'
import { signOut } from 'next-auth/react';

interface AccountMenuProps {
    visible?: boolean,
}

const AccountMenu: React.FC<AccountMenuProps> = ({
    visible
}) => {
    if (!visible) {
        return null;
    }
    return (
        <div className='bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-grey-800 flex'>
            <div className="flex-col flex gap-3">
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <img className='w-8 rounded-md' src="/images/default-blue.png" alt="" />
                    <p className='text-white text-sm group-hover/item:underline '>
                        username
                    </p>
                </div>
                <hr className='bg-gray-600 border-0 h-px my-4' />
                <div onClick={() => signOut()} className="text-white text-center text-sm hover:underline px-3">
                    Sign Out of Netflix
                </div>
            </div>
        </div>
    )
}

export default AccountMenu;