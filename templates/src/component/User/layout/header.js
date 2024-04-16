import React, { useEffect, useState } from 'react';
import { Navbar, Nav, FormControl, Button, Container, Dropdown, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../../../css/header.css';
import axios from '../../../axios';
const Header = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const [images, setImages] = useState('');
  const [firtname, setFirtname] = useState('');
  const [lastname, setLastname] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [productid, setProductid] = useState([]);
  const [searchProductName, setSearchProductName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [passwordtr, setPasswordtr] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [gender, setgender] = useState('');
  const [mkc2, setmkc2d] = useState('');
  const [roleidSS, setroleidSS] = useState('');
  useEffect(() => {
    fetchShoppingCart();
  }, [page, limit, searchProductName, productid, cartItemCount]);

  useEffect(() => {
    const loadScripts = async () => {
      try {
        // Load jQuery
        const jqueryScript = document.createElement('script');
        jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        jqueryScript.integrity = 'sha256-H+K7U5CnD4GoiILxq6zpc/z65K1k5uC6FycF1WG/CgM=';
        jqueryScript.crossOrigin = 'anonymous';
        document.body.appendChild(jqueryScript);

        await new Promise((resolve) => {
          jqueryScript.onload = resolve;
        });

        // Load Bootstrap
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.7.0/dist/js/bootstrap.bundle.min.js';
        bootstrapScript.integrity = 'sha384-pzjw8f+ua/CpLXRr+dybF5ZqyOW9cC3zlti47onlqE2wojEm2XtMdYCA7/viqzhF';
        bootstrapScript.crossOrigin = 'anonymous';
        document.body.appendChild(bootstrapScript);
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    loadScripts();
  }, []);

  const fetchShoppingCart = async () => {
    try {
      const token = localStorage.getItem('tokenuser');
      const parts = token.split('.');
      const payload = JSON.parse(atob(parts[1]));
      const userId = payload.sub;
      const response = await axios.get(`http://localhost:1412/shopping-cart/api/get-by-user-id/${userId}?page=${page}&limit=${limit}`);
      setShoppingCart(response.data.listResult);
      setCartItemCount(response.data.listResult.length)
      // Gọi hàm để tính tổng tiền cho từng sản phẩm trong giỏ hàng
    } catch (error) {
      console.error('Error fetching shopping cart:', error);
    }
  };

  const handleupdateuser = async (status) => {
   
    try {
      const token = localStorage.getItem('tokenuser');
      const parts = token.split('.');
      const payload = JSON.parse(atob(parts[1]));
      const userId = payload.sub;
      const response = await axios.put(`http://localhost:1412/user/api/admin/update-user/${userId}`, {
        username: username,
        password: passwordtr,
        firtname: firtname,
        lastname: lastname,
        phone: phone,
        email: email,
        images:images,
        gender: gender,
        roleid: roleidSS,
        mkc2: mkc2,
        status: false

      });
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error('Error updating user:', error); // Handle error response
    }
  };
  const updateStatusForAllItems = async (status) => {
    try {
      for (const cartItem of shoppingCart) {
        await updateStatus(cartItem.cartid, status, cartItem.qty, cartItem.productsid);
      }
    } catch (error) {
      console.error('Error updating status for all items:', error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('tokenuser');

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
            setPasswordtr(data.password);
            setphone(data.phone);
            setemail(data.email);
            setgender(data.gender);
            setmkc2d(data.mkc2);
            setroleidSS(data.roleid);
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
  
  const updateStatus = async (cartId, newstaus, qty, productId) => {

    const token = localStorage.getItem('tokenuser');
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    const userId = payload.sub;
    try {
        const updatedProduct = {
            ...selectedProduct,
            status: newstaus,
            qty: qty,
            userid: userId,
            productsid: productId,
        };

        await axios.put(`http://localhost:1412/shopping-cart/api/update-shopping-cart/${cartId}`, updatedProduct);
        fetchShoppingCart();
        setSelectedProduct(null);
       
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
};

  const signout = () => {
    localStorage.removeItem('tokenuser');
    localStorage.removeItem('userid');
    window.location.href = '/user/login';
  };

  const handleLogout = () => {
    handleupdateuser(false)
    localStorage.removeItem('tokenuser');
    localStorage.removeItem('userid');
    window.location.href = '/user/login';
    setShowLogoutModal(false);
  };
  const handleActions = (categotyid) => {
    localStorage.setItem('categoryids', categotyid);
    window.location.href = '/product-by-category';
  };
  const handleActionslv2 = (categotylv2id) => {
    localStorage.setItem('categorylv2ids', categotylv2id);
    window.location.href = '/product-by-categorylv2';
  };
  const handleActionsSearch = (searchProductName) => {
    localStorage.setItem('searchProducts', searchProductName);
    window.location.href = '/product-by-search';
  }
  return (
    <div >

      <div className="TopBar">
        <Navbar expand="lg" style={{ color: '#fff' }}>
          <Container>
            {/* Logo */}
            <Navbar.Brand href="/index">
              <img src="/images/GuardianNest.png" style={{ widows: '70px', height: '70px', color: '#fff' }} alt="User Profile" />
              <span style={{ color: '#fff' }}> GuardianNest</span>
            </Navbar.Brand>

            {/* Navbar Toggle Button */}
            <Navbar.Toggle aria-controls="navbarScroll" />

            {/* Navbar Collapsible Content */}
            <Navbar.Collapse id="navbarScroll">

              {/* Search Input */}
              <Nav className="me-auto justify-content-center " style={{ paddingLeft: '180px' }} >
                <div className="search-input me-auto justify-content-center d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="search-input-text"
                    aria-label="Search"
                    style={{ width: '400px' }}
                    value={searchProductName}
                    onChange={(e) => setSearchProductName(e.target.value)}
                  />
                  <Button variant="outline-primary " onClick={() => handleActionsSearch(searchProductName)} className="search search-button"><i class="fa-solid fa-magnifying-glass"></i></Button>
                </div>

              </Nav>

              {/* Cart Icon */}
              <Nav>
                <Nav.Link href="/cart" onClick={() => updateStatusForAllItems(false)} className="position-relative me-3 my-auto">
                  <i class="fa-solid fa-cart-shopping " style={{ color: '#fff' }}></i>

                  {/* <i className="fa fa-shopping-bag fa-2x"  ></i> */}
                  <span className="position-absolute  rounded-circle d-flex align-items-center justify-content-center  px-1" style={{ top: '-5px', left: '15px', height: '20px', minWidth: '20px', background: 'red', color: '#fff' }}>{cartItemCount}</span>
                </Nav.Link>
              </Nav>
             
              {showLogin && (
                <li className="nav-item dropdown no-arrow">
                  <Link className="nav-link" to="/user/login">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Đăng nhập /</span>
                  </Link>
                </li>
              )}
              {showLogin && (
                <li className="nav-item dropdown no-arrow">
                  <Link className="nav-link" to="/admin/signup">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Đăng ký</span>
                  </Link>
                </li>
              )}
              {/* Avatar Icon */}
              {showProfile && (
                <Nav>
                  <Dropdown drop="down" className="NavLink" >
                    <Dropdown.Toggle className="d-flex align-items-center menu-lable " style={{ backgroundColor: '#000', color: '#fff', overflow: 'hidden' }}>
                      <img className="img-profile rounded-circle" src={`/images/${images}`} style={{ widows: '50px', height: '50px' }} alt="User Profile" />
                      {lastname.slice(0, 25)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="menu-con" as={Link} to="/profile/user">
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
              )}


            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="Menu">
        <Navbar expand="lg" >
          <Container>
            <Nav >
              <Nav.Link as={Link} to="/index" className="nav-link-custom">Trang chủ</Nav.Link>
              <Dropdown drop="down" className="NavLink" >
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center menu-lable " >
                  <Dropdown.Item onClick={() => handleActions(1)}>Điện thoại</Dropdown.Item>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleActionslv2(1)}>iphone</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleActionslv2(2)}>Sam Sung</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleActionslv2(3)}>Xiaomi</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleActionslv2(4)}>Realme</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown drop="down" className="NavLink" >
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center menu-lable " >
                  <Dropdown.Item onClick={() => handleActions(2)}>Laptop</Dropdown.Item>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleActionslv2(6)}>Asus</Dropdown.Item>
                  <Dropdown.Item a onClick={() => handleActionslv2(5)}>HP</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleActionslv2(7)}>DELL</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown drop="down" className="NavLink">
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center menu-lable" >
                  <Dropdown.Item as={Link} to="/menu/muc-1" onClick={() => handleActions(3)}>Phụ Kiện</Dropdown.Item>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleActionslv2(9)}>Tai nghe </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleActionslv2(8)}>Bàng phím </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleActionslv2(10)}>Chuột</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </Nav>
          </Container>
        </Navbar>
      </div>
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo xác nhận?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chặn muốn thoát không.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
};

export default Header;
