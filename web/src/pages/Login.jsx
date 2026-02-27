import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Please fill all fields");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Login failed");
                return;
            }

            // ✅ store token + userId
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user._id);

            navigate("/home");

        } catch (err) {
            setError("Server error");
        }
    };

    return (
        <div style={{ padding: "40px" }}>
            <h2>Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={{ display: "block", marginBottom: "10px" }}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ display: "block", marginBottom: "10px" }}
            />

            <button onClick={handleLogin}>
                Login
            </button>

            <p
                style={{ cursor: "pointer", marginTop: "10px" }}
                onClick={() => navigate("/register")}
            >
                Don't have an account? Register
            </p>
        </div>
    );
}