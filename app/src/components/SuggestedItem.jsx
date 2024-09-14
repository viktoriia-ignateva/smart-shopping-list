import React from 'react'
import { MdAutoFixHigh, MdCheck } from 'react-icons/md'

const SuggestedItem = ({
    suggestedItem,
    addItemSuggestionToList,
    excludeItemFromSuggestions,
}) => {
    return (
        <li
            className={`relative group flex items-center justify-between py-2 px-3 m-2 bg-amber-50/50 hover:bg-amber-50 rounded-lg cursor-pointer`}
            onClick={() => {
                addItemSuggestionToList(suggestedItem._id)
            }}
        >
            <div className="flex items-center text-amber-500">
                <MdAutoFixHigh
                    size={25}
                    className="animate-pulse mr-3 fill-amber-500 transition-all ease-in-out duration-500 group-hover:w-0 group-hover:mr-0"
                />
                <MdCheck
                    size={25}
                    className="w-0 transition-all ease-in-out duration-500 group-hover:w-auto group-hover:mr-3 fill-emerald-500"
                />
                {suggestedItem.name}
            </div>
            <div className="invisible flex items-center justify-end group-hover:visible">
                <button
                    className="text-xs opacity-70 text-red-500 hover:underline hover:opacity-100"
                    onClick={(e) => {
                        excludeItemFromSuggestions(suggestedItem._id)
                        e.stopPropagation()
                    }}
                >
                    do no suggest
                </button>
            </div>
        </li>
    )
}

export default SuggestedItem
