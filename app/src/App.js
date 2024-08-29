import './index.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";


export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/lists" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}