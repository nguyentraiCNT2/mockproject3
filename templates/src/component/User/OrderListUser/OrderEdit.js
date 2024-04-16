// Import các thư viện cần thiết
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditOrderFormUser from './EditOrderForm'; // Đổi tên thành EditOrderForm để phản ánh chính xác
import { Link } from 'react-router-dom';
import Header from '../layout/header';
import FooterUser from '../layout/footer';
const OrderEditUser = ({ match, history }) => {
  const [order, setOrder] = useState(null);
  const [User, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const orderId = localStorage.getItem('orderiduser');
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
      window.location.href = '/order-list-user';
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = () => {
    history.push('/order-list-user');
  };

  return (
    <div>
       <div className="header">
        <Header />
      </div>
      <div className="main-content">
        <div className="all">
    
                <div className="container mt-5">
                  {loading && <p>Loading...</p>}
                  {error && <p>{error}</p>}


                  {order && (
                    <EditOrderFormUser onSubmit={handleFormSubmit} onCancel={() => handleCancel()} order={order} User={User} />
                  )}
                </div>
                </div>
    </div>
<FooterUser />
    </div>
  );
};

export default OrderEditUser;
