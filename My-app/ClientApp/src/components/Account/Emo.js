import React, { useState } from 'react';
import './Account.css';


const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('Phone', phone);
    formData.append('JobTitle', jobTitle);
    
    fetch('/api/account/create', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        setMessage(data);
        alert(data);
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Failed to create employee.');
      });
     
  };

  return (
    <div className="create-employee-container">
      <h1>Create Employee</h1>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Create Employee</button>
      </form>
      {/* {message && <p className="message">{message}</p>} */}
    </div>
  );
};

export default CreateEmployee;

