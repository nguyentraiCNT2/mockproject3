import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import '../../../css/shoppingcart.css';
import Header from '../layout/header';
import FooterUser from '../layout/footer';
import { Container, Row, Col, Card , Alert } from 'react-bootstrap';
const CheckOut = () => {
    const [productid, setProductid] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchProductName, setSearchProductName] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [quantity, setQuantity] = useState('');
    const [shoppingCartid, setShoppingCartid] = useState([]);
    const [productNames, setProductNames] = useState({});
    const [productimages, setProductImages] = useState({});
    const [productPrice, setProductPrice] = useState({});
    const [cartItemCount, setCartItemCount] = useState(0);
    const [Count, setCount] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState({}); // Trạng thái của các checkbox được lưu trữ ở đây
    const [CountStatus, setCountStatus] = useState(0);
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [userdetatils, setuserdetatils] = useState([]);
    const [firtname, setFirtname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [useraddress, setUseraddress] = useState([]);
    const [ships, setShips] = useState([]);
    const [selectedShip, setSelectedShip] = useState('');
    const [selectAddress, setSelectAddress] = useState('');
    const [CheckoutCount, setCheckoutCount] = useState(0);
    const [Shipprice, setShipprice] = useState(0);
    localStorage.setItem('cartItemCount', cartItemCount);

    useEffect(() => {
        fetchShoppingCart();
        fetchUserdetatils();
        fetchUserAddress();
    }, [page, limit, searchProductName, productid, cartItemCount]);

    const fetchShoppingCart = async () => {
        try {
            const token = localStorage.getItem('tokenuser');
            const parts = token.split('.');
            const payload = JSON.parse(atob(parts[1]));
            const userId = payload.sub;
            const response = await axios.get(`http://localhost:1412/shopping-cart/api/get-by-status/${userId}?page=${page}&limit=${limit}`);
            setShoppingCart(response.data.listResult);
            setTotalPages(response.data.totalPage);
            fetchProductNames(response.data.listResult);
            fetchProductImages(response.data.listResult);
            fetchProductPrice(response.data.listResult);
            setCheckoutCount(response.data.listResult.length)
            setCartItemCount(response.data.listResult.length);

            setCount((prevCount) => prevCount + 1);
            // Gọi hàm để tính tổng tiền cho từng sản phẩm trong giỏ hàng
        } catch (error) {
            console.error('Error fetching shopping cart:', error);
        }
    };
    const fetchUserdetatils = async () => {
        const token = localStorage.getItem('tokenuser');
        const parts = token.split('.');
        const payload = JSON.parse(atob(parts[1]));
        const userId = payload.sub;
        const response = await axios.get(`http://localhost:1412/security/profile/admin/${userId}`);
        setuserdetatils(response.data);
        setLastname(response.data.lastname);
        setFirtname(response.data.firtname);
        setPhone(response.data.phone);
        setEmail(response.data.email);
        console.log(response.data.lastname);
    }
    const fetchUserAddress = async () => {
        const token = localStorage.getItem('tokenuser');
        const parts = token.split('.');
        const payload = JSON.parse(atob(parts[1]));
        const userId = payload.sub;
        const response = await axios.get(`http://localhost:1412/admin/user-address/api/admin/user-address-by-user-id/${userId}?page=${page}&limit=${limit}`);
        setUseraddress(response.data.listResult);
    }
    
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertErrors, setShowAlertErrors] = useState(false);
    const handlePlaceOrder = async () => {
        try {
            const token = localStorage.getItem('tokenuser');
            const parts = token.split('.');
            const payload = JSON.parse(atob(parts[1]));
            const userId = payload.sub;
            const orderData = {
                order: {
                    userid: userId,
                    address: selectAddress
                }
                ,
                orderDetailsList: shoppingCart.map(cart => ({
                    shipid: selectedShip,
                    productsid: cart.productsid,
                    orderqty: cart.qty


                }))
            };
            const response = await axios.post('http://localhost:1412/order/api/placeOrder', orderData);
            console.log('Order placed successfully:', response.data);
           
            clearCart();
            // Thực hiện các hành động tiếp theo sau khi đặt hàng thành công
        } catch (error) {
            setShowAlert(false);
            setShowAlertErrors(true)
            setTimeout(() => {
                setShowAlertErrors(false)
                window.location.reload();
              }, 5000);
           
            console.error('Error placing order:', error);
        }
    };
    const clearCart = async () => {
        try {
            const token = localStorage.getItem('tokenuser');
            const parts = token.split('.');
            const payload = JSON.parse(atob(parts[1]));
            const userId = payload.sub;

            // Gửi yêu cầu xóa giỏ hàng đến máy chủ
            await axios.delete(`http://localhost:1412/shopping-cart/api/delete-shopping-cart-by-userid/${userId}`);

            setShowAlert(true);
            setShowAlertErrors(false)
            setTimeout(() => {
              setShowAlert(false);
              window.location.href = '/index';
            }, 5000);

        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const fetchProductNames = async (cartItems) => {
        const promises = cartItems.map((cart) =>
            axios.get(`/admin/product/api/admin/product-by-id/${cart.productsid}`)
        );

        try {
            const responses = await Promise.all(promises);
            const productNamesMap = responses.reduce((acc, response, index) => {
                const product = response.data;
                acc[cartItems[index].productsid] = product ? product.productname : 'Sản phẩm không xác định';
                return acc;
            }, {});

            setProductNames(productNamesMap);
        } catch (error) {
            console.error('Lỗi khi lấy tên sản phẩm:', error);
        }
    };

    const fetchProductImages = async (cartItems) => {
        const promises = cartItems.map((cart) =>
            axios.get(`/admin/product/api/admin/product-by-id/${cart.productsid}`)
        );

        try {
            const responses = await Promise.all(promises);
            const productImagesMap = responses.reduce((acc, response, index) => {
                const product = response.data;
                acc[cartItems[index].productsid] = product ? product.imagesmain : 'Sản phẩm không xác định';
                return acc;
            }, {});

            setProductImages(productImagesMap);
        } catch (error) {
            console.error('Lỗi khi lấy tên sản phẩm:', error);
        }
    };

    const fetchProductPrice = async (cartItems) => {
        const promises = cartItems.map((cart) =>
            axios.get(`/admin/product/api/admin/product-by-id/${cart.productsid}`)
        );

        try {
            const responses = await Promise.all(promises);
            const productNamesMap = responses.reduce((acc, response, index) => {
                const product = response.data;
                acc[cartItems[index].productsid] = product ? product.productprice : 'Sản phẩm không xác định';
                return acc;
            }, {});

            setProductPrice(productNamesMap);
        } catch (error) {
            console.error('Lỗi khi lấy tên sản phẩm:', error);
        }
    };
    useEffect(() => {
        const fetchShips = async () => {
            try {
                const response = await axios.get('http://localhost:1412/admin/ship/api/oder/ship/list?page=1&limit=10');
                setShips(response.data.listResult);
            } catch (error) {
                console.error('Error fetching ships:', error);
            }
        };

        fetchShips();
    }, []);
    const handleShipChange = (e) => {
        setSelectedShip(e.target.value);
        setShipprice(selectedShip);
    };
    const calculateTotalAmount = () => {
        return shoppingCart.reduce((total, cart) => total + (cart.qty * productPrice[cart.productsid]), 0);
    };
    const getShipPrice = () => {
        const selectedShipObj = ships.find(ship => ship.shipid === Shipprice);
        return selectedShipObj ? selectedShipObj.shipprice : 0;

    };
var Dongia = 0;
    return (
        <div>
                      {showAlert && (
        <div className="thongbao-fullscreen">
          <Alert variant="success" className="content-thongbao" onClose={() => setShowAlert(false)} >
           Đặt hàng thành cong đơn hàng của bạn đã được xác nhận.!
          </Alert>
        </div>
      )}
         {showAlertErrors && (
        <div className="thongbao-fullscreen">
          <Alert variant="danger" className="content-thongbao" onClose={() => setShowAlertErrors(false)} >
         Sảy ra lỗi khi đặt hàng.!
          </Alert>
        </div>
      )}
            <div className="header">
                <Header cartItemCount={cartItemCount} />
            </div>
            <div className="main-content ">
                <div className="all">
                    {CheckoutCount === 0 ? <h2 style={{ padding: '40px', textAlign: 'center' }}>Bạn chưa chọn sản phẩm nào! </h2> :
                        <div>

                            <div className="shopping-cart" style={{ padding: '40px' }}>
                                <>
                                    <table className="table-cart table table-bordered" style={{ borderRadius: '20px' }}>
                                        <thead>
                                            <tr>
                                                <td scope="col" ><strong>Cart ID</strong> </td>
                                                <td scope="col"><strong>Hình ảnh</strong></td>
                                                <td scope="col"><strong>Tên sản phẩm</strong> </td>
                                                <td scope="col"><strong> </strong></td>
                                                <td scope="col"><strong>Số lượng </strong></td>
                                         
                                                <td scope="col"><strong>Đơn giá </strong></td>
                                                <td scope="col"><strong>Thành tiền </strong></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {shoppingCart.map((cart, index) => (
                                             
                                                <tr key={cart.cartid}>
                                                    <td scope="row"> {Count + index}</td>
                                                    <td >
                                                        <img src={`/images/${productimages[cart.productsid]}`} style={{ width: '100px', height: '100px' }} alt="products" />
                                                    </td>
                                                    <td  colSpan="2">{productNames[cart.productsid] || 'Đang tải...'}</td>
                                                    <td>{cart.qty}</td>
                                                    <td>{productPrice[cart.productsid] ? productPrice[cart.productsid].toLocaleString() + ' VNĐ' : 'N/A'}</td>

                                                    <td>{ (productPrice[cart.productsid] * cart.qty).toLocaleString()} VNĐ </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                  
                                        <tr>
                                            <td colSpan="5"></td>
                                            <td  style={{ fontFamily: 'Poppins-Regular', fontSize: '16px', color: '#000' }}>Tổng tiền : </td>
                                            <td  style={{ fontFamily: 'Poppins-Regular', fontSize: '16px', color: '#000', fontWeight:'700' }}>{calculateTotalAmount().toLocaleString()} VNĐ</td>
                                        </tr>

                                    </table>

                                    <div className="order" >
                                        <div className='address-order' style={{margin: 'auto'}}>
                                            <select name='address' value={selectAddress} onChange={(e) => setSelectAddress(e.target.value)}
                                                style={{ borderRadius: '20px', padding: '10px 30px ', marginRight: '30px', textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '16px', color: '#000' }}>
                                                <option value=''>Chọn Địa chỉ</option>
                                                {useraddress.map(address => (
                                                    <option key={address.useraddressid} value={address.useraddress} style={{ fontFamily: 'Poppins-Regular', fontSize: '16px', color: '#000' }}>{address.useraddress}</option>
                                                ))}
                                            </select>
                                            <select name='shipid' value={selectedShip} onChange={handleShipChange} style={{ textAlign: 'center', width: '300px', borderRadius: '20px', padding: '10px 30px ', fontFamily: 'Poppins-Regular', fontSize: '16px', color: '#000' }}>
                                                <option value=''>Chọn loại Ship</option>
                                                {ships.map(ship => (
                                                    <option key={ship.shipid} value={ship.shipid} style={{ fontFamily: 'Poppins-Regular', fontSize: '16px', color: '#000' }}>{ship.shipname}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <hr />
                                        <div className='user-info-order' style={{ display: 'flex', }}>
                                            <p style={{ marginRight: '50px', fontFamily: 'Poppins-Regular', fontSize: '20px', color: '#000' }}>Họ tên người nhận: {firtname} {lastname}</p>
                                            <p style={{ marginRight: '50px', fontFamily: 'Poppins-Regular', fontSize: '20px', color: '#000' }}>Số Điện thoại: {phone} </p>
                                        </div>
                                        <hr />
                                        <div className='email-info'>
                                            <p style={{ marginRight: '50px', fontFamily: 'Poppins-Regular', fontSize: '20px', color: '#000' }}>Gmail người nhận: {email}</p>
                                        </div>
                                        <hr />
                                       
                                    </div>
                                    <button
                                  
                                            className="btn btn-danger ms-2 muahang"
                                            onClick={handlePlaceOrder} // Gọi hàm handlePlaceOrder khi nhấn
                                        >
                                            <i className="fa-solid fa-cart-shopping"></i> Mua hàng
                                        </button>
                                </>


                            </div>
                        </div>
                    }
                </div>

            </div>
            <FooterUser />
        </div>

    );
};

export default CheckOut;
