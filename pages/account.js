import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { storeApi } from '../utils/storeApi';
import { useCart } from '../lib/cartState';
import { Customer } from '../src/query';



const Account = () => {
    const router = useRouter();
    const { capitalize, customerDetails, setCustomerDetails } = useCart()


    useEffect(() => {
        const token = localStorage.getItem('token');

        const getCustomerDetails = async () => {
            if (token) {

                const { data } = await storeApi(Customer, { customerAccessToken: token });

                setCustomerDetails(data);
            } else {
                router.push('/account/login');

            }
        }
        getCustomerDetails();
    }, [])

    const handleLogout = async () => {
        localStorage.removeItem('token');
        router.push('/account/login');
        setCustomerDetails('');
    }


    return (
        <div className='m-50 p-20'>
            <div className=" my-5 px-5 py-10 mx-5 ">
                <h1 className='text-3xl '>Account, {capitalize(customerDetails?.customer?.displayName)}</h1>
                <p onClick={handleLogout} className="flex my-2 inline cursor-pointer underline  hover:underline-offset-2 text-gray-500 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-7 px-1 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Log out
                </p>
            </div>
            <div className='flex justify-between px-5 md:flex-row my-5'>
                <div className='py-5 mx-5'>
                    <h2 className='text-xl mb-3 '>Order history</h2>
                    <p className='text-gray-500'> You have not placed any orders yet.</p>
                </div>
                <div className='py-5 mx-5'>
                    <h2 className='text-xl mb-3'>Account details</h2>
                    <a href="/account/addresses" className='underline  hover:underline-offset-2 text-gray-500'>
                        View addresses (0)
                    </a>
                </div>
            </div>

        </div >
    )
}

export default Account