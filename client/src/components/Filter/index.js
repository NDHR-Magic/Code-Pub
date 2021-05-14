import React from 'react';

function Filter(props) {
    return (
        <div className="row">
            <div className="col-1">
                <select className="form-select" onClick={props.handleSelectChange}>
                    <option defaultValue>Filter By:</option>
                    <option value="priceHigh">Price(Lowest to Highest)</option>
                    <option value="priceLow">Price(Highest to Lowest)</option>
                    <option value="clothing">Clothing</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
    )
}

export default Filter;