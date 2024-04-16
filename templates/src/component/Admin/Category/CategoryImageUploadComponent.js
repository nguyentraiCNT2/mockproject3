import React, { useState } from 'react';

const CategoryImageUploadComponent = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('file', selectedImage);

      // Call the callback function to notify about image upload
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

export default CategoryImageUploadComponent;
