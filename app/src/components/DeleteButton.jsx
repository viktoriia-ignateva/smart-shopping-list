import { MdDelete } from 'react-icons/md'

const DeleteButton = ({ onClick }) => (
    <MdDelete
        className="fill-slate-500 pr-1 hover:fill-red-500"
        size={25}
        onClick={onClick}
    />
)

export default DeleteButton
