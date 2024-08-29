import React, {useState, useEffect} from "react";

export default function ShoppingLists() {
    const [newShoppingListName, setNewShoppingListName] = useState('')
    const [shoppingLists, setShoppingLists] = useState([])

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
                    throw new Error('Network response was not ok while get shopping lists');
                }

                const data = await response.json();
                setShoppingLists(data);
            })
            .then(data => console.log('Success (get shopping lists):'+ data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
            <div className="w-full max-w-md p-4 bg-white">
                <h1 className="text-2xl font-semibold text-center mb-4">My Shopping Lists</h1>
                <div className="grid grid-cols-1 gap-4">
                    <ul>
                        { shoppingLists.map(list => (
                        <li key={list._id}>{list.name}</li>
                        ))}
                    </ul>
                    <ListInput
                        inputName={"New list"}
                        handleInput={(event) => {
                            setNewShoppingListName(event.target.value)
                            console.log("list name " + JSON.stringify(newShoppingListName)) //debug
                        }}
                    />
                    <AddNewShoppingListButton
                        newShoppingListName={newShoppingListName}
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

function AddNewShoppingListButton({ newShoppingListName }) {
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
                listName: newShoppingListName,
            }),
        }

        fetch(url, options)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok while creating new shopping lists');
                }
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
