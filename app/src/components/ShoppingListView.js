import {ShoppingListItem} from "./ShoppingListItem";

export const ShoppingListView = ({ selectedList }) => {
    return selectedList ? (
        <div className="p-8 flex justify-center flex-grow">
            {selectedList.name}
            {selectedList.items?.map((item) => (
                <ShoppingListItem item={item} />
            ))}
        </div>
    ) : (
        <div>
        Please select a list to  view
        </div>
    )
}