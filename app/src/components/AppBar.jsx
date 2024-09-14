import { MdOutlineLogout, MdOutlineNoAccounts } from 'react-icons/md'

const AppBar = ({ onClickDeleteAccount, onLogout }) => {
    const username = localStorage.getItem('username')

    return (
        <div className="flex justify-between items-center w-full border-b px-4 py-3">
            <button
                className="px-3 flex py-1.5 text-md items-center text-slate-600 hover:text-red-500"
                onClick={onLogout}
            >
                <MdOutlineLogout size={20} className="mr-2" />
                Logout
            </button>

            {`Hello, ${username}`}
            <button
                className="px-3 flex py-1.5 text-md items-center text-slate-600 hover:text-red-500"
                onClick={onClickDeleteAccount}
            >
                <MdOutlineNoAccounts size={20} className="mr-2" />
                Delete Account
            </button>
        </div>
    )
}

export default AppBar
