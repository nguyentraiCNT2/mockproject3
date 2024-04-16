import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import ColorForm from './ColorForm';
import { Link } from 'react-router-dom';
import Menu from '../Layout/menu';
import ViewColorPage from './ViewColorPage';
import Footerweb from '../Layout/footer';
import Navbar from '../Layout/navbar';
// import AddImagePage from './AddImagePage';

const ColorList = () => {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchColorName, setSearchColorName] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    fetchColors();
  }, [page, limit, searchColorName]);

  const fetchColors = async () => {
    try {
      let response;

      if (searchColorName.trim() === '') {
        response = await axios.get(`/admin/color/api/admin/color-list?page=${page}&limit=${limit}`);
      } else {
        response = await axios.get(`/admin/color/api/admin/color-by-colorname/${searchColorName}?page=${page}&limit=${limit}`);
      }

      setColors(response.data.listResult);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Error fetching colors:', error);
    }
  };

  const handleView = (color) => {
    setSelectedColor(color);
    setIsViewing(true);
    setIsEditing(false);
  };

  const handleDelete = async (colorId) => {
    try {
      await axios.delete(`/admin/color/api/admin/delete-color/${colorId}`);
      setColors((prevColors) => prevColors.filter((color) => color.colorid !== colorId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting color:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing) {
        await axios.put(`/admin/color/api/admin/update-color/${selectedColor.colorid}`, formData);
      } else {
        await axios.post('/admin/color/api/admin/create-color', formData);
      }
      fetchColors();
      setIsEditing(false);
      setSelectedColor(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedColor(null);
    setIsAddingImage(false);
  };

  const handleEdit = (color) => {
    setSelectedColor(color);
    setIsViewing(false);
    setIsEditing(true);
    setIsAddingImage(false);
  };

  const handleCancelView = () => {
    setIsViewing(false);
    setSelectedColor(null);
    setIsAddingImage(false);
  };

  const handleAddImage = (colorid) => {
    setIsAddingImage(true);
    setSelectedColor(colors.find((color) => color.colorid === colorid));
    setIsViewing(false);
    setIsEditing(false);
  };

  const handleSearch = () => {
    setPage(1);
    fetchColors();
  };
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1); // Đặt lại trang về 1 khi giới hạn thay đổi
  };

  const handleUploadSuccess = () => {
    setUploadSuccess('Image uploaded successfully');
    setUploadError('');
    fetchColors();
  };

  const handleUploadError = () => {
    setUploadSuccess('');
    setUploadError('Error uploading image');
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
    <h6 class="m-0 font-weight-bold text-primary">Color list</h6>
  </div>
  <div class="card-body">
    <Link to="/add-color" className="btn btn-primary mt-3"> Add Color</Link>
    <br/>
    <br/>
        <div className="mb-3">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <label htmlFor="searchColorName" className="form-label">Search by Color Name</label>
                <input
                  type="search"
                  className="form-control me-2"
                  id="searchColorName"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchColorName}
                  onChange={(e) => setSearchColorName(e.target.value)}
                />
                <button className="btn btn-outline-success" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </nav>
        </div>
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
          <ColorForm onSubmit={handleFormSubmit} onCancel={handleCancelEdit} color={selectedColor} />
        ) : (
          <>
            {isViewing && (
              <ViewColorPage color={selectedColor} onCancel={handleCancelView} />
            )}
        
            {!isViewing && !isAddingImage && (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Color ID</th>
                    <th>Color Name</th>
                    <th>Color</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {colors.map((color) => (
                    <tr key={color.colorid}> 
                      <td>{color.colorid}</td>
                      <td>{color.colorname}</td>
                      <td>{color.colorCore}</td>
                      <td>
                        <div style={{ backgroundColor: color.colorname, width: '50px', height: '50px' }}></div>
                      </td>
                      <td>
                        <button className="btn btn-info" onClick={() => handleView(color)}>
                          View
                        </button>
                        <button className="btn btn-warning" onClick={() => handleEdit(color)}>
                          Edit
                        </button>
                    
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(color.colorid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <br />
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
                  <br />
                </tbody>
              </table>
             )}
          </>
         )}

        {uploadSuccess && <div className="alert alert-success mt-3">{uploadSuccess}</div>}
        {uploadError && <div className="alert alert-danger mt-3">{uploadError}</div>}
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>

  );
};

export default ColorList;
