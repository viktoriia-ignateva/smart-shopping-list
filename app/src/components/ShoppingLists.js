import React, {useState, useEffect} from "react";

export default function ShoppingLists({ setSelectedList }) {
    const [newShoppingListName, setNewShoppingListName] = useState('')
    const [shoppingLists, setShoppingLists] = useState([])
    const [editingListId, setEditingListId] = useState(null)

    useEffect(() => {
        const url = 'http://localhost:5001/api/auth/shopping-list'
        const token = localStorage.getItem("authToken")
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token},
        }

        fetch(url, options)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok while get shopping lists')
                }

                const data = await response.json();
                setShoppingLists(data);
            })
            .then(data => console.log('Success (get shopping lists):'+ data))
            .catch(error => console.error('Error:', error))
    }, [])

    return (
            <div className="max-w-xl p-4 bg-white">
                <h1 className="text-2xl font-semibold text-center mb-4">My Shopping Lists</h1>
                <div className="grid grid-cols-1 gap-4">
                    <ul>
                        {shoppingLists.map(list => (
                            <li key={list._id} className="flex justify-between items-center" onClick={() => setSelectedList(list)}>
                                {editingListId === list._id ? (
                                    <input
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        type="text"
                                        value={list.name}
                                        onChange={(event) => setNewShoppingListName(event.target.value)}
                                    />
                                ) : (
                                    list.name
                                )}
                                <div className="flex gap-2">
                                    <DeleteShoppingListButton
                                        listId={list._id}
                                        setShoppingLists={setShoppingLists}
                                    />
                                    {editingListId === list._id ? (
                                        <SaveShoppingListButton
                                            listId={list._id}
                                            setEditingListId={setEditingListId}
                                            setShoppingLists={setShoppingLists}
                                        />
                                    ) : (
                                        <EditShoppingListButton
                                            listId={list._id}
                                            setEditingListId={setEditingListId}
                                            setShoppingLists={setShoppingLists}
                                        />
                                    )}
                                </div>
                            </li>
                            ))}
                    </ul>
                    <ListInput
                        inputName={"New list"}
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

function ListInput({inputName, handleInput}) {
    return (
        <div className="max-w-xs mx-auto">
            <input
                id={inputName}
                type={inputName}
                placeholder={inputName}
                onChange={handleInput}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}

function AddNewShoppingListButton({ newShoppingListName,  setShoppingLists}) {
    function handleSubmit() {
        console.log("start to submit:" + JSON.stringify(newShoppingListName))
        const url = 'http://localhost:5001/api/auth/shopping-list'
        const token = localStorage.getItem("authToken")
        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newShoppingListName,
            }),
        }

        fetch(url, options)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok while creating new shopping lists');
                }

                const data = await response.json();
                setShoppingLists(data);
            })
            .then(data => console.log('Success (create shopping lists):'+ data))
            .catch(error => console.error('Error:', error));
    }

    return (
        <div>
            <button onClick={handleSubmit}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Add New List
            </button>
        </div>
    )
}

function DeleteShoppingListButton({listId, setShoppingLists}) {
    const handleDelete = async () => {
        const url = `http://localhost:5001/api/auth/shopping-list/${listId}`;
        const token = localStorage.getItem("authToken");

        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        };

        fetch(url, options)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok while deleting shopping list')
                }

                const updatedLists = await response.json()
                setShoppingLists(updatedLists)
            })
            .then(data => console.log('Success (edit shopping lists):'+ data))
            .catch(error => console.error('Error deleting shopping list:', error))
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-2 py-1 rounded-md"
        >
            Delete
        </button>
    )
}

function EditShoppingListButton({listId, setShoppingLists, setEditingListId}) {
    function handleEdit() {
        setEditingListId(listId)
    }

    return (
        <button
            onClick={handleEdit}
            className="bg-red-500 text-white px-2 py-1 rounded-md"
        >
            Edit
        </button>
    )
}

function SaveShoppingListButton({listId, setShoppingLists, setEditingListId}) {
    function handleEdit() {
        setEditingListId(null)
    }

    return (
        <button
            onClick={handleEdit}
            className="bg-red-500 text-white px-2 py-1 rounded-md"
        >
            Save
        </button>
    )
}
