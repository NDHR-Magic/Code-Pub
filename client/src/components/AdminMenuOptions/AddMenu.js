import React, { useRef } from 'react';
import Button from '../Button';
import Form from '../Form';
import Input from '../Input';
import Label from '../Label';

const AddMenu = (props) => {
    const HandleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <div className="custom-flex py-3">
                <Button onClickEvent={props.goBack}>Go Back</Button>
            </div>

            <Form formTitle={"Add New Menu Item"}>
                <div className="my-2 py-2 form-div">
                    <Label labelFor={"menuItemName"}>Name of Menu Item</Label>
                    <Input
                        type={"text"}
                        placeholder={"Enter Name of Menu Item"}
                        inputID={"menuItemName"}
                        name={"menuItemName"}
                    />
                </div>

                <div className="my-2 py-2 form-div">
                    <Label labelFor={"menuItemPrice"}>Price</Label>
                    <Input
                        type={"text"}
                        placeholder={"Enter Price"}
                        inputID={"menuItemPrice"}
                        name={"menuItemPrice"}
                    />
                </div>

                <div className="my-2 py-2 form-div">
                    <Label labelFor={"menuItemType"}>Drink or Food Item</Label>
                    <select id="menuItemType" required>
                        <option value="food">Food</option>
                        <option value="drink">Drink</option>
                    </select>
                </div>

                <div className="my-2 py-2 form-div">
                    <Label labelFor={"menuItemDesc"}>Description</Label>
                    <textarea id="menuitemDesc" placeholder="Enter description..." maxLength={30} required></textarea>
                    <p className="form-help my-0">Max length 30 chars</p>
                </div>

                <div className="mb-3 pb-3 custom-flex">
                    <Button onClickEvent={HandleSubmit}>Add Menu Item</Button>
                </div>
            </Form>
        </div>
    );
};

export default AddMenu;