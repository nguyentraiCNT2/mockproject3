import React, { useState } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import Menu from '../Layout/menu';
import Footerweb from '../Layout/footer';
import Navbar from '../Layout/navbar';
const AddCategoryPage = () => {
  const [formData, setFormData] = useState({
    categoryname: '',
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
      await axios.post('/admin/category/api/admin/create-category', formData);

      setSuccessMessage('Category added successfully');
      setErrorMessage('');
      setFormData({
        categoryname: '',
      });
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error adding category');
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
                <h6 class="m-0 font-weight-bold text-primary">Add Product</h6>
              </div>
              <div class="card-body">
                <Link to="/category-list" className="btn btn-primary">
                  Back to list
                </Link>
                <br />
                <br />
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form className="form-category col-sm-12 col-md-10" onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="categoryname" className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              id="categoryname"
              name="categoryname"
              value={formData.categoryname}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Category</button>
        </form>
        <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryPage;
