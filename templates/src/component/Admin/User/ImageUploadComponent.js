// ImageUploadComponent.jsx

import React, { useState } from 'react';

const ImageUploadComponent = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageObjectURL, setSelectedImageObjectURL] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setSelectedImageObjectURL(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('file', selectedImage);
      onImageUpload(formData);
      setSelectedImage(null);
      setSelectedImageObjectURL(null);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="fileInput" className="btn btn-primary mt-3">
          Chọn ảnh
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </label>
       
        <div>
          <br />
          <br />
          <div>
            {selectedImageObjectURL && (
              <>
                <img
                  src={selectedImageObjectURL}
                  alt="Selected"
                  style={{ width: '450px', height: '300px', marginRight: '20px' }}
                />

      <button onClick={handleUpload} className="btn btn-primary mt-3">
         Tải ảnh lên
        </button>
              </>
              
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploadComponent;
