import React from 'react';

const Role = ({ role, onEdit, onDelete }) => {
  return (
    <div>
      <button onClick={() => onEdit(role)}>Sửa</button>
      <button onClick={() => onDelete(role.roleid)}>Xóa</button>
    </div>
  );
};

export default Role;
