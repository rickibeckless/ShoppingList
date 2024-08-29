import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function AllLists() {
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const { username } = useParams();

    const [lists, setLists] = useState([]);
    const [itemsByList, setItemsByList] = useState({});

    useEffect(() => {
        async function getListData() {
            try {
                const response = await fetch(`http://localhost:8080/api/list/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch list data");
                };
                const listData = await response.json();
                setLists(listData);

                const itemsData = await Promise.all(
                    listData.map(async (list) => {
                        const itemsResponse = await fetch(`http://localhost:8080/api/list/items/${userId}/${list._id}`);
                        if (itemsResponse.ok) {
                            const items = await itemsResponse.json();
                            return { listId: list._id, items };
                        };
                        return { listId: list._id, items: [] };
                    })
                );

                const itemsMap = itemsData.reduce((acc, curr) => {
                    acc[curr.listId] = curr.items;
                    return acc;
                }, {});

                setItemsByList(itemsMap);
            } catch (error) {
                console.error("Error fetching list or item data:", error);
            };
        };

        getListData();
    }, [userId]);

    return (
        <div className="all-lists">
            <h1>All Lists</h1>
            <div id="all-lists-list-holder">
                {lists.map((list) => (
                    <ul key={list._id} className="all-lists-list">
                        <Link to={`/${username}/lists/${list._id}`} id="all-lists-list-link">
                            <li>
                                <h3>{list.title}</h3>
                            </li>
                            <li>
                                <h4>{list.notes}</h4>
                            </li>

                            {itemsByList[list._id]?.map((item) => (
                                <>
                                    <li key={item._id} className={`${item.isPurchased ? 'checked' : ''} list-info all-lists-list-item`}>
                                        <p>Item: {item.name}</p>
                                        <p>Type: {item.type}</p>
                                        <p>Notes: {item.notes}</p>
                                        <p>Price: ${item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Importance: {item.importance}</p>
                                    </li>
                                </>
                            ))}
                        </Link>
                    </ul>
                ))}
            </div>
        </div>
    );
};