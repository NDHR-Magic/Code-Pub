import React, {useEffect, useState} from "react";
import Filter from "../components/Filter";
import StoreItem from "../components/StoreItem";

function Store() {
    // const [storeItems, setStoreItems] = useState([]);

    // useEffect(async () => {
    //     const data = await API.blah
    //     setStoreItems(data)
    // }, [])

//    handleSelectChange function here

    return (
        <div className="container">
        <Filter></Filter>
        <StoreItem>
            
        </StoreItem>
        </div>
    )
}

export default Store;