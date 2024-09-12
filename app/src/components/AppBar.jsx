import { MdOutlineLogout } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const AppBar = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('authToken')
        navigate('/login')
    }

    return (
        <div className="flex justify-between items-center w-full border-b px-4 py-3">
            Name: Rajeev
            <button
                className="px-3 flex py-1.5 text-md items-center text-slate-600 hover:text-red-500"
                onClick={logout}
            >
                <MdOutlineLogout size={20} className="mr-2" />
                Logout
            </button>
        </div>
    )
}

export default AppBar
