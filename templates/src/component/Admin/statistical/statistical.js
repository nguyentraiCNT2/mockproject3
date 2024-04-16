import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import '../../../css/thongke.css';
import { Link } from 'react-router-dom';
import Menu from '../Layout/menu';
import Navbar from '../Layout/navbar';


const Statistical = () => {
  const [productcount, setProductCount] = useState('')
  const [usercount, setUserCount] = useState('')
  const [ordercount, setOrderCount] = useState('')
  const [orderdetaillist, setorderdetaillist] = useState([])
  const [shiporder, setshipordert] = useState([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [totalamount, settotalamount] = useState(0);
  const [useronlinecount, setuseronlinecount] = useState('')
  const [categorycount, setcategorycount] = useState('')
  const[donvi, setdonvi] = useState('')
  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
    fetchUsersOnline();
    fetchcategrory();
  }, [page, limit]);

  const fetchProducts = async () => {
    try {
      let response;

        response = await axios.get(`/admin/product/api/admin/product-list?page=${page}&limit=${limit}`);
     
        setProductCount(response.data.listResult.length);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const fetchUsers = async () => {
    try {
      let response;

        response = await axios.get(`/user/api/admin/user-list?page=${page}&limit=${limit}`);

        setUserCount(response.data.listResult.length);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const fetchOrders = async () => {
    try {
      let response;

        response = await axios.get(`http://localhost:1412/order/api/admin/order/list?page=${page}&limit=${limit}`);
        const list = response.data.listResult.orderDetailsList;
  
        setorderdetaillist(list);
        setOrderCount(response.data.listResult.length);
        calculateTotalAmount(response.data.listResult);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchUsersOnline = async () => {
    try {
      let response;

        response = await axios.get(`/security/admin/user-by-status/true`);

        setuseronlinecount(response.data.length);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const fetchcategrory = async () => {
    try {
      let response;

        response = await axios.get(`/admin/category-level-2/api/admin/category-list?page=${page}&limit=${limit}`);

        setcategorycount(response.data.listResult.length);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const calculateTotalAmount = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      order.orderDetailsList.forEach((detail) => {
        total += detail.totalamount;
      });
    });
    if(total >= 1000 && total < 1000000){
      setdonvi('Nghìn');
      settotalamount(total/1000);
    }
    else if(total >= 1000000 && total < 1000000000){
      setdonvi('Triệu');
      settotalamount(total/1000000);
    }
    else if(total >= 1000000000){
      setdonvi('Tỷ');
      settotalamount(total/1000000000);
    }else{
      setdonvi('');
      settotalamount(total);
    }
  };


  return (
    <div id="wrapper">
      <Navbar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content" className="d-flex">
          <div class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Menu />
          </div>
          <div className="container d-flex flex-column">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Thống kê </h6>
              </div>
              <div class="card-body">
                <br />
                <br />
                <>
                  <div className="statistial">
                    <div className="firt-statistial">
                      <div className="product-cuont statistial-item"> <i class="fa-solid fa-mobile-screen-button"></i><br/> sản phẩm  <br/> <br/> <strong>{productcount} sản phẩm</strong> </div>
                      <div className="order-cuont statistial-item"> <i class="fa-solid fa-cart-arrow-down"></i><br/> đơn hàng   <br/> <br/> <strong>{ordercount} đơn đặt hàng</strong> </div>
                      <div className="user-cuont statistial-item"> <i class="fa-solid fa-circle-user"></i><br/> tài khoản  <br/>  <br/> <strong>{usercount} tài khoản</strong> </div>
                      <div  className="user-online   statistial-item"> <i class="fa-solid fa-earth-asia"></i><br/> tài khoản online <br/> <br/><strong> {useronlinecount} tài khoản</strong> </div>
                    
                    </div>
                    <div className="seccond-statistial">
                      <div  className="tong-tien  statistial-item"><i class="fa-solid fa-sack-dollar"></i><br/>
                     Doanh thu
                       <br/>
                       <br/>
                       <strong> {totalamount  } {donvi} VND</strong>
                
                       </div>
                       <div  className="category-count  statistial-item"><i class="fa-solid fa-layer-group"></i><br/>loại sản phẩm <br/> <br/><strong> {categorycount} loại sản phẩm</strong>  </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistical;
