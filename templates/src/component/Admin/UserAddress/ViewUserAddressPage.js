// src/components/ViewUserAddressPage.js
import React from 'react';

const ViewUserAddressPage = ({ userAddress, onCancel }) => {
  return (
    <div>
      <h2>View User Address</h2>
      <div>
        <strong>User Address:</strong> {userAddress.useraddress}
      </div>
      <div>
        <strong>Status:</strong> {userAddress.status ? 'Active' : 'Inactive'}
      </div>
      <div>
        <strong>User ID:</strong> {userAddress.userid}
      </div>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Back
      </button>
    </div>
    
  );
};

export default ViewUserAddressPage;
