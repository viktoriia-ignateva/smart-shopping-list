import React from "react";

function Input({inputName}) {
    return (
        <div className="max-w-xs mx-auto">
            <label htmlFor={inputName} className="block text-gray-700 font-semibold mb-2">
                {inputName}
            </label>
            <input
                id={inputName}
                type={inputName}
                placeholder={inputName}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}

function LoginButton() {
    return (
        <div>
            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Sign in
            </button>
        </div>
    )
}

export default function RegistrationForm() {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 gap-4">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Input inputName={"Email"}/>
                <Input inputName={"Password"}/>
                <LoginButton/>
            </div>
        </div>
    )
}
