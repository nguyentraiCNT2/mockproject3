// src/components/UserAddressForm.js
import React, { useState, useEffect } from 'react';

const AddShipForm = ({ onSubmit, onCancel, userAddress }) => {
  const [formData, setFormData] = useState({
    shipname: '',
    status: true,
    shipprice: '',
    shipdate: null,
  });

  useEffect(() => {
    if (userAddress) {
      setFormData({
        shipname: userAddress.shipname || '',
        status: userAddress.status || true,
        shipprice: userAddress.shipprice || '',
        shipdate: null,
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
          <label htmlFor="shipname" className="form-label">Loại vận chuyển</label>
          <input
            type="text"
            className="form-control"
            id="shipname"
            name="shipname"
            value={formData.shipname}
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
          <label htmlFor="shipprice" className="form-label">Giá</label>
          <input
            type="text"
            className="form-control"
            id="shipprice"
            name="shipprice"
            value={formData.shipprice}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Lưu</button>
        <button type="button" className="btn btn-secondary mx-2" onClick={onCancel}>Hủy</button>
      </form>
    </div>
  );
};

export default AddShipForm;
