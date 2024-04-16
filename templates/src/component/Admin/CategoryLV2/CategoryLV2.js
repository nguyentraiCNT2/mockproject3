// src/components/CategoryLV2.js
import React from 'react';

const CategoryLV2 = ({ category, onEdit, onDelete }) => {
  return (
    <div>
      <button onClick={() => onEdit(category)}>Edit</button>
      <button onClick={() => onDelete(category.categoryId)}>Delete</button>
    </div>
  );
};

export default CategoryLV2;
