const DeleteAccountPopup = ({ show, onCancel, onConfirm }) => {
    return (
        show && (
            <div>
                <div className="p-8 fixed flex text-center flex-col items-center justify-center w-1/3 top-1/3 left-1/3 z-10 bg-white">
                    <span className="text-lg">
                        Are you sure you want to delete your account ?
                    </span>
                    <div className="w-full flex justify-between mt-10">
                        <button
                            className="flex items-center text-indigo-600 p-2 py-1.5 rounded-lg hover:bg-indigo-50"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex items-center text-red-500 p-2 py-1.5 rounded-lg hover:bg-red-50"
                            onClick={onConfirm}
                        >
                            Yes, Delete Now
                        </button>
                    </div>
                </div>
                <div className="disabled z-9 opacity-50 fixed top-0 left-0 w-full h-full bg-black" />
            </div>
        )
    )
}

export default DeleteAccountPopup
