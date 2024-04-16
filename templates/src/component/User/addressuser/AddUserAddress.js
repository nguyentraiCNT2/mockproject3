import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../layout/header';

const AddUserAddressofuser = ({ history }) => {
  const [user, setUser] = useState([]);
  const [selectUser, setSelectUser] = useState('');
  const token = localStorage.getItem('tokenuser');
  const parts = token.split('.');
  const payload = JSON.parse(atob(parts[1]));
  const userId = payload.sub;
  const [formData, setFormData] = useState({
    useraddress: '',
    status: true,
    userid: userId,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Response = await axios.get('/user/api/admin/user-list?page=1&limit=10');
        setUser(Response.data.listResult);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/admin/user-address/api/admin/create-user-address', formData);

      setSuccessMessage('User address added successfully');
      setErrorMessage('');
      setFormData({
        useraddress: '',
        status: true,
        userid: '',
      });

    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error adding user address');
    }
  };

  return (
    <>
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
                <div class="container col-sm-12 col-md-6">
                  <div class="card shadow mb-4" >
                    <div class="card-header py-3">
                      <h6 class="m-0 font-weight-bold text-primary">Thêm sản phẩm</h6>
                    </div>
                    <br />
                    <div class="card-body" >
                      <Link to="/user-address-list-of-user" className="btn btn-primary" >
                       Quay lại
                      </Link>
                      <br />
                      <br />

                      {successMessage && <div className="alert alert-success">{successMessage}</div>}
                      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                      <Form className="col-sm-12 col-md-9" onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-4" controlId="useraddress">
                          <InputGroup>
                            <InputGroup.Text>Nhập địa chỉ</InputGroup.Text>
                            <FormControl
                              type="text"
                              name="useraddress"
                              value={formData.useraddress}
                              onChange={handleInputChange}
                              placeholder="Enter user address"
                            />
                          </InputGroup>
                        </Form.Group>

                        <br />
                        <br />
                        <Button type="submit" className="btn btn-primary" >
                          Thêm địa chỉ
                        </Button>
                      </Form>
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserAddressofuser;
