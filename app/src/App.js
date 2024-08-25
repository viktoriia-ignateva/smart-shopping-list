import './index.css';
import RegistrationForm from "./components/RegistrationForm";
import ShoppingLists from "./components/ShoppingLists";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import LoginForm from "./components/LoginForm";


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
                <Route path="/" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/lists" />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={!isAuthenticated ? <RegistrationForm /> : <Navigate to="/lists" />} />
                <Route path="/lists" element={isAuthenticated ? <ShoppingLists /> : <Navigate to="/register" />} />
            </Routes>
        </Router>
    );
}