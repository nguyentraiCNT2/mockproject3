import React, { useEffect, useState } from 'react';
import Menu from '../Layout/menu';
import Navbar from '../Layout/navbar';
const AdminProfile = () => {
  const [user, setUser] = useState({
    userid: '',
    username: '',
    password: '',
    firtname: '',
    lastname: '',
    phone: '',
    email: '',
    images: '',
    roleid: 0, // Default value, update based on your logic
    gender: '',
    status: false, // Default value, update based on your logic
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditpassMode, setIsEditpassMode] = useState(false);
  const [loi, setloi] = useState(false);
  const [thanhcong, setthanhcong] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    const userId = payload.sub;

    if (token && userId) {
      fetch(`http://localhost:1412/security/profile/admin/${userId}`, {
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
  const handleEditpassProfile = () => {
    setIsEditpassMode(true);

  };
  const handleCancelpasssEdit = () => {
    // Reset form fields and exit edit mode
    setIsEditpassMode(false);
  };
  const handleSaveProfile = () => {
    const token = localStorage.getItem('token');
    const updatedUserData = {
      ...user,
      password: isEditMode ? password : undefined, // Include password only when in edit mode
    };



    // Include validation checks for password and confirmPassword

    fetch(`http://localhost:1412/user/api/admin/update-user/${user.userid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUserData),
    })
      .then(response => response.json())
      .then(data => {
        setthanhcong('cập nhật thông tin thành công.')
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });

  };

  const handleCancelEdit = () => {
    // Reset form fields and exit edit mode
    setPassword('');
    setConfirmPassword('');
    setIsEditMode(false);
  };

  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    window.location.href = '/user-list';
  };
  return (
    <div id="wrapper">
      <Navbar />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content" className="d-flex" >

          <div class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Menu />
          </div>
          <div className="container d-flex flex-column "  >
            <div class="card shadow mb-4">


              <div className="card" >
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                    <img src={`/images/${user.images}`}
                      alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: '150px', zIndex: 1, height: '150px', borderRadius: '10px' }}
                    />
                    <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1 }} onClick={isEditMode ? handleSaveProfile : handleEditProfile}>
                      {isEditMode ? 'Save' : 'Edit profile'}
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
                      <p className="small text-muted mb-0">{user.roleid === 1 ? 'User' : 'Admin'}</p>
                    </div>
                    <div>
                      <button type="button" className="btn btn-danger" onClick={signout}>
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black"  >
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <p className="font-italic mb-1">{user.phone}</p>
                      <p className="font-italic mb-1">{user.gender}</p>
                      {loi && <div class="btn btn-danger">{loi}</div>}
                      {thanhcong && <div class="btn btn-success">{thanhcong}</div>}
                      {isEditMode ? (
                        <div>

                          <br />
                          <input type="text" name="firtname" placeholder="First Name" value={user.firtname} onChange={(e) => setUser({ ...user, firtname: e.target.value })} className="form-control mb-2" />
                          <input type="text" name="lastname" placeholder="Last Name" value={user.lastname} onChange={(e) => setUser({ ...user, lastname: e.target.value })} className="form-control mb-2" />
                          <input type="email" name="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="form-control mb-2" />
                          <input type="text" name="phone" placeholder="Phone" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} className="form-control mb-2" />


                          <select
                            name="gender"
                            value={user.gender}
                            onChange={(e) => setUser({ ...user, gender: e.target.value })}
                            className="form-select mb-2"
                            style={{ width: '80%' }}
                          >
                            <option value="" disabled>Select Gender</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                          </select>
                          <a href='/update-user-password' className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1 }}>   đổi mật khẩu</a>


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
                    <p className="mb-0"><a href="/user-list" className="text-muted">Quay lại</a></p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
