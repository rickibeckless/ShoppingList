import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function AllLists() {
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const { username } = useParams();

    const [lists, setLists] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(`http://localhost:8080/api/list/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                };
                const data = await response.json();
                setLists(data);
                console.log(data)
            } catch (error) {
                console.error(error);
            }
        };
        getData();
        return;
    }, [userId]);

    return (
        <div className="all-lists">
            <h1>All Lists</h1>
            <div>
                {lists.map((list) => (
                    <ul>
                        <li><Link to={`/${username}/lists/${list._id}`}>{list.title}</Link></li>
                        <li>{list.notes}</li>
                        <li>Item:
                            {list.items}
                        </li>
                        <li>Id: {list._id}</li>
                    </ul>
                ))}
            </div>
        </div>
    );
};