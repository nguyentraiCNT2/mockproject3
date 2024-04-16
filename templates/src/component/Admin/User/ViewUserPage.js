// src/components/ViewUserPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const ViewUserPage = ({ user, onCancel }) => {
  return (
    <div className="container mt-5">
      <h1>Thông tin tài khoản người dùng</h1>
      <div>
        <strong>Tên đăng nhập:</strong> {user.username}
      </div>
      <div>
        <strong>mật khẩu:</strong> {user.password}
      </div>
      <div>
        <strong>họ tên :</strong> {user.firtname} {user.lastname} 
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Số điện thoại:</strong> {user.phone}
      </div>
      <div>
        <strong>ảnh:</strong> {user.images}
      </div>
      <div>
        <strong>giới tính:</strong> {user.gender}
      </div>
 
      <div>
        <strong>Strạng thái:</strong> {user.status=== true ? 'Online':'Offline'}
      </div>
      <div>
        <strong>Quền hạn:</strong> {user.roleid===2 ? 'User':'Admin'}
      </div>
      {/* Thêm các trường khác của người dùng */}
      <Link to="/user-list" className="btn btn-secondary" onClick={onCancel}>
        Đóng
      </Link>
    </div>
  );
};

export default ViewUserPage;
