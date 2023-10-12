import NavbarItem from "./NavbarItem"
import MobileMenu from "./MobileMenu"
import AccountMenu from "./AccountMenu"
import { IoMdArrowDropdown } from 'react-icons/io'
import { useState, useEffect, useCallback } from "react"
import { BiSearchAlt2, BiBell } from 'react-icons/bi'

const TOP_OFFSET = 66;
const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackgorund, setShowBackground] = useState(false)
    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);

            }
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);

        }
    }, [])

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);
    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, [])

    return (
        <nav className="w-full fixed z-40 ">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackgorund ? "bg-zinc-900 bg-opacity-90" : ''} `}>
                <img className="h-5 lg:h-16" src="../images/logo.png" alt="logo" />
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label='Home' />
                    <NavbarItem label='Series' />
                    <NavbarItem label='Films' />
                    <NavbarItem label='New & Popular' />
                    <NavbarItem label='My List' />
                    <NavbarItem label='Browse by Languages' />
                </div>
                <div onClick={toggleMobileMenu} className=" lg:hidden flex flex-row items-center gap-1 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm" >
                        Browse
                    </p>
                    <IoMdArrowDropdown className={`text-white text-2xl transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'} `} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                        <BiSearchAlt2 className=" h-7 w-7 " />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                        <BiBell className=" h-7 w-7 " />
                    </div>

                    <div onClick={() => toggleAccountMenu()} className="flex flex-row gap-2 items-center cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="./images/default-blue.png" alt="" />
                        </div>
                        <IoMdArrowDropdown className={`text-white text-2xl transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'} `} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar