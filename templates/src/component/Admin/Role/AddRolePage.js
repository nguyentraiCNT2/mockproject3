import React, { useState } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../Layout/menu';
import Footerweb from '../Layout/footer';
import Navbar from '../Layout/navbar';

const AddRolePage = () => {
  const [formData, setFormData] = useState({
    rolename: '',
    status: true,
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
      await axios.post('/admin/role-manager/api/admin/create-role', formData);

      setSuccessMessage('Role added successfully');
      setErrorMessage('');
      setFormData({
        rolename: '',
        status: true,
      });
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error adding role');
    }
  };

  return (
    <>
      <Navbar />
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" className="d-flex">
          <div class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Menu />
          </div>
            <div class="container col-sm-12 col-md-6">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Thêm mới quyền</h6>
                </div>
                <div class="card-body">
                <br />
                  <Link to="/role-list" className="btn btn-primary">
                    Quay loại
                  </Link>
                  <br />
                  <br />
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                  <Form className="col-sm-12 col-md-9" onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-4" controlId="rolename">
                      <InputGroup>
                        <InputGroup.Text>Tên Quyền</InputGroup.Text>
                        <FormControl
                          type="text"
                          name="rolename"
                          value={formData.rolename}
                          onChange={handleInputChange}
                          placeholder="Nhập tên quyền"
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="status">
                      <InputGroup>
                        <InputGroup.Text>Trạng thái</InputGroup.Text>
                        <Form.Select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          placeholder="Chọn trạng thái"
                        >
                          <option value={true}>Kích hoạt</option>
                          <option value={false}>Tắt kích hoạt</option>
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                    <br />
       
                    <Button type="submit" className="btn btn-primary">
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
      <Footerweb />
    </>
  );
};

export default AddRolePage;
