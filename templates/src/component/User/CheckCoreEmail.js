import React, { useState } from 'react';
import axios from '../../axios';
import { Modal, Button } from 'react-bootstrap';

const CheckCoreEmail = () => {
  const [core, setCore] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const token = localStorage.getItem('tokenuser');
  const parts = token.split('.');
  const payload = JSON.parse(atob(parts[1]));
  const userId = payload.sub;
  const checkCoreUrl = async (core) => {
    try {
      const response = await axios.get(`http://localhost:1412/security/admin/check-core/${userId}?Mkc2=${core}`);
        console.log(response.data);
      if (response.data != null) {
        setSuccessMessage("Đăng ký thành công");
        setShowLogoutModal(true);
      } else {
        setErrorMessage("Mã xác thực không chính xác.");
        setShowLogoutModal(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage("Đã xảy ra lỗi khi kiểm tra mã xác thực.");
      setShowLogoutModal(false);
    }
  };

  const handleLogin = () => {
    window.location.href = `/index`;
    setShowLogoutModal(false);
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
                      Xác thực tài khoản
                      </h5>
                      {successMessage && <div className="btn btn-success" style={{ color: 'white' }}>{successMessage}</div>}
                      {errorMessage && <div className="btn btn-danger" style={{ color: 'white' }}>{errorMessage}</div>}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">
                         Mã xác thực 
                      
                        </label>
                        <input
                          type="number"
                          name="core"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={core}
                          onChange={(e) => setCore(e.target.value)}
                        />
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={() => checkCoreUrl(core)}
                        >
                         Gửi
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
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tài khoản của bạn đã được khởi tạo thành công. Vui lòng đi đến trang đăng nhập.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Đi đến đăng nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default CheckCoreEmail;
