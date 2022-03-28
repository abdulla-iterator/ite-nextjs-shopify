import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Cart from './Cart'
import { useCart } from '../lib/cartState'
import { Dialog, Transition } from '@headlessui/react'

const Navbar = () => {
    const [state, setState] = useState(true)
    const [open, setOpen] = useState(true)
    const { openCart } = useCart()
    console.log();
    const navigation = [
        { title: "Products", path: `/products` },
        { title: "Collections", path: "/collections" },
    ]
    return (
        <nav className="bg-white w-full border-b md:border-0 md:static position:fixed">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link href={'/'}>
                        <a className=" p-4 text-white bg-gray-400 hover:bg-indigo-300 rounded-md shadow">
                            Shopify Shop
                        </a>
                    </Link>
                    <div className="md:hidden">
                        <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => (
                                <Link key={idx} href={`${item.path}`} className="text-gray-900 hover:text-indigo-600 text-size-3">
                                    <a>
                                        {item.title}
                                    </a>
                                </Link>
                            )
                            )
                        }
                    </ul>
                </div>
                <button onClick={openCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <Cart />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
