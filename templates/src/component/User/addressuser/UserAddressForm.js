// src/components/UserAddressForm.js
import React, { useState, useEffect } from 'react';

const UserAddressFormofuser = ({ onSubmit, onCancel, userAddress }) => {
  const token = localStorage.getItem('tokenuser');
  const parts = token.split('.');
  const payload = JSON.parse(atob(parts[1]));
  const userId = payload.sub;
  const [formData, setFormData] = useState({
    useraddress: '',
    status: true,
    userid: userId,
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
      <h2>Sửa thông tin sản phẩm </h2>
      <br/>
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
       <br/>
        <button type="submit" className="btn btn-primary">Lưu</button>
        <button type="button" className="btn btn-secondary mx-2" onClick={onCancel}>Hủy</button>
      </form>
    </div>
  );
};

export default UserAddressFormofuser;
