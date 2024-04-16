import React, { useEffect, useState } from 'react';
import { Nav, Dropdown, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const [images, setImages] = useState('');
  const [firtname, setFirtname] = useState('');
  const [lastname, setLastname] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const parts = token.split('.');
        const payload = JSON.parse(atob(parts[1]));
        const userId = payload.sub;

        fetch(`http://localhost:1412/security/profile/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
          .then(response => response.json())
          .then(data => {
            setShowProfile(true);
            setShowLogin(false);
            setFirtname(data.firtname);
            setLastname(data.lastname);
            setUsername(data.username);
            setUserId(data.userid);
            setImages(data.images);
            setRole(data.roleid === 1 ? 'User' : 'Admin');
          })
          .catch(error => {
            console.error('Error:', error);
            setShowProfile(false);
            setShowLogin(true);
          });
      } catch (error) {
        console.error('Error decoding token:', error);
        setShowProfile(false);
        setShowLogin(true);
      }
    } else {
      setShowProfile(false);
      setShowLogin(true);
    }
  }, []);

  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    window.location.href='/admin/login';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    window.location.href='/admin/login';
    setShowLogoutModal(false);
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <form className="form-inline">
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars"></i>
        </button>
      </form>

      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <strong>
            <img src='/images/LogoProject3nobackground.png' style={{ widows: '50px', height: '50px' }} /> Admin Web
          </strong>
        </div>
      </form>

      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>
        {showLogin && (
          <li className="nav-item dropdown no-arrow">
            <Link className="nav-link" to="/admin/login">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">Đăng nhập</span>
            </Link>
          </li>
        )}
        {showLogin && (
          <li className="nav-item dropdown no-arrow">
            <Link className="nav-link" to="/register">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">Đăng ký</span>
            </Link>
          </li>
        )}
        {showProfile && (
           <Nav>
           <Dropdown drop="down" className="NavLink" >
            <Dropdown.Toggle className="d-flex align-items-center menu-lable "  style={{backgroundColor:'#fff', color:'#000' , overflow: 'hidden' }}>
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Xin chào: {firtname} {lastname}</span>
            <img className="img-profile rounded-circle" src={`/images/${images}`} style={{ widows: '50px', height: '50px' }} alt="User Profile" />
          
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="menu-con" as={Link} to="/profile/admin">  
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile</Dropdown.Item>
              <Dropdown.Item className="menu-con" onClick={() => setShowLogoutModal(true)}  >
            
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
         
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Nav.Link href="#" className="my-auto">

          </Nav.Link>
        </Nav>
          // <li className="nav-item dropdown no-arrow">
          //   <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          //     <span className="mr-2 d-none d-lg-inline text-gray-600 small">Xin chào: {firtname} {lastname}</span>
          //     <img className="img-profile rounded-circle" src={`/images/${images}`} style={{ widows: '50px', height: '50px' }} alt="User Profile" />
          //   </a>
          //   <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          //     <a className="dropdown-item" href="/profile/admin">
          //       <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          //       Profile
          //     </a>
          //     <div className="dropdown-divider"></div>
          //     <a className="dropdown-item"  onClick={() => setShowLogoutModal(true)} data-toggle="modal" data-target="#logoutModal">
          //       <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          //       Logout
          //     </a>
          //   </div>
          // </li>
        )}
      </ul>
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ready to Leave?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Select "Logout" below if you are ready to end your current session.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
