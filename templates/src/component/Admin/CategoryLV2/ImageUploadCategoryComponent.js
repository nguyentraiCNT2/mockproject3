// src/components/ImageUploadCategoryComponent.jsx
import React, { useState } from 'react';

const ImageUploadCategoryComponent = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('file', selectedImage);
      
      // Gọi hàm callback để thông báo về việc tải ảnh lên
      onImageUpload(formData);
      
      // Reset selected image state
      setSelectedImage(null);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUploadCategoryComponent;
