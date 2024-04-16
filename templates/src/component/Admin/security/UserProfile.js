import React, { useEffect, useState } from 'react';
import Menu from '../Layout/menu';
import Header from '../../User/layout/header';
import '../../../css/userdetails.css';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
const Userprofile = () => {
  const [user, setUser] = useState({
    userid: '',
    username: '',
    password: '',
    firtname: '',
    lastname: '',
    phone: '',
    email: '',
    images: '',
    roleid: 0,
    gender: '',
    status: false,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loi, setLoi] = useState(false);
  const [thanhcong, setThanhCong] = useState(false);
  const [selectedImageObjectURL, setSelectedImageObjectURL] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('tokenuser');
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    const userId = payload.sub;

    if (token && userId) {
      fetch(`http://localhost:1412/security/profile/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setUser(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, []);

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleSaveProfile = () => {
    const token = localStorage.getItem('tokenuser');
    const updatedUserData = {
      ...user,
      password: isEditMode ? password : undefined,
    };

    fetch(`http://localhost:1412/user/api/admin/update-user/${user.userid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUserData),
    })
      .then(response => {
        if (response.ok) {

          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            window.location.reload();
          }, 3000);
          setThanhCong('cập nhật thông tin thành công.');
          // Cập nhật hình ảnh trong trạng thái người dùng nếu cần
        } else {
          setLoi('Lỗi khi cập nhật thông tin.');
        }
      })
      .catch(error => {
        console.error('Error uploading data:', error);
      });
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const signout = () => {
    localStorage.removeItem('tokenuser');
    localStorage.removeItem('userid');
    window.location.href = '/user-list';
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setSelectedImageObjectURL(URL.createObjectURL(file));
    }
  };
  const uploadImage = () => {
    const token = localStorage.getItem('tokenuser');
    const formData = new FormData();
    formData.append('file', selectedImage);

    fetch(`http://localhost:1412/user/api/${user.userid}/upload-image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
      .then(response => {
        if (response.ok) {

          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
          setThanhCong('Tải lên hình ảnh thành công.');
          // Cập nhật hình ảnh trong trạng thái người dùng nếu cần
        } else {
          setLoi('Lỗi khi tải lên hình ảnh.');
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <div>
      {showAlert && (
        <div className="thongbao-fullscreen">
          <Alert className="content-thongbao" onClose={() => setShowAlert(false)} >
            {loi && <div style={{color:'red'}}>{loi}</div>}
            {thanhcong && <div style={{color:'green'}}>{thanhcong}</div>}
          </Alert>
        </div>
      )}
      <div className="header">
        <Header />
      </div>
      <div className="main-content">
        <div className="all">
          <section className="h-100 gradient-custom-2">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-9 col-xl-7">
                  <div className="card">
                    <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                      <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                        {selectedImageObjectURL && (
                          <img src={selectedImageObjectURL}
                            alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                            style={{ width: '150px', zIndex: 1, height: '150px', borderRadius: '10px' }}
                          />

                        )}
                        {!selectedImageObjectURL && (
                          <img src={`/images/${user.images}`}
                            alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                            style={{ width: '150px', zIndex: 1, height: '150px', borderRadius: '10px' }}
                          />
                        )}

                        <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1, border: '2px solid #fff', color: '#fff', backgroundColor: '#000' }} onClick={isEditMode ? handleSaveProfile : handleEditProfile}>
                          {isEditMode ? 'Lưu' : 'Chỉnh sửa'}
                        </button>
                      </div>
                      <div className="ms-3" style={{ marginTop: '130px' }}>
                        <h5>{user.firtname} {user.lastname}</h5>
                        <h5>{user.email}</h5>
                      </div>
                    </div>
                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                      <div className="d-flex justify-content-end text-center py-1">
                        <div>

                          {selectedImageObjectURL ? (

                            <button type="button" className="btn btn-primary mt-3" onClick={uploadImage}>
                              Tải lên ảnh
                            </button>
                          ) : <label htmlFor="fileInput" className="btn btn-primary mt-3">
                            Chọn ảnh
                            <input
                              type="file"
                              id="fileInput"
                              style={{ display: 'none' }}
                              onChange={handleImageChange}
                            />
                          </label>}
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-4 text-black">
                      <div className="mb-5">
                        <p className="lead fw-normal mb-1">Thông tin</p>
                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                          <p className="font-italic mb-1">{user.phone}</p>
                          <p className="font-italic mb-1">{user.gender}</p>

                          {isEditMode ? (
                            <div >
                              <br />
                              <input type="text" name="firtname" placeholder="Tên" value={user.firtname} onChange={(e) => setUser({ ...user, firtname: e.target.value })} className="form-control mb-2" />
                              <input type="text" name="lastname" placeholder="Họ" value={user.lastname} onChange={(e) => setUser({ ...user, lastname: e.target.value })} className="form-control mb-2" />
                              <input type="email" name="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="form-control mb-2" />
                              <input type="text" name="phone" placeholder="Số điện thoại" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} className="form-control mb-2" />
                              <select
                                name="gender"
                                value={user.gender}
                                onChange={(e) => setUser({ ...user, gender: e.target.value })}
                                className="form-select mb-2"
                              >
                                <option value="" disabled>Chọn Giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                              </select>
                              <a  href='/update-password' className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1 }}>   đổi mật khẩu</a>

                            </div>

                          ) : null}
                          {isEditMode ? (
                            <button type="button" className="btn btn-outline-secondary mt-2" onClick={handleCancelEdit}>
                              Hủy
                            </button>
                          ) : null}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="mb-0"><a href="/index" className="text-muted">Quay lại</a></p>
                        <p className="mb-0"><a href="/user-address-list-of-user" className="text-muted">Dịa chỉ đặt hàng</a></p>
                        <p className="mb-0"><a href="/order-list-user" className="text-muted">Đơn đặt hàng</a></p>
                        <button type="button" className="btn btn-danger" onClick={signout}>
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
