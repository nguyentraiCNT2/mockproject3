import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'; // Import thư viện useHistory từ React Router
import Menu from '../Layout/menu';

const SigninAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const history = useHistory(); // Sử dụng useHistory để điều hướng

  const signin = () => {
    fetch('http://localhost:1412/security/admin/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&password=${password}`,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        setSuccessMessage('Đăng nhập thành công!');

        localStorage.setItem('token', data.token);

        // Giải mã token để lấy giá trị "sub"
        const parts = data.token.split('.');
        const payload = JSON.parse(atob(parts[1]));
        const userId = payload.sub;

        // Sử dụng useHistory để điều hướng đến trang profile và truyền dữ liệu
        window.location.href = `/user-list`; 
        // history.push(`/profile/admin/${userId}`);
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('tài khoản hoặc mật khẩu không đúng');
      });
  };

  return (
    <div className="form-container" style={{background:'#fff'}}>
      <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="px-5 ms-xl-4">
             
              <span className="h1 fw-bold mb-0"></span>
              <span className="h1 fw-bold mb-0"><img src='/images/LogoProject3nobackground.png'  style={{ width:'100px', height:'100px' }} /> GuardianNest</span>
            </div>
         
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: '23rem' }}>
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>
                {successMessage && <div  class="btn btn-success" style={{ color:'white'}}>{successMessage}</div>}
                {errorMessage && <div  class="btn btn-danger" style={{ color:'white'}}>{errorMessage}</div>}
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}></h3>
                <div className="form-outline mb-4">
                  <input type="text" id="form2Example18" className="form-control form-control-lg" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                  <label className="form-label" htmlFor="form2Example18">Tên đăng nhâp</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form2Example28" className="form-control form-control-lg" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <label className="form-label" htmlFor="form2Example28">Mật khẩu</label>
                </div>

                <div className="pt-1 mb-4">
                  <button className="btn btn-info btn-lg btn-block" type="button" onClick={signin}>Đăng nhập</button>
                </div>

                
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
              alt="Login image" className="w-100 vh-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
          </div>
        </div>
      </div>
    </section>
      
    </div>
  );
};

export default SigninAdmin;
