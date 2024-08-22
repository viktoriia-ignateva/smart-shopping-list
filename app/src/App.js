import './index.css';
import RegistrationForm from "./components/RegistrationForm";
import ShoppingLists from "./components/ShoppingLists";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {
    return (
        // <Router>
        //     <Routes>
        //         <Route path="/register" element={<RegistrationForm />} />
        //         <Route path="/lists" element={<ShoppingLists />} />
        //     </Routes>
        // </Router>

        <RegistrationForm />
    );
}