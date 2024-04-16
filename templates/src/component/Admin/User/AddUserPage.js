import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../Layout/menu';
import Navbar from '../Layout/navbar';

const AddUserPage = ({ history }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firtname: '',
    lastname: '',
    phone: '',
    email: '',
    images: '',
    gender: '',
    status: '',
    roleid: '',
  });

  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/admin/role-manager/api/admin/role-list?page=1&limit=10');
        setUsers(response.data.listResult);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the API to add a user
      await axios.post('/user/api/admin/create-user', formData);

      // If successful, set success message and clear fields
      setSuccessMessage('User added successfully');
      setErrorMessage('');
      setFormData({
        username: '',
        password: '',
        firtname: '',
        lastname: '',
        phone: '',
        email: '',
        images: '',
        gender: '',
        status: '',
        roleid: '',
      });
    } catch (error) {
      // If there is an error, set error message and do not clear fields
      setSuccessMessage('');
      setErrorMessage('Error adding user');
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
          <div className="container col-sm-12 col-md-6 ali">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Thêm mới người dùng</h6>
              </div>
              <div class="card-body">
                <Link to="/user-list" className="btn btn-primary">
                  Quay lại
                </Link>
                <br />
                <br />
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <Form className="col-sm-12 col-md-9" onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-4 d-flex" controlId="username">
                    <InputGroup>
                      <InputGroup.Text>Tên đăng nhập</InputGroup.Text>
                      <FormControl
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter username"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                  <InputGroup>
                      <InputGroup.Text>Mật khẩu</InputGroup.Text>
                      <FormControl
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="firstname">
                    <InputGroup>
                    <InputGroup.Text>Họ</InputGroup.Text>
                      <FormControl
                        type="text"
                        name="firtname"
                        value={formData.firtname}
                        onChange={handleInputChange}
                        placeholder="Enter firstname"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="lastname">
                    <InputGroup>
                    <InputGroup.Text>Tên</InputGroup.Text>
                      <FormControl
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        placeholder="Enter lastname"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="phone">
                    <InputGroup>
                    <InputGroup.Text>Số điện thoại</InputGroup.Text>
                      <FormControl
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <InputGroup>
                    <InputGroup.Text>Email</InputGroup.Text>
                      <FormControl
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="gender">
                    <InputGroup>
                    <InputGroup.Text>Giói tính</InputGroup.Text>
                      <Form.Select
                       name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        placeholder="Select Gender"
                      >
                        <option value="">-- Chọn giới tính  --</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                        <option value="Không muốn nói">Không muốn nói</option>
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="status">
                    <InputGroup>
                    <InputGroup.Text>Strạng thái</InputGroup.Text>
                      <Form.Select
                           name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        placeholder="Select Status"
                      >
                        <option value="">-- Select Status --</option>
                        <option value="true">Online</option>
                        <option value="false">Offline</option>
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="roleid">
                    <InputGroup>
                    <InputGroup.Text> Quền hạn</InputGroup.Text>
                      <Form.Select
                       name="roleid"
                        value={formData.roleid}
                        onChange={handleInputChange}
                        placeholder="Select Role"
                      >
                        <option value="">-- Chọn Quền hạn --</option>
                        {users.map((user) => (
                          <option key={user.roleid} value={user.roleid}>
                            {user.rolename}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>

                  <br />

                  <Button type="submit" className="btn btn-primary btn-lg">
                    Thêm mới
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
  );
};

export default AddUserPage;
