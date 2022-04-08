import React from 'react'

const passwordRecovery = () => {
    return (
        <div className="min-h-full flex items-center justify-center mt-20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full  space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
                    <p className="mt-3 text-center text-sm text-gray-600">
                        We will send you an email to reset your password
                    </p>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
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
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                    </div>

                    <div className=' items-center'>
                        <button
                            type="submit"
                            className="group relative  w-full text-center flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                        <p className="mt-3 text-center text-sm text-gray-600">
                            <a href={`/account/login`} className="font-medium text-indigo-600 text-decoration: underline hover:text-indigo-500">
                                Cancel
                            </a>
                        </p>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default passwordRecovery