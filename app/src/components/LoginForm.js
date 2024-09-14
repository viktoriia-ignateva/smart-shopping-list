import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Input({ inputName, handleInput }) {
    return (
        <div className="w-full">
            <label
                htmlFor={inputName}
                className="block text-gray-700 font-semibold mb-2"
            >
                {inputName}
            </label>
            <input
                id={inputName}
                type={inputName}
                placeholder={inputName}
                onChange={handleInput}
                className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}

function LoginButton({ email, password, setError }) {
    const navigate = useNavigate()
    console.log('start to submit:' + email + password)

    function handleSubmit() {
        setError('')
        const url = 'http://localhost:5001/api/auth/login'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password,
            }),
        }

        fetch(url, options)
            .then(async (response) => {
                if (!response.ok) {
                    const data = await response.json()

                    if (data.message === 'Invalid credentials') {
                        setError(data.message)
                        throw new Error('Invalid credentials')
                    }

                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                console.log('Success (login):', data)
                localStorage.setItem('authToken', data.token)
                localStorage.setItem('username', data.user.username)
                window.dispatchEvent(new Event('storage'))
            })
            .catch((error) => {
                console.error('Error:', error)
                // Handle errors
            })
    }

    return (
        <button
            onClick={handleSubmit}
            type="submit"
            className="flex w-1/2 mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Login
        </button>
    )
}

export default function LoginForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [token, setToken] = useState(localStorage.getItem('authToken'))

    useEffect(() => {
        const storageListener = () => {
            console.log('Change to local storage!')
            setToken(localStorage.getItem('authToken'))
        }

        window.addEventListener('storage', storageListener)

        return () => window.removeEventListener('storage', storageListener)
    }, [])

    if (token) return <Navigate to="/lists" />

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 gap-4">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Input
                    inputName={'Email'}
                    handleInput={(event) => {
                        setEmail(event.target.value)
                        console.log('list name ' + JSON.stringify(email)) //debug
                    }}
                />
                <Input
                    inputName={'Password'}
                    handleInput={(event) => {
                        setPassword(event.target.value)
                    }}
                />
                {error && (
                    <div className="text-red-500 font-semibold mb-2">
                        {error}
                    </div>
                )}
                <div className="flex py-2 gap-4">
                    <button
                        className="flex w-1/2 mt-2 justify-center items-center text-indigo-500 rounded-md border border-indigo-600"
                        onClick={() => navigate('/register')}
                    >
                        Don't have a Account
                    </button>
                    <LoginButton
                        email={email}
                        password={password}
                        setError={setError}
                    />
                </div>
            </div>
        </div>
    )
}
