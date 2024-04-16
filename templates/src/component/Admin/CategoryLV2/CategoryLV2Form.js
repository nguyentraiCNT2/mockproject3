// src/components/CategoryLV2Form.jsx
import React, { useState, useEffect } from 'react';

const CategoryLV2Form = ({ onSubmit, onCancel, category }) => {
  const [formData, setFormData] = useState({
    categorylvname: '',
    categoryimageslogo: '',
  });

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        categorylvname: '',
        categoryimageslogo: '',
      });
    }
  }, [category]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mt-5">
      <h1>{category ? 'Edit Category Level 2' : 'Add Category Level 2'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categorylvname" className="form-label">Category Level Name</label>
          <input
            type="text"
            className="form-control"
            id="categorylvname"
            name="categorylvname"
            value={formData.categorylvname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryimageslogo" className="form-label">Category Images Logo</label>
          <input
            type="text"
            className="form-control"
            id="categoryimageslogo"
            name="categoryimageslogo"
            value={formData.categoryimageslogo}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button onClick={onCancel} className="btn btn-primary">Cancel</button>
      </form>
    </div>
  );
};

export default CategoryLV2Form;
