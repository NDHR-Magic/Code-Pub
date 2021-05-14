import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import StoreItem from "../components/StoreItem";

const placeholderStore = [
    {
        "id": 1,
        "name": "T-shirt",
        "image": "https://www.loveyourdog.com/wp-content/uploads/2020/04/Chihuahua-Relaxing-Indoors.jpg",
        "price": 19.99
    },
    {
        "id": 2,
        "name": "React Shot Glass",
        "image": "./Images/StoreItems/react-shot-glass.png",
        "price": 12.99
    },
    {
        "id": 3,
        "name": "Code Pub Mousepad",
        "image": "./Images/StoreItems/Mouse-pad.png",
        "price": 14.99
    },
    {
        "id": 4,
        "name": "Code Pub Mousepad",
        "image": "./Images/StoreItems/Mouse-pad.png",
        "price": 14.99
    },
    {
        "id": 5,
        "name": "Code Pub Mousepad",
        "image": "./Images/StoreItems/Mouse-pad.png",
        "price": 14.99
    }
]

function Store() {
    // const [storeItems, setStoreItems] = useState([]);

    // useEffect(async () => {
    //     const data = await API.blah
    //     setStoreItems(data)
    // }, [])

    //    handleSelectChange function here

    return (
        <div className="store">
            <div className="container">
                <div className="filter-container">
                    <Filter></Filter>
                </div>

                <div className="row">
                    {placeholderStore.map((item) => (
                        <StoreItem
                            itemName={item.name}
                            itemImg={item.image}
                            itemPrice={item.price}
                            key={item.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Store;