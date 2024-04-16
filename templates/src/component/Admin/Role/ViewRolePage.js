import React from 'react';

const ViewRolePage = ({ role, onCancel }) => {
  return (
    <div>
      <h2>Thông tin quyền</h2>
      <div>
        <strong>Mã quyền:</strong> {role.roleid}
      </div>
      <div>
        <strong>Loại quyền:</strong> {role.rolename}
      </div>
      <div>
        <strong>Trạng thái:</strong> {role.status ? 'Active' : 'Inactive'}
      </div>
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={onCancel}>
          Hủy
        </button>
      </div>
    </div>
  );
};

export default ViewRolePage;
