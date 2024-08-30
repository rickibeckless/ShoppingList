import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "../../css/listStyles/NewListStyles.css";

export default function NewList() {
    const navigate = useNavigate();

    const { userId } = useContext(AuthContext);
    const { username } = useParams();

    const [form, setForm] = useState({
        userId,
        title: '',
        notes: '',
        items: [],
    });

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/list/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                navigate(`/${username}/lists`);
            } else {
                alert(data.message);
            };

        } catch (error) {
            console.error(error);
        };
    };
    
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    };

    return (
        <div className="new-list">
            <h1>New List</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={form.title}
                        onChange={(e) => updateForm({ title: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="notes">Notes</label>
                    <textarea 
                        id="notes" 
                        name="notes"
                        value={form.notes}
                        onChange={(e) => updateForm({ notes: e.target.value })}
                    ></textarea>
                </div>

                <button type="submit">Create New List</button>
            </form>
        </div>
    );
};