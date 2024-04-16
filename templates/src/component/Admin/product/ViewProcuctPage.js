// src/components/ViewUserPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const ViewProductPage = ({ user, onCancel }) => {
  return (
    <div className="container mt-5">
      <h1>User Details</h1>
      <div>
        <strong>productname:</strong> {user.productname}
      </div>
      <div>
        <strong>core:</strong> {user.productcore}
      </div>
      <div>
        <strong>productprice:</strong> {user.productprice} VND
      </div>
      <div>
        <strong>productsdescribe:</strong> {user.productsdescribe}
      </div>
      <div>
        <strong>productsview:</strong> {user.productsview}
      </div>
      <div>
        <strong>imagesmain:</strong> {user.categoryLV2id}
      </div>
      <div>
        <strong>colorid:</strong> {user.colorid}
      </div>
      <div>
        <strong>categoryid:</strong> {user.categoryid}
      </div>
      <div>
        <strong>categoryLV2id:</strong> {user.categoryLV2id}
      </div>
      <div>
        <strong>productsstatus:</strong> {user.productsstatus ? 'hiện':'ẩn'}
      </div>
      <div>
      </div>
      {/* Thêm các trường khác của người dùng */}
      <Link to="/product-list" className="btn btn-secondary" onClick={onCancel}>
        Close
      </Link>
    </div>
  );
};

export default ViewProductPage;
