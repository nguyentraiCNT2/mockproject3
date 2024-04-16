import React, { useState } from 'react';

const ImageUploadComponent4 = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageObjectURL, setSelectedImageObjectURL] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

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
      setUploadedImages([...uploadedImages, selectedImageObjectURL]);
      setSelectedImage(null);
      setSelectedImageObjectURL(null);
    }
  };

  return (
    <>
      <div className="d-flex">
     <div >
      <div className="d-flex"  >
        <div >
        <label htmlFor="fileInput4" className="btn btn-primary mt-3 mt-5">
          Chọn ảnh
          <input
            type="file"
            id="fileInput4"
            className="btn btn-primary mt-3"
            style={{ display: 'none' }}
            onChange={handleImageChange}
            placeholder=" Chọn ảnh"
          />
          
        </label>
        </div>
        <div style={{ paddingLeft:'20px' }} >
            {selectedImageObjectURL && (
              <>
                <img
                  src={selectedImageObjectURL}
                  alt="Selected"
                  class="rounded-3 border border-success "
                  style={{ width: '300px', height: '150px', marginRight: '20px', padding:'10px 10px ' }}
                />

<button onClick={handleUpload} className="btn btn-primary ">
                  Upload Image
                </button>
              </>
            )}
          </div>
      </div>
        <div>
         
        </div>
      </div>
      </div>
    </>
  );
};

export default ImageUploadComponent4;
