// src/components/CategoryLV2List.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import CategoryLV2Form from './CategoryLV2Form';
import { Link } from 'react-router-dom';
import ViewCategoryLV2Page from './ViewCategoryLV2Page';
import AddImagePage from './AddImagePage';
import Menu from '../Layout/menu';
import Footerweb from '../Layout/footer';
import Navbar from '../Layout/navbar';
const CategoryLV2List = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [searchCategoryName, setSearchCategoryName] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [page, limit, searchCategoryName]);

  const fetchCategories = async () => {
    try {
      let response;

      if (searchCategoryName.trim() === '') {
        response = await axios.get(`/admin/category-level-2/api/admin/category-list?page=${page}&limit=${limit}`);
      } else {
        response = await axios.get(`/admin/category-level-2/api/admin/category-level-2-by-name/list/${searchCategoryName}?page=${page}&limit=${limit}`);
      }

      setCategories(response.data.listResult);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleView = (category) => {
    setSelectedCategory(category);
    setIsViewing(true);
    setIsEditing(false);
    setIsAddingImage(false);
  };

  const handleDelete = async (categoryId) => {
    try {
      
      await axios.delete(`/admin/category-level-2/api/admin/delete-category-level-2/${categoryId}`);
      setCategories((prevCategories) => prevCategories.filter((category) => category.categorylvid !== categoryId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing) {
        await axios.put(`/admin/category-level-2/api/admin/update-category-level-2/${selectedCategory.categorylvid}`, formData);
      } else {
        await axios.post('/admin/category-level-2/api/admin/create-category-level-2', formData);
      }
      fetchCategories();
      setIsEditing(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedCategory(null);
    setIsAddingImage(false);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsViewing(false);
    setIsEditing(true);
    setIsAddingImage(false);
  };

  const handleCancelView = () => {
    setIsViewing(false);
    setSelectedCategory(null);
    setIsAddingImage(false);
  };

  const handleAddImage = (categorylvid) => {
    setIsAddingImage(true);
    setSelectedCategory(categories.find((category) => category.categorylvid === categorylvid));
    setIsViewing(false);
    setIsEditing(false);
  };

  const handleSearch = () => {
    setPage(1);
    fetchCategories();
  };

  const handleUploadSuccess = () => {
    setUploadSuccess('Image uploaded successfully');
    setUploadError('');
    fetchCategories();
  };

  const handleUploadError = () => {
    setUploadSuccess('');
    setUploadError('Error uploading image');
  };
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1); // Đặt lại trang về 1 khi giới hạn thay đổi
  };
  return (
    <div id="wrapper">
    <Navbar />

<div id="content-wrapper" className="d-flex flex-column">
<div id="content" className="d-flex" >

<div  class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"  id="accordionSidebar">
  <Menu />
  </div>
<div className="container d-flex flex-column">
<div class="card shadow mb-4">
  <div class="card-header py-3">
    <h6 class="m-0 font-weight-bold text-primary">Category level 2 list</h6>
  </div>
  <div class="card-body">
    <Link to="/add-category-level-2" className="btn btn-primary mt-3"> Add Category level 2</Link>
    <br/>
    <br/>
        <div className="mb-3">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <label htmlFor="searchCategoryName" className="form-label">Search by Category Name</label>
                <input
                  type="search"
                  className="form-control me-2"
                  id="searchCategoryName"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchCategoryName}
                  onChange={(e) => setSearchCategoryName(e.target.value)}
                />
                <button className="btn btn-outline-success" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </nav>
        </div>
 {/* Thêm nút select cho việc chọn giới hạn */}
 <div className="row ">
 <div className="col-sm-12 col-md-1">
 <div class="dataTables_length" id="dataTable_length">

  <select
    id="limitSelect"
    name="dataTable_length"
    aria-controls="dataTable"
    className="custom-select custom-select-sm form-control form-control-sm"
    value={limit}
    onChange={handleLimitChange}
  >
       <option value="3">3</option>
    <option value="10">10</option>
    <option value="15">15</option>
    <option value="20">20</option>
  </select>
 <br/>
</div>
</div>
</div>
        {isEditing ? (
          <CategoryLV2Form onSubmit={handleFormSubmit} onCancel={handleCancelEdit} category={selectedCategory} />
        ) : (
          <>
            {isViewing && (
              <ViewCategoryLV2Page category={selectedCategory} onCancel={handleCancelView} />
            )}
            {isAddingImage && (
              <AddImagePage match={{ params: { categorylvid: selectedCategory?.categorylvid } }} />
            )}
            {!isViewing && !isAddingImage && (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Category ID</th>
                    <th>Category Name</th>
                    <th>Category Image Logo</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.categorylvid}>
                      <td>{category.categorylvid}</td>
                      <td>{category.categorylvname}</td>
                      <td>
                        <img src={`/images/${category.categoryimageslogo}`} style={{ width: '50px', height: '50px' }} alt="Category Logo" />
                      </td>
                      <td>
                        <button className="btn btn-info" onClick={() => handleView(category)}>
                          View
                        </button>
                        <button className="btn btn-warning" onClick={() => handleEdit(category)}>
                          Edit
                        </button>
                        <button className="btn btn-success ms-2" onClick={() => handleAddImage(category.categorylvid)}>
                          Add Image
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(category.categorylvid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <div className="col-sm-12 col-md-7">
  <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
    <ul className="pagination">
      <li className={`paginate_button page-item previous ${page === 1 ? 'disabled' : ''}`}>
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          className="page-link"
          aria-controls="dataTable"
          data-dt-idx="0"
          tabIndex="0"
          disabled={page === 1}
        >
          Previous
        </button>
      </li>

      {[...Array(totalPages).keys()].map((pageNumber) => (
        <li key={pageNumber} className={`paginate_button page-item ${page === pageNumber + 1 ? 'active' : ''}`}>
          <button
            onClick={() => setPage(pageNumber + 1)}
            className="page-link"
            aria-controls="dataTable"
            data-dt-idx={pageNumber + 1}
            tabIndex="0"
          >
            {pageNumber + 1}
          </button>
        </li>
      ))}

      <li className={`paginate_button page-item next ${page === totalPages ? 'disabled' : ''}`}>
        <button
          onClick={() => setPage((prevPage) => (page < totalPages ? prevPage + 1 : page))}
          className="page-link"
          aria-controls="dataTable"
          data-dt-idx={totalPages + 1}
          tabIndex="0"
          disabled={page === totalPages}
        >
          Next
        </button>
      </li>
    </ul>
  </div>
</div>
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
      {uploadSuccess && <div className="alert alert-success mt-3">{uploadSuccess}</div>}
      {uploadError && <div className="alert alert-danger mt-3">{uploadError}</div>}
    </div>
    </div>
    </div>
    </div>
    </div>

  );
};

export default CategoryLV2List;
