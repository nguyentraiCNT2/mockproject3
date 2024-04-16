// src/components/ViewCategoryLV2Page.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ViewCategoryLV2Page = ({ category, onCancel }) => {
  return (
    <div className="container mt-5">
      <h1>Category Level 2 Details</h1>
      <div>
        <strong>Category ID:</strong> {category.categorylvid}
      </div>
      <div>
        <strong>Category Name:</strong> {category.categorylvname}
      </div>
      <div>
        <strong>Category Image Logo:</strong>
        <img src={`/images/${category.categoryimageslogo}`} style={{ width: '100px', height: '100px' }} alt="Category Logo" />
      </div>
      <Link to="/categorylv2-list" className="btn btn-secondary" onClick={onCancel}>
        Close
      </Link>
    </div>
  );
};

export default ViewCategoryLV2Page;
