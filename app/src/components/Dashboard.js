import ShoppingLists from "./ShoppingLists"
import {ShoppingListView} from "./ShoppingListView";
import {useState} from "react";

export default function Dashboard() {
    const [selectedList, setSelectedList] = useState(null)
    return (
        <div className="flex bg-gray-100">
            <ShoppingLists setSelectedList={setSelectedList} />
            <ShoppingListView selectedList={selectedList}/>
        </div>
    )
}