import React, {useEffect, useState} from "react";

export default function ShoppingLists({setSelectedList}) {
    const [newShoppingListName, setNewShoppingListName] = useState('')
    const [shoppingLists, setShoppingLists] = useState([])
    const [editingList, setEditingList] = useState(null)

    useEffect(() => {
        // getting all shopping lists for the authenticated user
        const url = 'http://localhost:5001/api/auth/shopping-lists'
        const token = localStorage.getItem("authToken")
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }

        fetch(url, options)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok while get shopping lists')
                }

                const data = await response.json();
                setShoppingLists(data);
            })
            .then(data => console.log('Success (get shopping lists):' + data))
            .catch(error => console.error('Error:', error))
    }, [])

    // const handleListNameChange = (shoppingLists, list, name) => {
    //     setShoppingLists(shoppingLists.map((li) => {
    //         if (li._id === list._id) {
    //             return {
    //                 ...list,
    //                 name,
    //             }
    //         } else {
    //             return li
    //         }
    //     }))
    // }

    return (
        <div className="min-w-96 p-4 bg-white">
            <h1 className="text-2xl font-semibold text-center mb-4">My Shopping Lists</h1>
            <div className="grid grid-cols-1 gap-4">
                <ul>
                    {shoppingLists.map(list => (
                        <li key={list._id} className="flex justify-between items-center m-2"
                            onClick={() => setSelectedList(list)}>
                            {editingList?._id === list._id ? (
                                <EditShoppingListNameInput
                                    listName={editingList.name}
                                    handleInput={(event) => setEditingList({ ...editingList, name: event.target.value })}
                                />
                            ) : (
                                list.name
                            )}
                            <div className="flex gap-2">
                                <DeleteShoppingListButton
                                    listId={list._id}
                                    setShoppingLists={setShoppingLists}
                                />
                                {editingList?._id === list._id ? (
                                    <SaveShoppingListButton
                                        editingList={editingList}
                                        setEditingList={setEditingList}
                                        setShoppingLists={setShoppingLists}
                                    />
                                ) : (
                                    <EditShoppingListButton
                                        handleEdit={() =>  setEditingList(list)}
                                    />
                                )}
                            </div>

                        </li>
                    ))}
                </ul>
                <NewShoppingListNameInput
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

function NewShoppingListNameInput({inputName, handleInput}) {
    return (
        <div className="max-w-xs mx-auto">
            <input
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id={inputName}
                type={inputName}
                placeholder={inputName}
                onChange={handleInput}
            />
        </div>
    )
}

function EditShoppingListNameInput({listName, handleInput}) {
    return (
        <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            value={listName}
            onChange={handleInput}
        />
    )
}

function AddNewShoppingListButton({newShoppingListName, setShoppingLists}) {
    function handleSubmit() {
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
            .then(data => console.log('Success (create shopping lists):' + data))
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
            .then(data => console.log('Success (edit shopping lists):' + data))
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

function EditShoppingListButton({ handleEdit  }) {
    return (
        <button
            onClick={handleEdit}
            className="bg-red-500 text-white px-2 py-1 rounded-md"
        >
            Edit
        </button>
    )
}

function SaveShoppingListButton({ editingList, setEditingList, setShoppingLists }) {
    function handleEdit() {
        const url = `http://localhost:5001/api/auth/shopping-list/${editingList._id}`
        const token = localStorage.getItem("authToken")
        const options = {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                listName: editingList.name,
            }),
        }

        fetch(url, options)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok while editing new shopping lists');
                }

                const data = await response.json();
                setShoppingLists(data);
                setEditingList(null)
            })
            .then(data => console.log('Success (create shopping lists):' + data))
            .catch(error => console.error('Error:', error));
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
