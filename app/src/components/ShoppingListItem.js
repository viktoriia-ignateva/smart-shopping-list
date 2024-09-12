import React from 'react'
import DeleteButton from './DeleteButton'
import { MdCheck } from 'react-icons/md'

export const ShoppingListItem = ({ item, onDelete, markItemAsBought }) => {
    const boughtLiCss = item.bought
        ? 'border border-emerald-500'
        : 'bg-slate-50 hover:bg-emerald-50 hover:cursor-pointer'
    const boughtCheckMarkCss = item.bought
        ? 'fill-emerald-500 mr-3'
        : 'scale-0 transition-all ease-in-out duration-500 group-hover:scale-100 group-hover:mr-3 fill-emerald-500'

    return (
        <li
            className={`group flex items-center justify-between py-2 px-3 m-2 bg-slate-50 rounded-lg ${boughtLiCss}`}
            onClick={item.bought ? undefined : () => markItemAsBought(item._id)}
        >
            <div className="flex items-center">
                <MdCheck size={25} className={boughtCheckMarkCss} />
                {item.name}
            </div>
            {!item.bought && (
                <div className="invisible flex items-center justify-end group-hover:visible">
                    <DeleteButton onClick={onDelete} />
                </div>
            )}
        </li>
    )
}
