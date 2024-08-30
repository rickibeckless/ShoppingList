import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/userStyles/accountFormStyles.css";

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');
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
        <div className="signup">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={form.username}
                        onChange={(e) => updateForm({ username: e.target.value })}
                    />
                </div>
                
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </div>
                
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </div>
                
                <button type="submit">Signup</button>
            </form>

            <aside>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </aside>
        </div>
    );
};