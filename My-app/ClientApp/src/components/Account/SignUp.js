import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneno: ""
  });

  const userRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleToLogIn =()=>{
    navigate('/login');
  }

  const submitHandler = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("UserName", form.username);
    formData.append("Email", form.email);
    formData.append("Phone", form.phoneno);
    formData.append("Type", form.password);

    fetch("api/account/adduser", {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        if (data === "Account created successfully") {
          navigate('/login');
        }

      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={submitHandler}>
        <h2 className="signup-title">Sign Up</h2>
        <input
          type='text'
          name='username'
          value={form.username}
          placeholder='Username'
          ref={userRef}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type='email'
          name='email'
          value={form.email}
          placeholder='Email'
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type='tel'
          name='phoneno'
          value={form.phoneno}
          placeholder='Phone Number'
          onChange={handleChange}
          className="signup-input"
        />
        <select
          name='password'
          value={form.password}
          onChange={handleChange}
          className="signup-input"
        >
          <option value=''>Select type</option>
          <option value='Admin'>Admin</option>
          <option value='User'>User</option>
        </select>

        <button type='submit' className="signup-button">Sign Up</button>
        <p className="login-text">Already have an account <span onClick={handleToLogIn}>Login</span></p>
        </form>
      
    </div>
  );
};

export default SignUp;

