import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { storeApi } from '../utils/storeApi';
import { data } from 'autoprefixer';
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
        console.log(token);
        const getCustomerDetails = async () => {
            if (token) {
                console.log(token);
                const { data } = await storeApi(Customer, { customerAccessToken: token });
                console.log(data);
                setCustomerDetails(data);
            } else {
                router.push('/login');
            }
        }
        getCustomerDetails();
    }, [])
    console.log(customerDetails?.customer?.displayName);
    return (
        <div className='mt-20'>{customerDetails?.customer?.displayName}</div>
    )
}

export default Account