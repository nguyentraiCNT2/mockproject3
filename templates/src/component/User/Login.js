import React, { useState, useEffect } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    // Load rememberMe state from localStorage on component mount
    const storedRememberMe = localStorage.getItem('rememberMe');
    if (storedRememberMe) {
      setRememberMe(true);
      // Load other necessary data from localStorage if needed
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');
      if (storedUsername) setUsername(storedUsername);
      if (storedPassword) setPassword(storedPassword);
    }
  }, []);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  const signin = () => {

    fetch('http://localhost:1412/security/user/signin', {
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
        localStorage.setItem('tokenuser', data.token);
        // Save rememberMe state to localStorage
        localStorage.setItem('rememberMe', rememberMe ? '1' : '0');
        // Save other necessary data to localStorage if needed
        if (rememberMe) {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }
        window.location.href = `/index`;
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
                       Đăng nhập
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
                          Mật khẩu
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                     
                      </div>
                      <div className="form-check mb-4">
                        <input
                          type="checkbox"
                          id="form2Example28"
                          className="form-check-input"
                          checked={rememberMe}
                          onChange={handleRememberMeChange}
                        />
                        <label className="form-check-label" htmlFor="form2Example28">
                          Ghi nhớ tài khoản
                        </label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={signin}
                        >
                          Đăng nhập
                        </button>
                      </div>

                      <a className="small text-muted" href="/for-got-password">
                        Quên mật khẩu?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                        Không có tài khoản  <a href="/admin/signup" style={{ color: '#393f81' }}>Đăng ký tại đây</a>
                      </p>
                    
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

export default Login;
