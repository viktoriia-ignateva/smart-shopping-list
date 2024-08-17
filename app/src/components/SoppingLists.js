function Item() {
    return (
        <li> 1 </li>
    )
}

export default function SoppingLists() {
    return (
        <div className="flex justify-center bg-gray-100">
            <div className="w-full max-w-md p-4 bg-white">
                <h1 className="text-2xl font-semibold text-center mb-4">Your Lists</h1>
                <div className="grid grid-cols-1 gap-4">
                    <Item/>
                    <Item/>
                    <Item/>
                </div>
            </div>
        </div>
    )
}