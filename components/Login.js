import { useState } from 'react';
import { storeApi } from '../utils/storeApi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CustomerLogin } from '../src/mutation';
import { useCart } from '../lib/cartState';




const Login = () => {
    const router = useRouter();
    const { success } = useCart()
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const { data } = await storeApi(CustomerLogin, { input: inputs });

        const token = data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;

        localStorage.setItem('token', token);

        if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
            router.push('/account');
        }
        if (data?.customerAccessTokenCreate?.customerUserErrors[0]?.message) {
            setErrors(data?.customerAccessTokenCreate?.customerUserErrors[0]?.message);
            setInputs({ inputs: { email: '', password: '' } });
        }


    }
    return (
        <>
            <div className="min-h-full flex items-center justify-center mt-20 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full  space-y-8">
                    <div>
                        <Image
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                            layout='responsive' width={100} height={12}
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 text-center text-sm text-green-800">{success}</p>
                        <p className="mt-2 text-center text-sm text-red-900">{errors}</p>

                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin} method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={inputs.email}
                                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={inputs.password}
                                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                    className="appearance-none rounded-none my-3 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">

                            <div className="text-sm">
                                <Link href={`/account/pass-recovery`}>
                                    <a className="font-medium text-indigo-600 text-decoration: underline hover:text-indigo-500">
                                        Forgot your password?
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className=' items-center'>
                            <button
                                type="submit"
                                className="group relative  w-full text-center flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                            <p className="mt-3 text-center text-sm text-gray-600">
                                <Link href={`/account/register`}>
                                    <a className="font-medium text-indigo-600 text-decoration: underline hover:text-indigo-500">
                                        Create account
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login