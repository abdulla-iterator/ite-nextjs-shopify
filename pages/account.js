import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { storeApi } from '../utils/storeApi';
import { useCart } from '../lib/cartState';

const gql = String.raw;
const Customer = gql`
query customer($customerAccessToken: String!){
  customer(customerAccessToken: $customerAccessToken){
    email
    displayName
  }
}
`

const Account = () => {
    const router = useRouter();
    const { customerDetails, setCustomerDetails } = useCart()


    useEffect(() => {
        const token = localStorage.getItem('token');

        const getCustomerDetails = async () => {
            if (token) {
                console.log(token);

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
        <div className='m-50-20 p-20'>
            <div className='flex justify-between'>
                <h1>Account</h1>
                <div>
                    <h2>{customerDetails.customer?.displayName}</h2>
                    <p>{customerDetails.customer?.email}</p>
                </div>
                <button onClick={handleLogout}>Logout</button>
            </div>

        </div >
    )
}

export default Account