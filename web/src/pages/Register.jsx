import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (!username || !email || !password) {
            setError("Please fill all fields");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Registration failed");
                return;
            }

            alert("Registration successful! Please login.");
            navigate("/");

        } catch (err) {
            setError("Server error");
        }
    };

    return (
        <div style={{ padding: "40px" }}>
            <h2>Register</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ display: "block", marginBottom: "10px" }}
            />

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: "block", marginBottom: "10px" }}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block", marginBottom: "10px" }}
            />

            <button onClick={handleRegister}>
                Register
            </button>

            <p
                style={{ cursor: "pointer", marginTop: "10px" }}
                onClick={() => navigate("/")}
            >
                Already have an account? Login
            </p>
        </div>
    );
}