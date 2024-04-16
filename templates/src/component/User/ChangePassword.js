import React, { useEffect, useState } from 'react';
import axios from '../../axios';
const ChangePasswordOfuserl = () => {
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

  const [userid, setuserid] = useState('');
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
    setuserid(userId);
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
  const handleFormSubmit = async (formData) => {
 try{
        await axios.put(`/user/api/admin/update-user/${user.userid}`, user);

    
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const handleSaveProfile = async () => {
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
    try{
        user.password = password;
        await axios.put(`/user/api/admin/update-user/${user.userid}`, user);
        setthanhcong('cập nhật mật khẩu thành công, vui lòng đi đến trang đăng nhập.');
            setTimeout(() => {
                window.location.href = '/user/login';
            }, 5000);
    } catch (error) {
        setloi('có lỗi khi cập nhật mật khẩu.')
      console.error('Error submitting form:', error);
    }
}
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card" style={{ borderRadius: '1rem' }}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block " style={{padding:'35px  0px'}}>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                  alt="login form"
                  className="img-fluid"
                  style={{ borderRadius: '30px' }}
                />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <img
                        src="/images/LogoProject3nobackground.png"
                        alt="logo"
                        style={{ width:'70px'}}
                      />
                      <span className="h1 fw-bold mb-0">GuardianNest</span>
                    </div>
                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                    Tạo mật khẩu mới
                
                    </h5>
                    {thanhcong && <div className="btn btn-success" style={{ color: 'white' }}>{thanhcong}</div>}
                    {loi && <div className="btn btn-danger" style={{ color: 'white' }}>{loi}</div>}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form2Example17">
                       Mật khẩu mới
                      
                      </label>
                      <input
                      type="password"
                       name="password"
                       placeholder="New Password" 
                       value={password} 
                       onChange={(e) => setPassword(e.target.value)}
                        id="form2Example17"
                        className="form-control form-control-lg"
                      
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form2Example17">
                       Xác nhật mật khẩu
                     
                      </label>
                      <input
                      type="password"
                      placeholder="Confirm Password"
                       value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        id="form2Example17"
                        className="form-control form-control-lg"
                      
                      />
                    </div>
                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-dark btn-lg btn-block"
                        type="button"
                        onClick={() => handleSaveProfile()}
                      >
                       Xác nhận
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  </section>
  );
};

export default ChangePasswordOfuserl;
