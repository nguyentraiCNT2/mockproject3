// src/components/UserAddressForm.js
import React, { useState, useEffect } from 'react';

const UserAddressForm = ({ onSubmit, onCancel, userAddress }) => {
  const [formData, setFormData] = useState({
    useraddress: '',
    status: true,
    userid: '',
  });

  useEffect(() => {
    if (userAddress) {
      setFormData({
        useraddress: userAddress.useraddress || '',
        status: userAddress.status || true,
        userid: userAddress.userid || '',
      });
    }
  }, [userAddress]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2>{userAddress ? 'Edit User Address' : 'Add User Address'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="useraddress" className="form-label">Địa chỉ đặt hàng</label>
          <input
            type="text"
            className="form-control"
            id="useraddress"
            name="useraddress"
            value={formData.useraddress}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="status"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="status">Active</label>
        </div>
        <div className="mb-3">
          <label htmlFor="userid" className="form-label">Mã người dùng</label>
          <input
            type="text"
            className="form-control"
            id="userid"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Xác nhận</button>
        <button type="button" className="btn btn-secondary mx-2" onClick={onCancel}>Hủy</button>
      </form>
    </div>
  );
};

export default UserAddressForm;
