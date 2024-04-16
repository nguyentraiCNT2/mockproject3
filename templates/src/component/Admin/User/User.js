// src/components/User.js
import React from 'react';

const User = ({ user, onEdit, onDelete }) => {
  return (
    <div>
      <button onClick={() => onEdit(user)}>Sửa </button>
      <button onClick={() => onDelete(user.userid)}>Xóa</button>
    </div>
  );
};

export default User;
