import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import AppBar from './components/AppBar'
import DeleteAccountPopup from './components/DeleteAccountPopup'
import { useState } from 'react'

export default function App() {
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)

    const logout = (redirectURL = '/login') => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('username')
        window.location.href = redirectURL
    }

    const deleteAccount = () => {
        const username = localStorage.getItem('username')
        const token = localStorage.getItem('authToken')
        const url = `http://localhost:5001/api/auth/user/${username}`

        const options = {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        }

        fetch(url, options)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(
                        'Network response was not ok while deleting user'
                    )
                }
                logout('/register')
            })
            .catch((error) => console.error('Error:', error))
    }

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route
                    path="/lists"
                    element={
                        <div className="flex flex-col w-full items-center">
                            <AppBar
                                onClickDeleteAccount={() =>
                                    setShowDeleteAccountModal(true)
                                }
                                onLogout={() => logout()}
                            />
                            <Dashboard />
                            <DeleteAccountPopup
                                show={showDeleteAccountModal}
                                onCancel={() =>
                                    setShowDeleteAccountModal(false)
                                }
                                onConfirm={() => {
                                    setShowDeleteAccountModal(false)
                                    console.log('deleting account')
                                    deleteAccount()
                                }}
                            />
                        </div>
                    }
                />
            </Routes>
        </Router>
    )
}
