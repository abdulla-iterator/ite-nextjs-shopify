import { useState } from "react";
import { storeApi } from "../utils/storeApi";
import { useRouter } from "next/router";
import Link from 'next/link'
import Image from "next/image";
import { CustomerCreate, CustomerLogin } from "../src/mutation";



const Register = () => {
    const router = useRouter();

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState("");

    const handleSignin = async (e) => {
        e.preventDefault();

        const { data } = await storeApi(CustomerCreate, { input: inputs });

        if (data.customerCreate.customer !== null) {
            const { data } = await storeApi(CustomerLogin, { input: { email: inputs.email, password: inputs.password } });

            const token = data.customerAccessTokenCreate.customerAccessToken.accessToken;
            localStorage.setItem("token", token);

            router.push("/account");
        }
        setErrors(data.customerCreate?.customerUserErrors[0]?.message);
    };


    return (
        <div className="min-h-full flex mt-20 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Image
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                        layout='responsive' width={100} height={12}
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign Up to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-red-600">{errors}</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignin} method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-x-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                First Name
                            </label>
                            <input
                                id="first-name"
                                name="firstName"
                                type="name"
                                autoComplete="First Name"
                                value={inputs.firstName}
                                onChange={(e) =>
                                    setInputs({ ...inputs, firstName: e.target.value })
                                }
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Last Name
                            </label>
                            <input
                                id="last-name"
                                name="lastName"
                                type="name"
                                autoComplete="Last Name"
                                required
                                value={inputs.lastName}
                                onChange={(e) =>
                                    setInputs({ ...inputs, lastName: e.target.value })
                                }
                                className="appearance-none my-3 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Last Name"
                            />
                        </div>
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
                                onChange={(e) =>
                                    setInputs({ ...inputs, email: e.target.value })
                                }
                                className="appearance-none  my-3 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        {/* <div>
                            <label htmlFor="email-address" className="sr-only">
                                Phone Number
                            </label>
                            <input
                                id="phone-number"
                                name="number"
                                type="tel"
                                autoComplete="number"
                                required
                                value={inputs.phone}
                                onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
                                className="appearance-none  my-3 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Phone Number"
                            />
                        </div> */}
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
                                onChange={(e) =>
                                    setInputs({ ...inputs, password: e.target.value })
                                }
                                className="appearance-none  my-3 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                    </div> */}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign up
                        </button>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            <Link href={`/account/login`}>
                                <a
                                    className="font-medium text-indigo-600 text-decoration: underline hover:text-indigo-500"
                                >
                                    Sign In
                                </a>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
