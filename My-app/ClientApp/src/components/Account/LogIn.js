import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Account.css';

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const emailRef = useRef(null);
    const navigate = useNavigate();



    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setError(null);

        if (!form.email || !form.phone) {
            setError("Please fill in both fields.");
            return;
        }

        let formData = new FormData();
        formData.append("Email", form.email);
        formData.append("Phone", form.phone);

        setLoading(true);

        fetch("/api/account/login", {
            method: "POST",
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login failed, please check your credentials.');
                }
                return response.json();
            })
            .then(data => {
                setLoading(false);
                console.log("User Details from Backend:", data);
                if (data.status === 1) {
                    alert("Login successful");
                    sessionStorage.setItem("UserId", data.userId);
                    sessionStorage.setItem("UserName", data.userName);
                    sessionStorage.setItem("UserDetails", JSON.stringify(data)); // Store all user details

                    ;
                    navigate('/');
                } else {
                    setError("Login failed.");
                }
            })
            .catch(error => {
                setLoading(false);
                setError(error.message);
            });
    };

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={submitHandler}>
                <h2 className="login-title">Login</h2>
                <input
                    type='email'
                    name='email'
                    value={form.email}
                    placeholder='Email'
                    ref={emailRef}
                    onChange={handleChange}
                    className="login-input"
                />
                <input
                    type='tel'
                    name='phone'
                    value={form.phone}
                    placeholder='Phone Number'
                    onChange={handleChange}
                    className="login-input"
                />
                <button type='submit' disabled={loading} className="login-button">
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p className="signup-text">
                    Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
                </p>
                {error && <p className="error-text">{error}</p>}
            </form>
        </div>
    );
};

export default Login;


