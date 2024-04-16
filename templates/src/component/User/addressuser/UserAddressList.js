import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import UserAddressFormofuser from './UserAddressForm';
import { Link } from 'react-router-dom';
import ViewUserAddressPageofuser from './ViewUserAddressPage';
import Header from '../layout/header';
import FooterUser from '../layout/footer';
const UserAddressListofuser = () => {
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedUserAddress, setSelectedUserAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchUserAddress, setSearchUserAddress] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem('tokenuser');
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    const userId = payload.sub;
  useEffect(() => {
    fetchUserAddresses();
  }, [page, limit, searchUserAddress]);

  const fetchUserAddresses = async () => {
    try {
      let response;

      if (searchUserAddress.trim() === '') {
        response = await axios.get(`/admin/user-address/api/admin/user-address-by-user-id/${userId}?page=${page}&limit=${limit}`);
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
     <div className="header">
        <Header />
      </div>
      <div className="main-content">
        <div className="all">
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" className="d-flex">
            <div class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            </div>
            <div className="container ">
              <div className="card shadow ">
           
                <div className="card-body">
                  <Link to="/add-user-address-list-of-user" className="btn btn-primary">Thêm địa chỉ mới</Link><br /><br />
                  
                  {isEditing ? (
                    <UserAddressFormofuser onSubmit={handleFormSubmit} onCancel={handleCancelEdit} userAddress={selectedUserAddress} />
                  ) : (
                    <>
                      {isViewing && (
                        <ViewUserAddressPageofuser userAddress={selectedUserAddress} onCancel={handleCancelView} />
                      )}
                      {!isViewing && (
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Địa chỉ đặt hàng</th>
                              <th>Xem</th>
                              <th>Sửa</th>
                              <th>Xóa</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userAddresses.map((userAddress) => (
                              <tr key={userAddress.addressid}>
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
                      <div className="col-sm-12 col-md-7" style={{margin:'au'}}>
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

</div>
<FooterUser />
    </div>
  );
};

export default UserAddressListofuser;
