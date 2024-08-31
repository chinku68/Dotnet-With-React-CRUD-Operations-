import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: '',
    name: '',
    jobTitle: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    fetch('/api/account/getAllEmployees', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Failed to fetch employee data.');
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/account/deleteEmployee/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.text())
      .then(data => {
        setMessage(data);
        if (data.includes("successfully")) {
          setEmployees(employees.filter(employee => employee.id !== id));
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Failed to delete employee.');
      });
  };

  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee({
      id: '',
      name: '',
      jobTitle: '',
      phone: '',
      email: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee({ ...selectedEmployee, [name]: value });
  };

  const handleSaveChanges = () => {
    fetch(`/api/account/updateEmployee/${selectedEmployee.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: selectedEmployee.id,
        name: selectedEmployee.name,
        jobTitle: selectedEmployee.jobTitle,
        phone: selectedEmployee.phone,
        email: selectedEmployee.email,
      }),
    })
      .then(response => response.text())
      .then(data => {
        setMessage(data);
        if (data.includes("successfully")) {
          setEmployees(employees.map(emp => emp.id === selectedEmployee.id ? selectedEmployee : emp));
          handleCloseModal();
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Failed to update employee.');
      });
  };


  return (
    <div className="employee-list-container">
      <h2 className="employee-list-title">Employee Details</h2>
      {message && <p className="error-message">{message}</p>}
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Delete</th>
            <th>Edit Details</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>

              <td>{employee.phone}</td>
              <td>{employee.email}</td><td>{employee.jobTitle}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="update-button"
                  onClick={() => handleOpenModal(employee)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" size="lg" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Employee Details</h5>
                <button type="button" className="close-button" onClick={handleCloseModal}>
                  <span aria-hidden="true">X</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>ID</label>
                    <input type="text" className="form-control" value={selectedEmployee.id} disabled />
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" value={selectedEmployee.name} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Job Title</label>
                    <input type="text" className="form-control" name="jobTitle" value={selectedEmployee.jobTitle} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="text" className="form-control" name="phone" value={selectedEmployee.phone} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={selectedEmployee.email} onChange={handleInputChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="clos-button" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
