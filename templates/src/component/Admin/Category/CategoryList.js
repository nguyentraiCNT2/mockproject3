import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import CategoryForm from './CategoryForm';
import { Link } from 'react-router-dom';
import Menu from '../Layout/menu';
import Footerweb from '../Layout/footer';
import CategoryView from './CategoryView';
import Navbar from '../Layout/navbar';
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, [page, limit]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/admin/category/api/admin/category-list?page=${page}&limit=${limit}`);
      setCategories(response.data.listResult);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách thể loại:', error);
    }
  };

  const handleView = (category) => {
    setSelectedCategory(category);
    setIsViewing(true);
    setIsEditing(false);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditing(true);
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`/admin/category/api/admin/delete-category/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error('Lỗi khi xóa thể loại:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing) {
        await axios.put(`/admin/category/api/admin/update-category/${selectedCategory.categoryid}`, formData);
      } else {
        await axios.post('/admin/category/api/admin/create-category', formData);
      }
      fetchCategories();
      setIsEditing(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Lỗi khi gửi biểu mẫu:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedCategory(null);
  };

  const handleCancelView = () => {
    setIsViewing(false);
    setSelectedCategory(null);
    setIsEditing(false);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1); // Đặt lại trang về 1 khi giới hạn thay đổi
  };

  return (
    <div id="wrapper">
      <Navbar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content" className="d-flex">
          <div class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Menu />
          </div>
          <div className="container d-flex flex-column">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Category List</h6>
              </div>
              <div class="card-body">
                <Link to="/add-category" className="btn btn-primary mt-3">
                  Add Category
                </Link>
                <br />
                <br />

                

                {/* Thêm nút select cho việc chọn giới hạn */}
                <div className="row">
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
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                      </select>
                      <br />
                    </div>
                  </div>
                </div>
                {isEditing ? (
                  <CategoryForm onSubmit={handleFormSubmit} onCancel={handleCancelEdit} category={selectedCategory} />
                ) : (
                  <>
                    {isViewing && <CategoryView category={selectedCategory} onCancel={handleCancelView} />}
                    {!isViewing && (
                      <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                          <thead>
                            <tr>
                              <th>Category ID</th>
                              <th>Category Name</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categories.map((category) => (
                              <tr key={category.categoryid}>
                                <td>{category.categoryid}</td>
                                <td>{category.categoryname}</td>
                                <td>
                                  <button className="btn btn-info" onClick={() => handleView(category)}>
                                    View
                                  </button>
                                  <button className="btn btn-warning" onClick={() => handleEdit(category)}>
                                    Edit
                                  </button>
                                  <button className="btn btn-danger" onClick={() => handleDelete(category.categoryid)}>
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                            
                          </tbody>
                          
                        </table>
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
                                <li
                                  // key={pageNumber}
                                  className={`paginate_button page-item ${page === pageNumber + 1 ? 'active' : ''}`}
                                >
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
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footerweb />
    </div>
  );
};

export default CategoryList;
