import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { Outlet } from "react-router-dom";
import './App.css';

function App() {
    const navigate = useNavigate();
    const userToken = localStorage.getItem('token');
    const { userId } = useContext(AuthContext);
    const [user, setUser] = useState('');

    useEffect(() => {
        if (!userToken) {
            navigate('/login');
        };

        if (!userId) {
            return;
        }

        async function getUser() {
            try {
                const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                };
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            };
        };

        getUser();
    }, [userToken, userId, navigate]);

    return (
        <div className="App">
            <header className="App-header">
                <nav>
                    {userToken && (
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <p>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            navigate('/login');
                                        }}
                                    >
                                        Logout
                                    </button>
                                </p>
                            </li>
                            <li>
                                <Link to={`/${user.username}/new-list`}>New List</Link>
                            </li>
                            <li>
                                <Link to={`/${user.username}/lists`}>Lists</Link>
                            </li>
                        </ul>
                    )}
                </nav>
                <h1>Yo</h1>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default App;