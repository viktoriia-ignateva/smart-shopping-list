export const ShoppingListItem = ({ item }) => {
    return <li key={item._id}>
        {item.name}
    </li>
}