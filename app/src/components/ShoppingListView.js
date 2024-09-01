import {ShoppingListItem} from "./ShoppingListItem";
import React, {useState} from "react";

export const ShoppingListView = ({selectedList}) => {
    const [newItemName, setNewItemName] = useState('')

    return (
        <div>
            {selectedList ? (
            <div className="min-w-96 p-4 bg-white">
                <h1 className="text-2xl font-semibold text-center mb-4">{selectedList.name}</h1>
                <ul>
                    {selectedList.items?.map((item) => (
                        <ShoppingListItem item={item}/>
                    ))}
                </ul>
                <NewItemNameInput
                    inputName={"Add a grocery item"}
                    handleInput={(event) => {
                        setNewItemName(event.target.value)
                        console.log('newItemName: ' + newItemName)
                    }}
                />
                <AddNewItemButton
                    newItemName={newItemName}
                    selectedListId={selectedList._id}
                    // setShoppingLists={setShoppingLists}
                />
            </div>
            ) : (
            <div>
                Please select a list to view
            </div>
            )}
        </div>
    )
}

function NewItemNameInput({inputName, handleInput}) {
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

function AddNewItemButton({newItemName, selectedListId}) {
    function handleSubmit() {
        console.log(newItemName)
        const url = `http://localhost:5001/api/auth/shopping-list/${selectedListId}/item`
        const token = localStorage.getItem("authToken")
        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newItemName,
            }),
        }

        fetch(url, options)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok while creating new shopping list item');
                }

                const data = await response.json();
                // setShoppingLists(data);
            })
            .then(data => console.log('Success (create shopping list item):' + data))
            .catch(error => console.error('Error:', error));
    }

    return (
        <div>
            <button onClick={handleSubmit}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Add New Item
            </button>
        </div>
    )
}