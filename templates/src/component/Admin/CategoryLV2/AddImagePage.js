// src/components/AddImagePage.jsx
import React, { useState } from 'react';
import ImageUploadComponent from './ImageUploadCategoryComponent';

const AddImagePage = ({ match }) => {
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleImageUpload = async (formData) => {
    try {
      await fetch(`http://localhost:1412/admin/category-level-2/api/${match.params.categorylvid}/upload-image`, {
        method: 'POST',
        body: formData,
      });
      setUploadSuccess('Image uploaded successfully');
      setUploadError('');
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadSuccess('');
      setUploadError('Error uploading image');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Image</h2>
      <ImageUploadComponent onImageUpload={handleImageUpload} />
      {uploadSuccess && <div className="alert alert-success mt-3">{uploadSuccess}</div>}
      {uploadError && <div className="alert alert-danger mt-3">{uploadError}</div>}
    </div>
  );
};

export default AddImagePage;
