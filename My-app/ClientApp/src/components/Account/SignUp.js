import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const submitHandler = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", form.username);
    formData.append("Email", form.email);
    formData.append("phone", form.phoneno);
    formData.append("password", form.password);

    fetch("api/account/signup", {
      method: "POST",
      body: formData
    })
      .then(response => response.text()) 
      .then(data => {
        alert(data);
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
    <div>
      <form onSubmit={submitHandler}>
        <input type='text' name='username' value={form.username} placeholder='Username' ref={userRef} onChange={handleChange} />
        <input type='email' name='email' value={form.email} placeholder='Email' onChange={handleChange} />
        <input type='tel' name='phoneno' value={form.phoneno} placeholder='Phone Number' onChange={handleChange} />
        <input type='password' name='password' value={form.password} placeholder='Create Password' onChange={handleChange} />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
