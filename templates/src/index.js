// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './component/Admin/User/UserList';
import AddUserPage from './component/Admin/User/AddUserPage';
import RoleList from './component/Admin/Role/RoleList';
import AddRolePage from './component/Admin/Role/AddRolePage';
import UserAddressList from './component/Admin/UserAddress/UserAddressList';
import AddUserAddress from './component/Admin/UserAddress/AddUserAddress';
// import AddImagePage from './component/User/AddImagePage';
import CategoryList from './component/Admin/Category/CategoryList';
import AddCategoryPage from './component/Admin/Category/AddCategoryPage';
import CategoryLV2List from './component/Admin/CategoryLV2/CategoryLV2List';
import AddCategoryLV2Page from './component/Admin/CategoryLV2/AddCategoryLV2Page';
import ImageUploadComponent from './component/Admin/User/ImageUploadComponent';
import ColorList from './component/Admin/Color/ColorList';
import AddColorPage from './component/Admin/Color/AddColorPage';
import SigninAdmin from './component/Admin/security/Signin';
import AdminProfile from './component/Admin/security/AdminProfile';
import UserProfile from './component/Admin/security/UserProfile';
import SignUpAdmin from './component/Admin/security/Signup';
import ProductListPage from './component/Admin/product/Productlist';
import AddProductPage from './component/Admin/product/AddProductPage';
import Login from './component/User/Login';
import OrderList from './component/Admin/Order/OrderList';
import OrderListByStatus1 from './component/Admin/Order/OrderListBystatus1';
import OrderListByStatus2 from './component/Admin/Order/OrderListBystatus2';
import OrderListByStatus3 from './component/Admin/Order/OrderListBystatus3';
import OrderListByPay1 from './component/Admin/Order/OrderListByPay1';
import OrderListByPay2 from './component/Admin/Order/OrderListByPay2';
import OrderListByCancelbad from './component/Admin/Order/OrderListByCancelbad';
import OrderListByCancelok from './component/Admin/Order/OrderListByCancel';
import AddproductImagePage from './component/Admin/product/AddImageProductPage';
import OrderEdit from './component/Admin/Order/OrderEdit';
import ChangePasswordForm from './component/Admin/security/ChangePasswordForm';
import Homeweb from './component/User/Home';
import ProductLisUser from './component/User/product/ProductListuser';
import ProductListUserByCategoryLv2 from './component/User/product/productlistbyCategorylv2';
import ProductDetail from './component/User/product/ProductDetail';
import ShoppingCartlist from './component/User/cart/Shoppingcart';
import CheckOut from './component/User/checkout/CheckOut';
import SearchProduct from './component/User/product/SearchProduct';
import ChangePasswordUser from './component/Admin/security/ChangePassworduser';
import ShipList from './component/Admin/ship/Shiplist';
import AddShipPage from './component/Admin/ship/addShippage';
import Statistical from './component/Admin/statistical/statistical';
import CheckCoreEmail from './component/User/CheckCoreEmail';
import ForGotPassword from './component/User/ForGotPassword';
import ChangePasswordOfuserl from './component/User/ChangePassword';
import CheckEmailCorePass from './component/User/CheckEmailcorePass';
import UserAddressListofuser from './component/User/addressuser/UserAddressList';
import AddUserAddressofuser from './component/User/addressuser/AddUserAddress';
import OrderListUser from './component/User/OrderListUser/OrderList';
import OrderEditUser from './component/User/OrderListUser/OrderEdit';
import OrderStatus1 from './component/User/OrderListUser/OrderStatus1';
import OrderStatus2 from './component/User/OrderListUser/OrderStatus2';
import OrderStatus3 from './component/User/OrderListUser/OrderStatsu3';
import OrderCanCelUser from './component/User/OrderListUser/OrderCanceluser';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/role-list" element={<RoleList />} />
        <Route path="/add-role" element={<AddRolePage />} />
        <Route path="/user-address-api" element={<UserAddressList />} />
        <Route path="/add-user-address" element={<AddUserAddress />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/add-category" element={<AddCategoryPage />} />
        <Route path="/categorylv2-list" element={<CategoryLV2List />} />
        <Route path="/add-category-level-2" element={<AddCategoryLV2Page />} />
        <Route path="/add-category-level-2-add-image" element={<ImageUploadComponent />} />
        <Route path="/color-list" element={<ColorList />} />
        <Route path="/add-color" element={<AddColorPage />} />
        <Route path="/admin/login" element={<SigninAdmin />} />
        <Route path="/profile/admin" element={<AdminProfile />} />
        <Route path="/profile/user" element={<UserProfile />} />
        <Route path="/admin/signup" element={<SignUpAdmin />} />
        <Route path="/product-list" element={<ProductListPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/order-list-by-status-1" element={<OrderListByStatus1 />} />
        <Route path="/order-list-by-status-2" element={<OrderListByStatus2 />} />
        <Route path="/order-list-by-status-3" element={<OrderListByStatus3 />} />
        <Route path="/order-list-by-pay-1" element={<OrderListByPay1 />} />
        <Route path="/order-list-by-pay-2" element={<OrderListByPay2 />} />
        <Route path="/order-list-by-cancel-ok" element={<OrderListByCancelok />} />
        <Route path="/order-list-by-cancel-bad" element={<OrderListByCancelbad />} />
        <Route path="/add-product-images" element={<AddproductImagePage />} />
        <Route path="/order-edit" element={<OrderEdit />} />
        <Route path="/update-user-password" element={<ChangePasswordForm />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/index" element={<Homeweb />} />
        <Route path="/product-details" element={<ProductDetail />} />
        <Route path="/cart" element={<ShoppingCartlist />} />
        <Route path="/update-password" element={<ChangePasswordUser />} />
        <Route path="/product-by-category" element={<ProductLisUser />} />
        <Route path="/product-by-search" element={<SearchProduct />} />
        <Route path="/ship-list" element={<ShipList />} />
        <Route path="/add-ship" element={<AddShipPage />} />
        <Route path="/thong-ke" element={<Statistical />} />
        <Route path="/check-email" element={<CheckCoreEmail />} />
        <Route path="/product-by-categorylv2" element={<ProductListUserByCategoryLv2 />} />
        <Route path="/for-got-password" element={<ForGotPassword />} />
        <Route path="/set-new-password" element={<ChangePasswordOfuserl />} />
        <Route path="/check-email-of-user" element={<CheckEmailCorePass />} />
        <Route path="/user-address-list-of-user" element={<UserAddressListofuser />} />
        <Route path="/add-user-address-list-of-user" element={<AddUserAddressofuser />} />
        <Route path="/order-list-user" element={<OrderListUser />} />
        <Route path="/order-edit-user" element={<OrderEditUser />} />
        <Route path="/order-status-user-1" element={<OrderStatus1 />} />
        <Route path="/order-status-user-2" element={<OrderStatus2 />} />
        <Route path="/order-status-user-3" element={<OrderStatus3 />} />
        <Route path="/order-cancel-user" element={<OrderCanCelUser />} />
        {/* <Route path="/upload-image/:userid" element={<AddImagePage />} /> */}
        {/* Thêm các Route khác cho các trang khác */}
        {/* Ví dụ Route cho trang About */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </React.StrictMode>
  </Router>
);

reportWebVitals();
