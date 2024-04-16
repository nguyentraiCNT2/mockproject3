import React, { useEffect, useState } from 'react';
import Menu from '../Layout/menu';
import Header from '../../User/layout/header';
const ChangePasswordUser = () => {
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

    if(password !== confirmPassword){
      setloi('Mật khẩu không trùng khớp')
      return;
    }
    else if(password.length > 0 && password.length < 6){
      setloi('Mật khẩu tối thiểu 6 ký tự.')
      return;
    }
    else if(password === ''){
      password = user.password;
      
    }
    else if(password.length > 20){
      setloi('Mật khẩu tối đa 20 ký tự.')
      return;
    }
    else if(/\s/.test(password)){
      setloi('Mật khẩu không thể chưa khoản trắng.')
      return;
    }
   else{

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
        setTimeout(() => {
          window.location.reload();
        }, 5000);
        console.log('Profile updated successfully:', data);
        setIsEditMode(false);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
    }
  };

  const handleCancelEdit = () => {
    // Reset form fields and exit edit mode
    window.location.href = '/profile/user';
  };

  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    window.location.href = '/user-list';
  };
  return (
    <div>
    
      <div className="header" >
      <Header />
      
      </div>
      <div className="main-content ">
      <div className="all ">
    <section className="h-100 gradient-custom-2">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-7">
            <div className="card">
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <img src={`/images/${user.images}`}
                    alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: '150px', zIndex: 1, height:'150px', borderRadius:'10px'}}
                  />
                  <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1, border: '2px solid #fff', color: '#fff', backgroundColor:'#000' }}  onClick={handleSaveProfile}>
                  lưu
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
                
                </div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                
                      <div>
                        <input type="password" name="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-2" />
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control mb-2" />
                
                        <button type="button" className="btn btn-outline-secondary mt-2"  onClick={handleCancelEdit}>
                      Hủy
                    </button>
      
                      </div>
   
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
    </section>
    </div>
    </div>
    </div>
  );
};

export default ChangePasswordUser;
