import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function List() {
    const { userId } = useContext(AuthContext);
    const { username, listId } = useParams();

    const [popup, setPopup] = useState(false);
    const [list, setList] = useState([]);
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({
        userId: userId,
        listId,
        name: '', 
        type: '', 
        notes: '',
        price: 0,
        quantity: 1, 
        importance: 1,
        isPurchased: false,
    });

    useEffect(() => {
        async function getListData() {
            try {
                const response = await fetch(`http://localhost:8080/api/list/${userId}/${listId}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch list data");
                };
                const data = await response.json();
                setList(data);
            } catch (error) {
                console.error(error);
            };
        };

        async function getItemData() {
            try {
                const response = await fetch(`http://localhost:8080/api/list/items/${userId}/${listId}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch item data");
                };
                const data = await response.json();
                console.log(data)
                setItems(data);
            } catch (error) {
                console.error(error);
            };
        };

        getListData();
        getItemData();
        return;
    }, [userId, username, listId]);

    async function handleItemAdd(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/list/items/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
        };
    };

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    };

    const showPopup = () => {
        setPopup(true);
    };

    const closePopup = () => {
        setPopup(false);
    };

    const toggleCompleted = async (id) => {
        try {
            const itemToUpdate = items.find(item => item._id === id);
    
            const updatedIsPurchased = !itemToUpdate.isPurchased;
    
            const response = await fetch(`http://localhost:8080/api/list/items/${id}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...itemToUpdate,
                    isPurchased: updatedIsPurchased
                }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to update item");
            };
    
            setItems(prevItems =>
                prevItems.map(item =>
                    item._id === id ? { ...item, isPurchased: updatedIsPurchased } : item
                )
            );
        } catch (error) {
            console.error("Error updating item:", error);
        };
    };

    return (
        <div className="list">
            <h1>{list.title}</h1>
            <h4>{list.notes}</h4>
            <ul>
                {items?.map((item) => (
                    <React.Fragment key={item._id}>
                        <div 
                            className={`${item.isPurchased ? 'checked' : ''} completed-box`} 
                            onClick={() => toggleCompleted(item._id)}
                        ></div>
                        
                        <li className={`${item.isPurchased ? 'checked' : ''} list-info`}>
                            {item.name}
                        </li>
                        <li className={`${item.isPurchased ? 'checked' : ''} list-info`}>
                            {item.type}
                        </li>
                        <li className={`${item.isPurchased ? 'checked' : ''} list-info`}>
                            {item.notes}
                        </li>
                        <li className={`${item.isPurchased ? 'checked' : ''} list-info`}>
                            {item.price}
                        </li>
                        <li className={`${item.isPurchased ? 'checked' : ''} list-info`}>
                            {item.importance}
                        </li>
                        <li className={`${item.isPurchased ? 'checked' : ''} list-info`}>
                            {item.quantity}
                        </li>
                    </React.Fragment>
                ))}

                {popup && (
                    <form className="popup-content">
                        <div>
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={(e) => updateForm({ name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="type">Type</label>
                            <select 
                                id="type"
                                name="type"
                                value={form.type}
                                onChange={(e) => updateForm({ type: e.target.value })}
                            >
                                <option value="grocery">grocery</option>
                                <option value="hygiene">hygiene</option>
                                <option value="clothing">clothing</option>
                                <option value="tech">tech</option>
                                <option value="books">books</option>
                                <option value="household">household</option>
                                <option value="pet">pet</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="notes">Notes</label>
                            <textarea 
                                type="text" 
                                id="notes"
                                name="notes"
                                value={form.notes}
                                onChange={(e) => updateForm({ notes: e.target.value })}
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="price">Price</label>
                            <input 
                                type="number" 
                                id="price"
                                name="price"
                                value={form.price}
                                step=".01"
                                onChange={(e) => updateForm({ price: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="quantity">Quantity</label>
                            <input 
                                type="number" 
                                id="quantity"
                                name="quantity"
                                value={form.quantity}
                                min="1"
                                onChange={(e) => updateForm({ quantity: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="importance">Importance</label>
                            <input 
                                type="number" 
                                id="importance"
                                name="importance"
                                value={form.importance}
                                min="1"
                                max="3"
                                onChange={(e) => updateForm({ importance: e.target.value })}
                            />
                        </div>

                        <button type="button" onClick={closePopup}>Cancel</button>
                        <button type="submit" onClick={handleItemAdd}>Add</button>
                    </form>
                )}
                <button onClick={() => showPopup()}>New Item</button>
            </ul>
        </div>
    );
};