import { ShoppingListItem } from './ShoppingListItem'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import SuggestedItem from './SuggestedItem'

export const ShoppingListView = ({
    selectedList,
    addNewItem,
    deleteItem,
    markItemAsBought,
    addItemSuggestionToList,
}) => {
    const [newItemName, setNewItemName] = useState('')
    const [shoppingSuggestions, setShoppingSuggestions] = useState([])

    const itemsAlreadyBought = selectedList?.items?.filter((item) => {
        const lastBoughtDate = moment(item.lastBoughtDate)
        return item.bought && moment().diff(lastBoughtDate, 'days') < 1
    })
    const itemsStillNeedToBuy = selectedList?.items?.filter(
        (item) => !item.bought
    )

    useEffect(() => {
        if (!selectedList) return

        const url = `http://localhost:5001/api/auth/shopping-list/${selectedList._id}/item-suggestions`
        const token = localStorage.getItem('authToken')

        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        }

        fetch(url, options)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(
                        'Network response was not ok while deleting shopping list item'
                    )
                }

                const data = await response.json()
                setShoppingSuggestions([...data])
            })
            .then((data) =>
                console.log('Success fetching shopping suggestions')
            )
            .catch((error) => console.error('Error:', error))
    }, [selectedList])

    return (
        <>
            {selectedList ? (
                <div className="min-w-96 w-full p-4 bg-white flex flex-col justify-between">
                    <div className="flex flex-col mb-8 flex-grow justify-between">
                        <div className="flex justify-between flex-col">
                            <h1 className="text-2xl font-semibold text-center mb-4">
                                {selectedList.name}
                            </h1>
                            <ul>
                                {itemsStillNeedToBuy.map((item) => (
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
                            <ul className="mt-4">
                                {shoppingSuggestions.map((suggestedItem) => (
                                    <SuggestedItem
                                        suggestedItem={suggestedItem}
                                        addItemSuggestionToList={
                                            addItemSuggestionToList
                                        }
                                    />
                                ))}
                            </ul>
                        </div>
                        {itemsAlreadyBought.length > 0 && (
                            <>
                                <hr className="my-5" />
                                <ul>
                                    {itemsAlreadyBought.map((item) => (
                                        <ShoppingListItem
                                            key={item._id}
                                            item={item}
                                            onDelete={() =>
                                                deleteItem(item._id)
                                            }
                                            markItemAsBought={markItemAsBought}
                                        />
                                    ))}
                                </ul>
                            </>
                        )}
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
                <div className="flex justify-center w-full items-center">
                    Please select a list to view
                </div>
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
