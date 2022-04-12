import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useCart } from '../lib/cartState'
import Cart from './Cart'
import Link from 'next/link'

const Navbar = () => {
    const { openCart } = useCart()

    const [toggle, setToggle] = useState(false)
    const navigation = [
        { title: "Products", path: "/products" },
        { title: "Collections", path: "/collections" },

    ]

    return (
        <nav className="bg-white w-full top-0 z-40  sticky-nav fixed">
            <div className="items-center px-4 max-w-screen-xl mx-auto lg:flex lg:px-8">
                <div className="flex items-center justify-between py-3 lg:py-4 lg:block">
                    <Link href={'/'} >
                        <a >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="flex-shrink-0 w-5 h-5 rounded-full dark:text-coolGray-900">
                                    <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                                </svg>
                            </div>
                        </a>
                    </Link>
                    <div className="lg:hidden">
                        <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                            onClick={() => setToggle(!toggle)}
                        >
                            {
                                toggle ? (
                                    <XIcon className="h-6 w-6" aria-hidden="true" />

                                ) : (
                                    <MenuIcon className="h-6 w-6" aria-hidden="true" />

                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 justify-between flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${toggle ? 'h-screen pb-20 overflow-auto pr-4' : 'hidden'}`}>
                    <div>
                        <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
                            <Link href={`/account`} className="mt-4 lg:mt-0 cursor-pointer" >
                                <a >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </a>
                            </Link>
                            <li className="mt-8 mb-8 lg:mt-0 lg:mb-0 cursor-pointer">
                                <svg onClick={openCart} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    <Cart />
                                </svg>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
                            {
                                navigation.map((item, idx) => {
                                    return (
                                        <Link href={item.path} key={idx} className="text-gray-600 hover:text-indigo-600">
                                            <a >
                                                {item.title}
                                            </a>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar



