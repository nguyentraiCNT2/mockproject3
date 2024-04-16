// src/components/RegisterForm.js
import React, { useState } from 'react';
import axios from '../../../axios';
import Menu from '../Layout/menu';

const SignUpAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firtname: '',
    lastname: '',
    phone: '',
    email: '',
    gender: '',
    state: '',
    city: '',
    dob: '',
    pincode: '',
    course: '',
    emailId: '',
  });

  const [error, setError] = useState('');
  const [passerror, setPasserror] = useState('');
  const [ok, setOk] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(''); // Clear error when user makes changes
    setOk('');
    setPasserror('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xác nhận mật khẩu
    if (formData.password !== formData.confirmPassword) {
      setPasserror('Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    } else if (formData.password.length < 6) {
      setPasserror('Mật khẩu tối thiểu 6 kí tự ');
      return;
    } else if (formData.password.length > 20) {
      setPasserror('Mật khẩu tối đa 20 kí tự ');
      return;
    } else if (/\s/.test(formData.password)) {
      setPasserror('Mật khẩu không được chứa khoảng trắng');
      return;
    } else if (formData.password === formData.username) {
      setPasserror('Mật khẩu không được chứa tên đăng nhập');
      return;
    } else {
      try {
        const response = await axios.post('http://localhost:1412/security/signup', formData);
        localStorage.setItem('tokenuser', response.data.token);
        window.location.href = `/check-email`;
      } catch (error) {
        console.error('Signup Failed:', error.response?.data);
        setError(error.response?.data?.error || 'Tài khoản đã tồn tại');
      }
    }
  };
  return (
    <section className="h-100 bg-dark">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                    alt="Sample photo"
                    className="img-fluid"
                    style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }}
                  />
                </div>
                <div className="col-xl-6" style={{marginLeft:'0px'}}>
                  <div className="card-body p-md-5 text-black">
                  <div className="d-flex align-items-center mb-3 pb-1">
                        <img
                          src="/images/LogoProject3nobackground.png"
                          alt="logo"
                        
                          style={{ width:'70px'}}
                        />

                        <span className="h1 fw-bold mb-0">GuardianNest</span>
                      </div>
                    <h3 className="mb-5 text-uppercase">Đăng ký </h3>
                    {ok && <div class="btn btn-success" style={{ color: 'white' }}>{ok}</div>}
                    {error && <div class="btn btn-danger" style={{ color: 'white' }}>{error}</div>}
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="username"
                            className="form-control form-control-lg"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="username">
                            Tên đăng nhập
                          </label>
                        </div>
                      </div>
                      {passerror && <div class="btn btn-success" style={{ color: 'white' }}>{passerror}</div>}
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="password"
                            id="password"
                            className="form-control form-control-lg"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="password">
                            Mật khẩu
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="password"
                            id="confirmPassword"
                            className="form-control form-control-lg"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="confirmPassword">
                           Xác nhận mật khẩu
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="firtname"
                            className="form-control form-control-lg"
                            name="firtname"
                            value={formData.firtname}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="firtname">
                         họ
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Continue adding the other form fields similar to the provided HTML code */}
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="lastname"
                            className="form-control form-control-lg"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="lastname">
                         Tên
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="phone"
                            className="form-control form-control-lg"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="phone">
                            Số điện thoại
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline  mb-4" style={{marginLeft:'55px', width:'440px'}}>
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                    </div>

                    <div className="d-md-flex justify-content-start align-items-center mb-4 py-2" style={{marginLeft:'55px'}}>
                      <h6 className="mb-0 me-4">Gender: </h6>
                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="femaleGender"
                          value="Nữ"
                          checked={formData.gender === 'Nữ'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="femaleGender">
                          Nữ
                        </label>
                      </div>
                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="maleGender"
                          value="Nam"
                          checked={formData.gender === 'Nam'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="maleGender">
                          Nam
                        </label>
                      </div>
                      <div className="form-check form-check-inline mb-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="otherGender"
                          value="Khác"
                          checked={formData.gender === 'Khác'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="otherGender">
                          Khác
                        </label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end pt-3" style={{marginRight:'110px'}}>
                      <button type="button" className="btn btn-light btn-lg">
                       Làm mới tất cả
                      </button>
                      <button type="submit" onClick={handleSubmit} className="btn btn-warning btn-lg ms-2">
                       Đăng ký
                      </button>
                    </div>
                    <hr/>
                    <div>
                    <p className="justify-content-end pt-3 " style={{ color: '#393f81' }}>
                        Đã có tài khoản  <a href="/user/login" style={{ color: '#393f81' }}>Đăng nhập tại đây</a>
                      </p>
                    </div>
                  
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

export default SignUpAdmin;
