import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { Outlet } from "react-router-dom";
import LogoutBtn from "./components/LogoutBtn";
import './App.css';

export const local_api_url = import.meta.env.VITE_LOCAL_API_URL;

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
        };

        async function getUser() {
            try {
                const response = await fetch(`${local_api_url}/api/user/${userId}`, {
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
                <nav id="main-nav">
                    {userToken && (
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>

                            <div id="main-nav-list-links">
                                <li>
                                    <Link to={`/${user.username}/new-list`}>New List</Link>
                                </li>
                                <li>
                                    <Link to={`/${user.username}/lists`}>Lists</Link>
                                </li>    
                            </div>

                            <div id="main-nav-profile-links">
                                <li>
                                    Hello, <Link to={`/profile/${user.username}`} title={`${user.username}'s profile`}>{user.username}</Link>!
                                </li>
                                <li>
                                    <LogoutBtn />
                                </li>
                            </div>
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