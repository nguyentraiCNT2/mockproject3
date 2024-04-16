// AddImagePage.jsx

import React, { useState } from 'react';
import ImageUploadComponent from './ImageUploadComponent'; // Điều chỉnh đường dẫn tùy thuộc vào cấu trúc dự án
const AddImagePage = ({ match,history }) => {
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleImageUpload = async (formData) => {
    try {
      await fetch(`http://localhost:1412/user/api/${match.params.userid}/upload-image`, {
        method: 'POST',
        body: formData,
      });
      setUploadSuccess('Image uploaded successfully');
      setUploadError('');
      // history.push('/user-list');
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadSuccess('');
      setUploadError('Error uploading image');
    }
  };
    const handleReset = () => {
      // Làm mới trang khi nút được nhấn
      window.location.reload();
    };
  
  return (
    <div>
      <h2>Thêm ảnh </h2>
      <ImageUploadComponent onImageUpload={handleImageUpload}  />
      {uploadSuccess && <div className="alert alert-success mt-3">{uploadSuccess}</div>}
      {uploadError && <div className="alert alert-danger mt-3">{uploadError}</div>}
      <br/>
      <br/>
      <br/>
      <div>
      <button onClick={handleReset} className="btn btn-secondary">Hủy</button>
     
      </div>
      
    </div>
  );
};

export default AddImagePage;
