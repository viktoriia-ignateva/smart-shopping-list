import React, { useState } from 'react'
import DeleteButton from './DeleteButton'
import { MdEdit } from 'react-icons/md'

export default function ShoppingLists({
    shoppingLists,
    setShoppingLists,
    setSelectedListId,
    selectedListId,
}) {
    const [newShoppingListName, setNewShoppingListName] = useState('')
    const [editingList, setEditingList] = useState(null)

    return (
        <div className="flex justify-between flex-col min-w-80 p-4 bg-white border-r">
            <div>
                <h1 className="text-2xl font-semibold text-center mb-4">
                    My Shopping Lists
                </h1>
                <div className="grid grid-cols-1 gap-4">
                    <ul>
                        {shoppingLists.map((list) => (
                            <li
                                key={list._id}
                                className={`flex group justify-between py-2 px-4 rounded-lg items-center m-2 hover:bg-slate-100 hover:cursor-pointer ${selectedListId === list._id && 'bg-slate-50'}`}
                                onClick={() => setSelectedListId(list._id)}
                            >
                                {editingList?._id === list._id ? (
                                    <EditShoppingListNameInput
                                        listName={editingList.name}
                                        handleInput={(event) =>
                                            setEditingList({
                                                ...editingList,
                                                name: event.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    list.name
                                )}
                                <div className="flex gap-2 items-center">
                                    {editingList?._id === list._id ? (
                                        <SaveShoppingListButton
                                            editingList={editingList}
                                            setEditingList={setEditingList}
                                            setShoppingLists={setShoppingLists}
                                        />
                                    ) : (
                                        <>
                                            <EditShoppingListButton
                                                handleEdit={() =>
                                                    setEditingList(list)
                                                }
                                            />
                                            <DeleteShoppingListButton
                                                listId={list._id}
                                                setShoppingLists={
                                                    setShoppingLists
                                                }
                                            />
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <NewShoppingListNameInput
                    inputName={'New list'}
                    handleInput={(event) => {
                        setNewShoppingListName(event.target.value)
                    }}
                />
                <AddNewShoppingListButton
                    newShoppingListName={newShoppingListName}
                    setShoppingLists={setShoppingLists}
                />
            </div>
        </div>
    )
}

function NewShoppingListNameInput({ inputName, handleInput }) {
    return (
        <div className="w-full">
            <input
                className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id={inputName}
                type={inputName}
                placeholder={inputName}
                onChange={handleInput}
            />
        </div>
    )
}

function EditShoppingListNameInput({ listName, handleInput }) {
    return (
        <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            value={listName}
            onChange={handleInput}
        />
    )
}

function AddNewShoppingListButton({ newShoppingListName, setShoppingLists }) {
    function handleSubmit() {
        const url = 'http://localhost:5001/api/auth/shopping-list'
        const token = localStorage.getItem('authToken')
        const options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newShoppingListName,
            }),
        }

        fetch(url, options)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(
                        'Network response was not ok while creating new shopping lists'
                    )
                }

                const data = await response.json()
                setShoppingLists(data)
            })
            .then((data) =>
                console.log('Success (create shopping lists):' + data)
            )
            .catch((error) => console.error('Error:', error))
    }

    return (
        <div>
            <button
                onClick={handleSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Add New List
            </button>
        </div>
    )
}

function DeleteShoppingListButton({ listId, setShoppingLists }) {
    const handleDelete = async () => {
        const url = `http://localhost:5001/api/auth/shopping-list/${listId}`
        const token = localStorage.getItem('authToken')

        const options = {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }

        fetch(url, options)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(
                        'Network response was not ok while deleting shopping list'
                    )
                }

                const updatedLists = await response.json()
                setShoppingLists(updatedLists)
            })
            .then((data) =>
                console.log('Success (edit shopping lists):' + data)
            )
            .catch((error) =>
                console.error('Error deleting shopping list:', error)
            )
    }

    return (
        <DeleteButton
            onClick={handleDelete}
            classNames="invisible group-hover:visible"
        />
    )
}

function EditShoppingListButton({ handleEdit }) {
    return (
        <MdEdit
            onClick={handleEdit}
            size={25}
            className="invisible fill-slate-500 pr-1 group-hover:visible hover:fill-blue-500"
        >
            Edit
        </MdEdit>
    )
}

function SaveShoppingListButton({
    editingList,
    setEditingList,
    setShoppingLists,
}) {
    function handleEdit() {
        const url = `http://localhost:5001/api/auth/shopping-list/${editingList._id}`
        const token = localStorage.getItem('authToken')
        const options = {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                listName: editingList.name,
            }),
        }

        fetch(url, options)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(
                        'Network response was not ok while editing new shopping lists'
                    )
                }

                const data = await response.json()
                setShoppingLists(data)
                setEditingList(null)
            })
            .then((data) =>
                console.log('Success (create shopping lists):' + data)
            )
            .catch((error) => console.error('Error:', error))
    }

    return (
        <button
            onClick={handleEdit}
            className="bg-red-500 text-white px-2 py-1 ml-2 rounded-md"
        >
            Save
        </button>
    )
}
