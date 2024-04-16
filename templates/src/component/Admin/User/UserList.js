import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import UserForm from './UserForm';
import { Link } from 'react-router-dom';
import Menu from '../Layout/menu';
import ViewUserPage from './ViewUserPage';
import Navbar from '../Layout/navbar';
import AddImagePage from './AddImagePage';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchUsername, setSearchUsername] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [page, limit, searchUsername]);

  const fetchUsers = async () => {
    try {
      let response;

      if (searchUsername.trim() === '') {
        response = await axios.get(`/user/api/admin/user-list?page=${page}&limit=${limit}`);
      } else {
        response = await axios.get(`/user/api/admin/user-by-username/list/${searchUsername}?page=${page}&limit=${limit}`);
      }

      setUsers(response.data.listResult);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewing(true);
    setIsEditing(false);
    setIsAddingImage(false);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/user/api/admin/delete-user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.userid !== userId));

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing) {
        await axios.put(`/user/api/admin/update-user/${selectedUser.userid}`, formData);
      } else {
        await axios.post('/user/api/admin/create-user', formData);
      }
      fetchUsers();
      setIsEditing(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedUser(null);
    setIsAddingImage(false);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsViewing(false);
    setIsEditing(true);
    setIsAddingImage(false);
  };

  const handleCancelView = () => {
    setIsViewing(false);
    setSelectedUser(null);
    setIsAddingImage(false);
  };
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1); // Đặt lại trang về 1 khi giới hạn thay đổi
  };
  const handleAddImage = (userid) => {
    setIsAddingImage(true);
    setSelectedUser(users.find((user) => user.userid === userid));
    setIsViewing(false);
    setIsEditing(false);
  };
  const handleSearch = () => {
    setPage(1);
    fetchUsers();
  };

  const handleUploadSuccess = () => {
    setUploadSuccess('Image uploaded successfully');
    setUploadError('');
    fetchUsers();
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

          <div class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Menu />
          </div>
          <div className="container d-flex flex-column">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Danh sách người dùng</h6>
              </div>
              <div class="card-body">
                <Link to="/add-user" className="btn btn-primary mt-3"> Thêm mới</Link>
                <br />
                <br />

                <div className="mb-3">
                  {/* ... (Giữ nguyên phần còn lại) */}
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <label htmlFor="searchUsername" className="form-label">Tìm kiếm</label>
                        <input
                          type="search"
                          className="form-control me-2"
                          id="searchUsername"
                          placeholder="Nhập từ khóa"
                          aria-label="Search"
                          value={searchUsername}
                          onChange={(e) => setSearchUsername(e.target.value)}
                        />
                        <button className="btn btn-outline-success" onClick={handleSearch}>Tìm</button>
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

                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                      </select>
                      <br />
                    </div>
                  </div>
                </div>
                {isEditing ? (
                  <UserForm onSubmit={handleFormSubmit} onCancel={handleCancelEdit} user={selectedUser} />
                ) : (
                  <>
                    {isViewing && (
                      <ViewUserPage user={selectedUser} onCancel={handleCancelView} />
                    )}
                    {isAddingImage && (
                      <AddImagePage match={{ params: { userid: selectedUser?.userid } }} />
                    )}
                    {!isViewing && !isAddingImage && (
                      <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                          <thead>
                            <tr>
                              <th>Mã Người dùng</th>
                              <th>Tên Đăng nhâp</th>
                              <th>Họ Tên</th>
                              <th>Ảnh</th>
                              <th>Quyền hạn</th>
                              <th>Xem </th>
                              <th>Sửa</th>
                              <th>Thêm ảnh</th>
                              <th>Xóa</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user) => (
                              <tr key={user.userid}>
                                <td>{user.userid}</td>
                                <td>{user.username}</td>
                                <td>{user.firtname} {user.lastname}</td>
                                <td>
                                  <img src={`/images/${user.images}`} style={{ width: '50px', height: '50px' }} alt="user" />
                                </td>
                                <td>{user.roleid}</td>

                                <td><button className="btn btn-info" onClick={() => handleView(user)}>
                                  View
                                </button></td>
                                <td> <button className="btn btn-warning" onClick={() => handleEdit(user)}>
                                  Edit
                                </button></td>
                                <td> <button className="btn btn-success ms-2" onClick={() => handleAddImage(user.userid)}>
                                  Add Image
                                </button></td>

                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user.userid)}
                                  >
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
                                  <i className="fa-solid fa-chevron-left"></i>
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
                                  <i className="fa-solid fa-chevron-right"></i>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
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

export default UserList;
