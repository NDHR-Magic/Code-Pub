import React from 'react';

function Filter(props) {
    return (
        <div className="row">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Filter By:
                    </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href="#">Price (Highest to Lowest)</a></li>
                    <li><a className="dropdown-item" href="#">Price (Lowest to Highest)</a></li>
                    <li><a className="dropdown-item" href="#">Clothing</a></li>
                    <li><a className="dropdown-item" href="#">Other</a></li>
                </ul>
            </div>

        </div>
    )

}

export default Filter;