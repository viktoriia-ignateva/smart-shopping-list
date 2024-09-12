import './index.css'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import AppBar from './components/AppBar'

export default function App() {
    const token = localStorage.getItem('authToken')

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route
                    path="/*"
                    element={
                        token ? (
                            <div className="flex flex-col w-full items-center">
                                <AppBar />
                                <Dashboard />
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    )
}
