// src/components/AddCategoryLV2Page.js
import React, { useState } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import Menu from '../Layout/menu';
import Footerweb from '../Layout/footer';
import Navbar from '../Layout/navbar';
const AddCategoryLV2Page = () => {
  const [formData, setFormData] = useState({
    categorylvid: '',
    categorylvname: '',
    categoryimageslogo: '',
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
      // Gửi dữ liệu đến API để thêm người dùng
      await axios.post('http://localhost:1412/admin/category-level-2/api/admin/create-category-level-2', formData);

      // Nếu thành công, đặt thông báo thành công và làm trắng các trường
      setSuccessMessage('Category level 2 added successfully');
        setErrorMessage('');
      setFormData({
        categorylvid: '',
        categorylvname: '',
        categoryimageslogo: '',
      });

    } catch (error) {
      // Nếu có lỗi, đặt thông báo lỗi và không làm trắng các trường
      setSuccessMessage('');
      setErrorMessage('Error adding category level 2');
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
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="categorylvname" className="form-label">Category Level Name</label>
          <input
            type="text"
            className="form-control"
            id="categorylvname"
            name="categorylvname"
            value={formData.categorylvname}
            onChange={handleInputChange}
          />
        </div>
        {/* Thêm các trường nhập liệu khác tương tự */}
        <button type="submit" className="btn btn-primary">Add Category Level 2</button>
      
      </form>

      <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryLV2Page;
