import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem } from '../../actions/menuActions';
import Button from '../Button';
import Form from '../Form';
import Input from '../Input';
import Label from '../Label';
import MessageBox from "../MessageBox";
import Loading from "../LoadingScreen";

const AddMenu = (props) => {
    const dispatch = useDispatch();
    const nameRef = useRef();
    const typeRef = useRef();
    const descRef = useRef();
    const priceRef = useRef();
    const fileRef = useRef();

    const menuItem = useSelector(state => state.menuItem);
    const { error, loading, menuItem: newMenuItem } = menuItem;

    const HandleSubmit = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        if (nameRef.current.value, typeRef.current.value, descRef.current.value) {
            if (!priceRef.current.value) {
                priceRef.current.value = 0.00;
            }

            const formData = new FormData();
            formData.append("name", nameRef.current.value);
            formData.append("desc", descRef.current.value);
            formData.append("price", parseFloat(priceRef.current.value).toFixed(2));
            formData.append("file", fileRef.current.files[0]);

            await dispatch(createMenuItem(formData, typeRef.current.value));
        }
    }

    return (
        <div>
            <div className="custom-flex py-3">
                <Button onClickEvent={props.goBack}>Go Back</Button>
            </div>

            <Form formTitle={"Add New Menu Item"} action={"/api/drinks/"} method={"POST"} onSubmitEvent={HandleSubmit}>
                <div className="my-2 py-2 form-div">
                    <Label labelFor={"menuItemName"}>Name of Menu Item</Label>
                    <Input
                        type={"text"}
                        placeholder={"Enter Name of Menu Item"}
                        inputID={"menuItemName"}
                        name={"menuItemName"}
                        reference={nameRef}
                    />
                </div>

                <div className="my-2 py-2 form-div">
                    <Label labelFor={"menuItemPrice"}>Price</Label>
                    <Input
                        type={"number"}
                        placeholder={"Enter Price"}
                        inputID={"menuItemPrice"}
                        name={"menuItemPrice"}
                        reference={priceRef}
                    />
                </div>

                <div className="my-2 py-2 form-div">
                    <Label labelFor={"menuItemType"}>Drink or Food Item</Label>
                    <select id="menuItemType" ref={typeRef} required>
                        <option value="food">Food</option>
                        <option value="drink">Drink</option>
                    </select>
                </div>

                <div className="my-2 py-2 form-div">
                    <Label labelFor={"menuItemDesc"}>Description</Label>
                    <textarea ref={descRef} id="menuitemDesc" placeholder="Enter description..." maxLength={30} required></textarea>
                    <p className="form-help my-0">Max length 30 chars</p>
                </div>

                <div className="my-2 py-2 form-div">
                    <Label labelFor={"menuItemImg"}>Upload image</Label>
                    <Input
                        type={"file"}
                        inputID={"menuItemImg"}
                        inputName={"imgFile"}
                        reference={fileRef}
                    />
                </div>

                <div className="mb-3 pb-3 custom-flex">
                    <button type="button" onClick={e => HandleSubmit(e)} className="btn btn-primary">Add Menu Item</button>
                </div>
                <p className="center-text">{/* Check if loading */}
                    {loading
                        ? (<Loading />)
                        // Check if error
                        : error
                            ? (<MessageBox variant="danger">{error}</MessageBox>)
                            // Check if menuItem and newMenuItem and then render message
                            : menuItem && (newMenuItem) && (
                                <MessageBox variant="success">Created menu item</MessageBox>
                            )}</p>
            </Form>
        </div>
    );
};

export default AddMenu;