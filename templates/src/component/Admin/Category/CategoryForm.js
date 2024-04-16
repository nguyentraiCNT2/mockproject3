import React, { useState, useEffect } from 'react';

const CategoryForm = ({ onSubmit, onCancel, category }) => {
  const [formData, setFormData] = useState({
    categoryname: '',
    // Add other fields as needed
  });

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        categoryname: '',
        // Initialize other fields
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
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="categoryname" className="form-label">Category Name</label>
        <input
          type="text"
          className="form-control"
          id="categoryname"
          name="categoryname"
          value={formData.categoryname}
          onChange={handleChange}
        />
      </div>
      <button type="submit"class="btn btn-primary">Submit</button>
      <button onClick={onCancel} type="button" class="btn btn-secondary">Cancel</button>
    </form>
  );
};

export default CategoryForm;
