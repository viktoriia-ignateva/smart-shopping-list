import { ShoppingListItem } from './ShoppingListItem'
import React, { useState } from 'react'

export const ShoppingListView = ({
    selectedList,
    addNewItem,
    deleteItem,
    markItemAsBought,
}) => {
    const [newItemName, setNewItemName] = useState('')

    return (
        <>
            {selectedList ? (
                <div className="min-w-96 w-full p-4 bg-white flex flex-col justify-between">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-center mb-4">
                            {selectedList.name}
                        </h1>
                        <ul>
                            {selectedList.items
                                ?.filter((item) => item.bought)
                                .map((item) => (
                                    <ShoppingListItem
                                        key={item._id}
                                        item={item}
                                        onDelete={() => deleteItem(item._id)}
                                        markItemAsBought={markItemAsBought}
                                    />
                                ))}
                        </ul>
                        <hr className="my-5" />
                        <ul>
                            {selectedList.items
                                ?.filter((item) => !item.bought)
                                .map((item) => (
                                    <ShoppingListItem
                                        key={item._id}
                                        item={item}
                                        onDelete={() => deleteItem(item._id)}
                                        markItemAsBought={() =>
                                            markItemAsBought(item._id)
                                        }
                                    />
                                ))}
                        </ul>
                    </div>
                    <div className="flex items-center">
                        <NewItemNameInput
                            value={newItemName}
                            inputName={'Add a grocery item'}
                            handleInput={(event) => {
                                setNewItemName(event.target.value)
                                console.log('newItemName: ' + newItemName)
                            }}
                        />
                        <AddNewItemButton
                            onClick={() => {
                                addNewItem(newItemName)
                                setNewItemName('')
                            }}
                            disabled={newItemName.length === 0}
                        />
                    </div>
                </div>
            ) : (
                <div>Please select a list to view</div>
            )}
        </>
    )
}

function NewItemNameInput({ value, inputName, handleInput }) {
    return (
        <div className="flex-grow mr-2">
            <input
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id={inputName}
                type={inputName}
                placeholder={inputName}
                onChange={handleInput}
                value={value}
            />
        </div>
    )
}

function AddNewItemButton({ onClick, disabled }) {
    return (
        <div>
            <button
                onClick={onClick}
                disabled={disabled}
                type="submit"
                className="disabled:opacity-75 disabled:cursor-not-allowed flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Add New Item
            </button>
        </div>
    )
}
