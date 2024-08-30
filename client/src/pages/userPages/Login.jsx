import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from '../../context/AuthContext';
import "../../css/userStyles/accountFormStyles.css";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { login } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Login failed');
            };

            const data = await res.json();

            localStorage.setItem("token", data.token);
            login(data.token);
            navigate("/");
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message);
        };
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="identifier">Email or Username:</label>
                    <input 
                        type="text" 
                        id="identifier" 
                        name="identifier" 
                        value={form.email} 
                        onChange={(e) => setForm({ ...form, email: e.target.value })} 
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={form.password} 
                        onChange={(e) => setForm({ ...form, password: e.target.value })} 
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <aside>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </aside>
        </div>
    );
};