import React, { useState } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import CategoryImageUploadComponent from './CategoryImageUploadComponent';

const AddCategoryImagePage = ({ match }) => {
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleImageUpload = async (formData) => {
    try {
      await axios.post(`/admin/category/api/${match.params.categoryid}/upload-image`, formData);
      setUploadSuccess('Image uploaded successfully');
      setUploadError('');
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadSuccess('');
      setUploadError('Error uploading image');
    }
  };

  return (
    <div>
      <h2>Add Image</h2>
      <CategoryImageUploadComponent onImageUpload={handleImageUpload} />
      {uploadSuccess && <div className="alert alert-success mt-3">{uploadSuccess}</div>}
      {uploadError && <div className="alert alert-danger mt-3">{uploadError}</div>}
    </div>
  );
};

export default AddCategoryImagePage;
