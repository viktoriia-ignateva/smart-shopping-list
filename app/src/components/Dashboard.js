import ShoppingLists from './ShoppingLists'
import { ShoppingListView } from './ShoppingListView'
import { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function Dashboard() {
    const [error, setError] = useState(null)
    const [shoppingLists, setShoppingLists] = useState([])
    const [selectedListId, setSelectedListId] = useState(null)
    const token = localStorage.getItem('authToken')

    const selectedList = useMemo(() => {
        if (selectedListId) {
            return shoppingLists.find((list) => list._id === selectedListId)
        }
    }, [selectedListId, shoppingLists])

    // auto select the list if only one list available
    useEffect(() => {
        if (shoppingLists.length === 1) {
            setSelectedListId(shoppingLists[0]._id)
        }
    }, [shoppingLists])

    useEffect(() => {
        // getting all shopping lists for the authenticated user
        const url = 'http://localhost:5001/api/auth/shopping-lists'
        const token = localStorage.getItem('authToken')
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            redirect: 'follow',
        }

        fetch(url, options)
            .then(async (response) => {
                if (!response.ok) {
                    setError(
                        new Error(
                            'Network response was not ok while get shopping lists'
                        )
                    )
                }

                const data = await response.json()
                setShoppingLists(data)
            })
            .then((data) => console.log('Success (get shopping lists):' + data))
            .catch((error) => {
                console.error('Error:', error)
            })
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

    const markItemAsBought = (itemId) => {
        const url = `http://localhost:5001/api/auth/shopping-list/${selectedListId}/item/${itemId}`
        const token = localStorage.getItem('authToken')

        const options = {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bought: true,
            }),
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

    const addItemSuggestionToList = (itemId) => {
        const url = `http://localhost:5001/api/auth/shopping-list/${selectedListId}/item/${itemId}`
        const token = localStorage.getItem('authToken')

        const options = {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bought: false,
            }),
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

    if (error || !token) return <Navigate to="/login" />

    return (
        <div className="flex bg-gray-50 w-9/12 mt-10 min-h-96 max-w-4xl">
            <ShoppingLists
                selectedListId={selectedListId}
                shoppingLists={shoppingLists}
                setShoppingLists={setShoppingLists}
                setSelectedListId={setSelectedListId}
            />
            <ShoppingListView
                selectedList={selectedList}
                addNewItem={addNewItem}
                deleteItem={deleteItem}
                markItemAsBought={markItemAsBought}
                addItemSuggestionToList={addItemSuggestionToList}
            />
        </div>
    )
}
