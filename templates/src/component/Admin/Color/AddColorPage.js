// src/components/AddColorPage.js
import React, { useState } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import Menu from '../Layout/menu';
import Footerweb from '../Layout/footer';
import Navbar from '../Layout/navbar';
const AddColorPage = ({ history }) => {
  const [formData, setFormData] = useState({
    colorname: '',
    colorCore: '',
    // Add other fields related to the Color entity
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the API to add the color
      await axios.post('/admin/color/api/admin/create-color', formData);

      // If successful, set success message and clear fields
      setSuccessMessage('Color added successfully');
      setErrorMessage('');
      setFormData({
        colorname: '',
        colorCore: '',
        // Clear other fields related to the Color entity
      });
    } catch (error) {
      // If there's an error, set error message and don't clear fields
      setSuccessMessage('');
      setErrorMessage('Error adding color');
    }
  };

  return (
    <div id="wrapper">
      <Navbar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content" className="d-flex">
          <div class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Menu />
          </div>
          <div className="container col-sm-12 col-md-6">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Add Color</h6>
              </div>
              <div class="card-body">
                <Link to="/color-list" className="btn btn-primary">
                  Back to list
                </Link>
                <br />
                <br />
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label htmlFor="colorname" className="form-label">Color Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="colorname"
                      name="colorname"
                      value={formData.colorname}
                      onChange={handleInputChange}
                    />
                     <label htmlFor="colorCore" className="form-label">Color Core</label>
                    <input
                      type="text"
                      className="form-control"
                      id="colorCore"
                      name="colorCore"
                      value={formData.colorCore}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Add other input fields related to the Color entity */}
                  <button type="submit" className="btn btn-primary">Add Color</button>
                  <br />
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddColorPage;
