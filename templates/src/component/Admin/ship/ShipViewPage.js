// src/components/ViewUserAddressPage.js
import React from 'react';

const Shipview = ({ userAddress, onCancel }) => {
  return (
    <div>
      <h2>Thông tin vận chuyển</h2>
      <div>
        <strong>Loại:</strong> {userAddress.shipname}
      </div>
      <div>
        <strong>Trạng Thái:</strong> {userAddress.status ? 'Active' : 'Inactive'}
      </div>
      <div>
        <strong>Giá:</strong> {userAddress.shipprice}
      </div>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Back
      </button>
    </div>
    
  );
};

export default Shipview;
