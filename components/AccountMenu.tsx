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

                </div>
            </div>
        </div>
    )
}

export default AccountMenu;