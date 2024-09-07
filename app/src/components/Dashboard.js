import ShoppingLists from './ShoppingLists'
import { ShoppingListView } from './ShoppingListView'
import { useEffect, useMemo, useState } from 'react'

export default function Dashboard() {
    const [shoppingLists, setShoppingLists] = useState([])
    const [selectedListId, setSelectedListId] = useState(null)

    const selectedList = useMemo(() => {
        if (selectedListId) {
            return shoppingLists.find((list) => list._id === selectedListId)
        }
    }, [selectedListId, shoppingLists])

    useEffect(() => {
        // getting all shopping lists for the authenticated user
        const url = 'http://localhost:5001/api/auth/shopping-lists'
        const token = localStorage.getItem('authToken')
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }

        fetch(url, options)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(
                        'Network response was not ok while get shopping lists'
                    )
                }

                const data = await response.json()
                setShoppingLists(data)
            })
            .then((data) => console.log('Success (get shopping lists):' + data))
            .catch((error) => console.error('Error:', error))
    }, [])

    function addNewItem(newItemName) {
        console.log(newItemName)
        const url = `http://localhost:5001/api/auth/shopping-list/${selectedListId}/item`
        const token = localStorage.getItem('authToken')

        const options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newItemName,
            }),
        }

        fetch(url, options)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(
                        'Network response was not ok while creating new shopping list item'
                    )
                }

                const data = await response.json()
                setShoppingLists(
                    shoppingLists.map((list) => {
                        if (list._id === selectedListId) return data
                        else return list
                    })
                )
            })
            .then((data) =>
                console.log('Success (create shopping list item):' + data)
            )
            .catch((error) => console.error('Error:', error))
    }

    function deleteItem(itemId) {
        const url = `http://localhost:5001/api/auth/shopping-list/${selectedListId}/item/${itemId}`
        const token = localStorage.getItem('authToken')

        const options = {
            method: 'DELETE',
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
                setShoppingLists(
                    shoppingLists.map((list) => {
                        if (list._id === selectedListId) return data
                        else return list
                    })
                )
            })
            .then((data) =>
                console.log('Success (deleting shopping list item):' + data)
            )
            .catch((error) => console.error('Error:', error))
    }

    return (
        <div className="flex h-screen bg-gray-100 gap-4">
            <ShoppingLists
                shoppingLists={shoppingLists}
                setShoppingLists={setShoppingLists}
                setSelectedListId={setSelectedListId}
            />
            <ShoppingListView
                selectedList={selectedList}
                addNewItem={addNewItem}
                deleteItem={deleteItem}
            />
        </div>
    )
}
