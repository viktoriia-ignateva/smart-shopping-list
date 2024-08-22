import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

function Input({inputName, handleInput}) {
    return (
        <div className="max-w-xs mx-auto">
            <label htmlFor={inputName} className="block text-gray-700 font-semibold mb-2">
                {inputName}
            </label>
            <input
                id={inputName}
                type={inputName}
                placeholder={inputName}
                onChange={handleInput}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}

function RegisterButton({email, password, setError}) {
    //const navigate = useNavigate();
    function handleSubmit() {
         setError('')
         const url = 'http://localhost:5001/api/auth/register'
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
             .then(async response => {
                 if (!response.ok) {
                     const data = await response.json()

                     if (data.message === 'User already exists') {
                         setError(data.message)
                         throw new Error('User already exists')
                     }

                     throw new Error('Network response was not ok')
                 }
                 return response.json();
             })
             .then(data => {
                 console.log('Success:', data);
                 // navigate('/lists')
                 localStorage.setItem('authToken', data.token);
                 console.log('Token:', data.token);
             })
             .catch(error => {
                 console.error('Error:', error);
                 // Handle errors
             });
    }

    return (
        <div>
            <button onClick={handleSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Register
            </button>
        </div>
    )
}

export default function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 gap-4">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Input
                    inputName={"Email"}
                    handleInput={(event) => {setEmail(event.target.value)}}
                />
                <Input
                    inputName={"Password"}
                    handleInput={(event) => {setPassword(event.target.value)}}
                />
                {error && (
                    <div className="text-red-500 font-semibold mb-2">
                        {error}
                    </div>
                )}
                <RegisterButton
                    email={email}
                    password={password}
                    setError={setError}/>
            </div>
        </div>
    )
}
