import React, { useState } from 'react';
import { Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
const Menu = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Thêm logic xử lý logout ở đây (nếu cần)
    // Sau khi logout, có thể chuyển hướng đến trang đăng nhập
    // window.location.href = '/login.html';
    setShowLogoutModal(false);
  };

  return (
    <div >

    <Nav defaultActiveKey="/user-list" className=" card flex-column navbar navbar-dark bg-primary fixed-menu">
      <Nav.Item  >
        <Nav.Item style={{ color:'white', fontSize:'18px'}}>Admin</Nav.Item>
      </Nav.Item>
      <hr style={{ backgroundColor: 'white', height: '1px', border: 'none', width: '100%' }} />
      <Nav.Item>
        <Nav.Link as={Link} to="/user-list" style={{ color: 'white' }}  className="nav-link-custom-admin"><i class="fa-solid fa-user"></i> User</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/role-list" style={{ color: 'white' }}  className="nav-link-custom-admin"><i class="fa-solid fa-lock"></i> Role</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/user-address-api" style={{ color: 'white' }}  className="nav-link-custom-admin"><i class="fa-solid fa-location-dot"></i> Address</Nav.Link>
      </Nav.Item>
      <hr style={{ backgroundColor: 'white', height: '1px', border: 'none', width: '100%' }} />
      <NavDropdown  title={<span style={{ color: '#fff' }}><i class="fa-solid fa-bag-shopping"></i> Order</span>} id="nav-dropdown"  className="nav-link-custom-admin">
        <NavDropdown.Item as={Link}  to="/order-list">Order All</NavDropdown.Item>
        <NavDropdown title={<span style={{ color: 'black' }}>Order By Status</span>} id="nav-dropdown" className="nav-link-custom">
        <NavDropdown.Item as={Link} style={{ color: 'black' }}to="/order-list-by-status-1">Đang chuẩn bị hàng</NavDropdown.Item>
        <NavDropdown.Item as={Link}style={{ color: 'black' }} to="/order-list-by-status-2">Đang giao </NavDropdown.Item>
        <NavDropdown.Item as={Link}style={{ color: 'black' }} to="/order-list-by-status-3">Đã giao </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title={<span style={{ color: 'black' }}>Order By pay</span>} id="nav-dropdown" className="nav-link-custom">
        <NavDropdown.Item as={Link} to="/order-list-by-pay-1"> Chưa thanh toán</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/order-list-by-pay-2">Đã thanh toán </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title={<span style={{ color: 'black' }}>Order By cancel</span>} id="nav-dropdown" className="nav-link-custom">
        <NavDropdown.Item as={Link} to="/order-list-by-cancel-ok">Đã xác nhận</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/order-list-by-cancel-bad">Đã Hủy </NavDropdown.Item>
      </NavDropdown>
      </NavDropdown>
    
      <Nav.Item>
        <Nav.Link as={Link} to="/product-list" style={{color:'#fff'}} className="nav-link-custom-admin"><i class="fa-brands fa-shopify"></i> Products</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/category-list"style={{color:'#fff'}}  className="nav-link-custom-admin"><i class="fa-solid fa-layer-group"></i> Category</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/categorylv2-list"style={{color:'#fff'}}  className="nav-link-custom-admin"> <i class="fa-solid fa-table-list"></i> CategoryLV2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/color-list"style={{color:'#fff'}}  className="nav-link-custom-admin"> <i class="fa-solid fa-droplet"></i> Color</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/ship-list"style={{color:'#fff'}}  className="nav-link-custom-admin"> <i class="fa-solid fa-droplet"></i> ship</Nav.Link>
      </Nav.Item>
      <hr style={{ backgroundColor: 'white', height: '1px', border: 'none', width: '100%' }} />
      <Nav.Item>
        <Nav.Link as={Link} to="/thong-ke"style={{color:'#fff'}}  className="nav-link-custom-admin"> <i class="fa-solid fa-droplet"></i> Thống kê</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link}  className="nav-link-custom"></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link}  className="nav-link-custom"></Nav.Link>
      </Nav.Item>
   
      {/* Modal Logout */}
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
    </Nav>
    </div>
  );
};

export default Menu;
