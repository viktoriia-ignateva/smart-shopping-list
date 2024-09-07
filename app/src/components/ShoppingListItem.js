import DeleteButton from './DeleteButton'

export const ShoppingListItem = ({ item, onDelete }) => {
    return (
        <li className="group flex items-center justify-between py-2 px-3 m-2 bg-slate-50 rounded-lg hover:bg-emerald-50 hover:cursor-pointer">
            {item.name}
            <div className="invisible flex items-center justify-end group-hover:visible">
                <DeleteButton onClick={onDelete} />
            </div>
        </li>
    )
}
