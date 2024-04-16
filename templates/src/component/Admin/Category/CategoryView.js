import React from 'react';
import { Link } from 'react-router-dom';

const CategoryView = ({ category, onCancel }) => {
  return (
    <div className="container mt-5">
      <h1>Category Details</h1>
      <div>
        <strong>Category ID:</strong> {category.categoryid}
      </div>
      <div>
        <strong>Category Name:</strong> {category.categoryname}
      </div>
      {/* Add other category details */}
      <Link to="/category-list" className="btn btn-secondary" onClick={onCancel}>
        Close
      </Link>
    </div>
  );
};

export default CategoryView;
