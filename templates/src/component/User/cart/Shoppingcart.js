import React, { useState, useEffect } from 'react';
import axios from '../../../axios';

import { Link } from 'react-router-dom';
import '../../../css/shoppingcart.css';
import Header from '../layout/header';
import FooterUser from '../layout/footer';
const ShoppingCartlist = () => {

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
    const [status, setStatus] = useState(false);
    localStorage.setItem('cartItemCount', cartItemCount);

    useEffect(() => {
        fetchShoppingCart();
        fetchShoppingCartByStatus();
    }, [page, limit, searchProductName, productid, cartItemCount]);


    const fetchShoppingCart = async () => {
        try {
            const token = localStorage.getItem('tokenuser');
            const parts = token.split('.');
            const payload = JSON.parse(atob(parts[1]));
            const userId = payload.sub;
            const response = await axios.get(`http://localhost:1412/shopping-cart/api/get-by-user-id/${userId}?page=${page}&limit=${limit}`);
            setShoppingCart(response.data.listResult);
            setTotalPages(response.data.totalPage);
            fetchProductNames(response.data.listResult);
            fetchProductImages(response.data.listResult);
            fetchProductPrice(response.data.listResult);
            setCartItemCount(response.data.listResult.length);
            setCount((prevCount) => prevCount + 1);
            // Gọi hàm để tính tổng tiền cho từng sản phẩm trong giỏ hàng
        } catch (error) {
            console.error('Error fetching shopping cart:', error);
        }
    };
    const fetchShoppingCartByStatus = async () => {
        try {
            const token = localStorage.getItem('tokenuser');
            const parts = token.split('.');
            const payload = JSON.parse(atob(parts[1]));
            const userId = payload.sub;
            const response = await axios.get(`http://localhost:1412/shopping-cart/api/get-by-user-id/${userId}?page=${page}&limit=${limit}`);
            setCountStatus(response.data.listResult.length);

            // Gọi hàm để tính tổng tiền cho từng sản phẩm trong giỏ hàng
        } catch (error) {
            console.error('Error fetching shopping cart:', error);
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

    const handleDelete = async (cartid) => {
        try {
            await axios.delete(`/shopping-cart/api/delete-shopping-cart/${cartid}`);
            setShoppingCart((prevProducts) => prevProducts.filter((cart) => cart.cartid !== cartid));
            
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    const updateQuantity = async (cartId, newQuantity, productId) => {
        const parsedNewQuantity = parseInt(newQuantity, 10);
        const token = localStorage.getItem('tokenuser');
        const parts = token.split('.');
        const payload = JSON.parse(atob(parts[1]));
        const userId = payload.sub;

        try {
            const updatedProduct = {
                ...selectedProduct,
                qty: parsedNewQuantity,
                userid: userId,
                productsid: productId,
            };

            await axios.put(`http://localhost:1412/shopping-cart/api/update-shopping-cart/${cartId}`, updatedProduct);
            fetchShoppingCart();
            setSelectedProduct(null);
            setQuantity('');
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

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
            setQuantity('');
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const increaseQuantity = (cartId, qty, productId) => {
        const newQuantity = qty + 1;
        setQuantity(newQuantity);
        setShoppingCartid(cartId);
        updateQuantity(cartId, newQuantity, productId);
    };

    const decreaseQuantity = (cartId, qty, productId) => {
        const newQuantity = Math.max(1, qty - 1);
        setQuantity(newQuantity);
        setShoppingCartid(cartId);
        updateQuantity(cartId, newQuantity, productId);
    };

    const handleCheckStausChange = (cartId) => { // Sửa đổi hàm xử lý sự kiện để chỉ lưu trữ trạng thái của checkbox được chọn
        setSelectedProducts(prevState => ({
            ...prevState,
            [cartId]: !prevState[cartId]
        }));
    };

    return (
        <div>
            <div className="header">
                <Header cartItemCount={cartItemCount} />
            </div>
            <div className="main-content ">
                <div className="all ">
                    
                        {cartItemCount == 0 ? <h2 style={{ padding: '40px', textAlign:'center' }}>Không có sản phẩm nào </h2>:
                        <div className="shopping-cart" style={{ padding: '40px' }}>
                         <table className="table-cart table" >
                         <thead>
                             <tr >
                                 <td scope="col" > </td>
                                 <td scope="col"><strong>Sản phẩm</strong></td>
                                 <td scope="col"> </td>
                                 <td scope="col"></td>
                                 <td scope="col"></td>
                                 <td scope="col"></td>
                                 <td scope="col"></td>
                                 <td scope="col"></td>
                                 <td scope="col"></td>
                             </tr>
                         </thead>
                         <tbody>
                             {shoppingCart.map((cart, index) => (
                                 <tr key={cart.cartid} style={{ textAlign: 'center' }}>
                                     <td>
                                         <input
                                             type="checkbox"
                                             name="status"
                                             checked={selectedProducts[cart.cartid] || false} // Sử dụng trạng thái từ selectedProducts thay vì checkStatus
                                             onChange={() => handleCheckStausChange(cart.cartid)} // Thay đổi trạng thái của checkbox khi được chọn
                                             onClick={() => updateStatus(cart.cartid, !selectedProducts[cart.cartid], cart.qty, cart.productsid)} // Gửi trạng thái mới khi checkbox được thay đổi
                                         />
                                     </td>
                                     <td >
                                         <img src={`/images/${productimages[cart.productsid]}`} style={{ width: '150px', height: '150px' }} alt="products" />
                                     </td>
                                     <td>
                                         <strong>  {productNames[cart.productsid]}</strong>
                                         <br />
                                        {productPrice[cart.productsid] ? productPrice[cart.productsid].toLocaleString() + ' VNĐ' : 'N/A'}


                                     </td>
                                     <td >
                                         <button className='viewqty-button-lert' onClick={() => decreaseQuantity(cart.cartid, cart.qty, cart.productsid)}>
                                             -
                                         </button>
                                         <input className='viewqty' style={{ width: '100px' }} type="number" value={cart.qty} readOnly />
                                         <button className='viewqty-button' onClick={() => increaseQuantity(cart.cartid, cart.qty, cart.productsid)}>
                                             +
                                         </button>
                                     </td>
                                     <td></td>
                                     <td></td>
                                     <td> {(productPrice[cart.productsid] * cart.qty).toLocaleString()} VNĐ </td>
                                     <td>
                                         <button className="btn btn-danger ms-2 xoa-cart" onClick={() => handleDelete(cart.cartid)}>
                                             <i class="fa-solid fa-trash-can"></i>
                                         </button>
                                     </td>

                                 </tr>

                             ))}
                         </tbody>
                     </table>
                                 
                                 <a href="checkout" className="btn btn-danger ms-2 muahang" >
                                 <i class="fa-solid fa-cart-shopping"></i> Mua hàng
                             </a>
                         </div>
                        }
              
                    <FooterUser />
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartlist;
