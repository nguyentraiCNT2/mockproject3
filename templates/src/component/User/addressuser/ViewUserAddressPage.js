// src/components/ViewUserAddressPage.js
import React from 'react';

const ViewUserAddressPageofuser = ({ userAddress, onCancel }) => {
  return (
    <div style={{marginBottom:'30px'}}>
      <h2>Thông tin địa chỉ</h2>
      <div>
        <strong>Địa chỉ đặt hàng :</strong> {userAddress.useraddress}
      </div>
      <br/>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Quay lại
      </button>
    </div>
    
  );
};

export default ViewUserAddressPageofuser;
