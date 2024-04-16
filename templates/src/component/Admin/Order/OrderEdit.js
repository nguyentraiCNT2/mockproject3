// Import các thư viện cần thiết
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditOrderForm from './EditOrderForm'; // Đổi tên thành EditOrderForm để phản ánh chính xác
import { Link } from 'react-router-dom';
import Navbar from '../Layout/navbar';
import Menu from '../Layout/menu';
const OrderEdit = ({ match, history }) => {
  const [order, setOrder] = useState(null);
  const [User, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const orderId = localStorage.getItem('orderid');
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:1412/order/api/admin/order-by-id/${orderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching order details');
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      await axios.put(`http://localhost:1412/order/api/oder/update-order-by-id/${order.order.orderid}`, formData);
      window.location.href = '/order-list';
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = () => {
    window.location.href = '/order-list';
  };

  return (
    <div id="wrapper">
    <Navbar />

<div id="content-wrapper" className=" ">
<div id="content" className="d-flex" >

<div  class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"  id="accordionSidebar">
  <Menu />
  </div>
<div className="container d-flex flex-column">
<div class="card shadow mb-4">
  <div class="card-header py-3">
    <h6 class="m-0 font-weight-bold text-primary"> Edit Order</h6>
  </div>
  <div class="card-body">
    <div className="container mt-5">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}


      {order && (
        <EditOrderForm onSubmit={handleFormSubmit} onCancel={handleCancel} order={order} User={User} />
      )}
    </div>
    </div>
      </div>
    </div>
    </div>
    </div>
     </div>
  );
};

export default OrderEdit;
