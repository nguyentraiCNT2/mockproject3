import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import RoleForm from './RoleForm';
import { Link } from 'react-router-dom';
import Menu from '../Layout/menu';
import Navbar from '../Layout/navbar';
import ViewRolePage from './ViewRolePage';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchRoleName, setSearchRoleName] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRoles();
  }, [page, limit, searchRoleName]);

  const fetchRoles = async () => {
    try {
      let response;

      if (searchRoleName.trim() === '') {
        response = await axios.get(`/admin/role-manager/api/admin/role-list?page=${page}&limit=${limit}`);
      } else {
        response = await axios.get(`/admin/role-manager/api/admin/role-by-rolename/list/${searchRoleName}?page=${page}&limit=${limit}`);
      }

      setRoles(response.data.listResult);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleView = (role) => {
    setSelectedRole(role);
    setIsViewing(true);
    setIsEditing(false);
  };

  const handleAdd = () => {
    setSelectedRole(null);
    setIsEditing(true);
    setIsViewing(false);
  };

  const handleDelete = async (roleId) => {
    try {
      await axios.delete(`/admin/role-manager/api/admin/delete-role/${roleId}`);
      setRoles((prevRoles) => prevRoles.filter((role) => role.roleid !== roleId));
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing) {
        await axios.put(`/admin/role-manager/api/admin/update-role/${selectedRole.roleid}`, formData);
      } else {
        await axios.post('/admin/role-manager/api/admin/create-role', formData);
      }

      fetchRoles();
      setIsEditing(false);
      setIsViewing(false);
      setSelectedRole(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedRole(null);
    setIsViewing(false);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setIsEditing(true);
    setIsViewing(false);
  };

  const handleCancelView = () => {
    setIsViewing(false);
    setSelectedRole(null);
    setIsEditing(false);
  };

  const handleSearch = () => {
    setPage(1);
    fetchRoles();
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1);
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
                <h6 class="m-0 font-weight-bold text-primary">Danh sách phân quyền </h6>
              </div>
              <div class="card-body">
                <Link to="/add-role" className="btn btn-primary mt-3">
               Thêm mới
                </Link>
                <br />
                <br />

                <div className="mb-3">
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <label htmlFor="searchRoleName" className="form-label">Tìm kiếm </label>
                        <input
                          type="search"
                          className="form-control me-2"
                          id="searchRoleName"
                          placeholder="Nhập từ khóa"
                          aria-label="Search"
                          value={searchRoleName}
                          onChange={(e) => setSearchRoleName(e.target.value)}
                        />
                        <button className="btn btn-outline-success" onClick={handleSearch}>Tìm </button>
                      </div>
                    </div>
                  </nav>
                </div>

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
                  <RoleForm onSubmit={handleFormSubmit} onCancel={handleCancelEdit} role={selectedRole} />
                ) : (
                  <>
                    {isViewing && <ViewRolePage role={selectedRole} onCancel={handleCancelView} />}
                    {!isViewing && (
                      <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                          <thead>
                            <tr>
                              <th>Mã quyền </th>
                              <th>Loại quyền</th>
                              <th>trạng thái</th>
                              <th>Xem</th>
                              <th>Sửa</th>
                              <th>Xóa</th>
                            </tr>
                          </thead>
                          <tbody>
                            {roles.map((role) => (
                              <tr key={role.roleid}>
                                <td>{role.roleid}</td>
                                <td>{role.rolename}</td>
                                <td>{role.status ? 'Active' : 'Inactive'}</td>
                                <td>   <button className="btn btn-info" onClick={() => handleView(role)}>Xem</button></td>
                                <td> <button className="btn btn-warning" onClick={() => handleEdit(role)}>Sửa</button></td>
                                <td>
                                  <button className="btn btn-danger" onClick={() => handleDelete(role.roleid)}>Xóa</button>
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

                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleList;
