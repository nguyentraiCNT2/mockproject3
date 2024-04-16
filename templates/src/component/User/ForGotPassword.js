import React, { useState, useEffect } from 'react';

const ForGotPassword = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);


  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  const signin = () => {

    fetch('http://localhost:1412/security/for-got-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&email=${email}`,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        setSuccessMessage('kiểm tra tài khoản thành công!');
        localStorage.setItem('tokenuser', data.token);
        // Save rememberMe state to localStorage
     
       
        window.location.href = `/check-email-of-user`;
        // Thêm mã giải mã token ở đây (dùng Base64)
        const parts = data.token.split('.');
        const payload = atob(parts[1]);
        console.log('Decoded Token Payload:', JSON.parse(payload));
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('Tài khoản hoặc mật khẩu không đúng!');
      });
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
                      Quên mật khẩu
                      </h5>
                      {successMessage && <div class="btn btn-success" style={{ color: 'white' }}>{successMessage}</div>}
                      {errorMessage && <div class="btn btn-danger" style={{ color: 'white' }}>{errorMessage}</div>}
                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form2Example17">
                          Tên đăng nhập
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                    
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form2Example27">
                     Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={signin}
                        >
                          Kiểm tra tài khoản
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

export default ForGotPassword;
