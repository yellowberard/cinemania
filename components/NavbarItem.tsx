import React from "react";

interface NavbarItemsProps {
    label: string;

}

const NavbarItem: React.FC<NavbarItemsProps> = ({ label }) => {
    return (
        <div className="text-white hover:text-gray-300 cursor-pointer transition">
            {label}
        </div>
    )
}

export default NavbarItem