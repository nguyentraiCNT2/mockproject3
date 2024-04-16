import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';

const RoleForm = ({ onSubmit, onCancel, role }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    roleid: '',
    rolename: '',
    status: '',
  });

  useEffect(() => {
    if (role) {
      setFormData(role);
    } else {
      setFormData({
        roleid: '',
        rolename: '',
        status: '',
      });
    }
  }, [role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
        // Nếu có role, thực hiện cập nhật (PUT request)
        await axios.put(`/admin/role-manager/api/admin/update-role/${formData.roleid}`, formData);
        onSubmit(formData);
        setSuccessMessage('sửa đổi dữ liệu thanh công!');
      setErrorMessage('');
      setFormData({
        rolename: '',
        status: '',
      });
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Có lỗi khi sửa đổi');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Sửa quyền</h1>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form className="formrole" onSubmit={handleFormSubmit}>
      <div className="mb-3">
          <label htmlFor="rolename" className="form-label">Tên quyền</label>
          <input
            type="text"
            className="form-control"
            id="rolename"
            name="rolename"
            value={formData.rolename}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Trạng thái</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="true">Kích hoạt</option>
            <option value="false">Tắt kích hoạt</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Lưu</button>
        <button  className="btn btn-secondary">Hủy</button>
      </form>
    </div>
  );
};

export default RoleForm;
