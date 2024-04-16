import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import UserAddressForm from './UserAddressForm';
import { Link } from 'react-router-dom';
import Menu from '../Layout/menu';
import ViewUserAddressPage from './ViewUserAddressPage';
import Footerweb from '../Layout/footer';
import Navbar from '../Layout/navbar';

const UserAddressList = () => {
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedUserAddress, setSelectedUserAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchUserAddress, setSearchUserAddress] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUserAddresses();
  }, [page, limit, searchUserAddress]);

  const fetchUserAddresses = async () => {
    try {
      let response;

      if (searchUserAddress.trim() === '') {
        response = await axios.get(`/admin/user-address/api/admin/user-address-list?page=${page}&limit=${limit}`);
      } else {
        response = await axios.get(`/admin/user-address/api/admin/user-address-by-addressuser-list/${searchUserAddress}?page=${page}&limit=${limit}`);
      }

      setUserAddresses(response.data.listResult);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Error fetching user addresses:', error);
    }
  };

  const handleView = (userAddress) => {
    setSelectedUserAddress(userAddress);
    setIsViewing(true);
    setIsEditing(false);
  };

  const handleDelete = async (userAddressId) => {
    try {
      await axios.delete(`/admin/user-address/api/admin/delete-user-address/${userAddressId}`);
      setUserAddresses((prevUserAddresses) => prevUserAddresses.filter((userAddress) => userAddress.addressid !== userAddressId));
      // window.location.reload(); // Remove this line, it's not necessary
    } catch (error) {
      console.error('Error deleting user address:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing) {
        await axios.put(`/admin/user-address/api/admin/update-user-address/${selectedUserAddress.addressid}`, formData);
      } else {
        await axios.post('/admin/user-address/api/admin/create-user-address', formData);
      }
      fetchUserAddresses();
      setIsEditing(false);
      setSelectedUserAddress(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1); // Đặt lại trang về 1 khi giới hạn thay đổi
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedUserAddress(null);
  };

  const handleEdit = (userAddress) => {
    setSelectedUserAddress(userAddress);
    setIsViewing(false);
    setIsEditing(true);
  };

  const handleCancelView = () => {
    setIsViewing(false);
    setSelectedUserAddress(null);
  };

  const handleSearch = () => {
    setPage(1);
    fetchUserAddresses();
  };

  return (
    <div>
      <Navbar />
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" className="d-flex">
            <div class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
              <Menu />
            </div>
            <div className="container ">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Danh sách địa chỉ đặt hàng</h6>
                </div>
                <div className="card-body">
                  <Link to="/add-user-address" className="btn btn-primary"> Thêm mưới </Link><br /><br />
                  <div className="mb-3">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                          <label htmlFor="searchUserAddress" className="form-label">Tìm kiếm</label>
                          <input
                            type="search"
                            className="form-control me-2"
                            id="searchUserAddress"
                            placeholder="Nhập từ khóa"
                            aria-label="Search"
                            value={searchUserAddress}
                            onChange={(e) => setSearchUserAddress(e.target.value)}
                          />
                          <button className="btn btn-outline-success" onClick={handleSearch}>Tìm</button>
                        </div>
                      </div>
                    </nav>
                  </div>
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
                    <UserAddressForm onSubmit={handleFormSubmit} onCancel={handleCancelEdit} userAddress={selectedUserAddress} />
                  ) : (
                    <>
                      {isViewing && (
                        <ViewUserAddressPage userAddress={selectedUserAddress} onCancel={handleCancelView} />
                      )}
                      {!isViewing && (
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Mã địa chỉ </th>
                              <th>Địa chỉ đặt hàng</th>
                              <th>Xem</th>
                              <th>Sửa</th>
                              <th>Xóa</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userAddresses.map((userAddress) => (
                              <tr key={userAddress.addressid}>
                                <td>{userAddress.addressid}</td>
                                <td>{userAddress.useraddress}</td>
                                <td>
                                <button className="btn btn-info" onClick={() => handleView(userAddress)}>
                                    Xem
                                  </button>
                                </td>
                                <td>
                                <button className="btn btn-warning" onClick={() => handleEdit(userAddress)}>
                                    Sửa 
                                  </button>
                                </td>
                                <td>
                                 
                               
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(userAddress.addressid)}
                                  >
                                    Xóa
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                      )}
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserAddressList;
