import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { format } from 'date-fns';
import Header from '../layout/header';
import FooterUser from '../layout/footer';
const EditOrderFormUser = ({ onSubmit, onCancel, order }) => {
  const [user, setUser] = useState(null);
  const [ship, setShip] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    orderid: '',
    userid: '',
    orderqty: '',
    deliverydate: '',
    orderstatus: '',
    orderpay: '',
    ordercancel: 'Đã hủy',
    orderdate: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:1412/user/api/admin/user-by-id/${order.order.userid}`);
        setUser(userResponse.data);

        const shipResponse = await axios.get(`http://localhost:1412/admin/ship/api/admin/ship-by-id/${order.orderDetailsList[0].shipid}`);
        setShip(shipResponse.data);

        const productDetailsPromises = order.orderDetailsList.map(async (detail) => {
          const productResponse = await axios.get(`http://localhost:1412/admin/product/api/admin/product-by-id/${detail.productsid}`);
          return productResponse.data;
        });

        const resolvedProductDetails = await Promise.all(productDetailsPromises);
        setProductDetails(resolvedProductDetails);
      } catch (error) {
        setError('Lỗi khi tải thông tin');
      }
    };

    fetchData();
  }, [order]);

  useEffect(() => {
    if (order) {
      setFormData({
        orderid: order.order.orderid || '',
        userid: order.order.userid || '',
        deliverydate: format(new Date(order.order.deliverydate), 'yyyy-MM-dd'),
        orderdate: format(new Date(order.order.orderdate), 'yyyy-MM-dd'),
        orderqty: order.order.orderqty || '',
        orderstatus: order.order.orderstatus || '',
        orderpay: order.order.orderpay || '',
        ordercancel: order.order.ordercancel || '',
      });
    }
  }, [order]);
  const handlePrint = () => {
    window.print();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const calculateTotalAmount = () => {
    return order.orderDetailsList.reduce((total, detail) => total + detail.totalamount, 0);
  };
  const handleCancelOrder = () => {
    setFormData({
      ...formData,
      ordercancel: 'Đã hủy',
    });
    onSubmit(formData);
  };
  return (
      <div>

            <form  onSubmit={handleSubmit} style={{ marginBottom: '50px' }}>

              <div className="input-group">
                <div class="input-group mb-3 col-sm-12 col-md-3 ">
                  <span class="input-group-text" id="basic-addon1"> Ngày giao</span>
                  <input
                    type="date"
                    class="form-control"
                    id="deliverydate"
                    name="deliverydate"
                    placeholder="deliverydate"
                    aria-label="deliverydate"
                    aria-describedby="basic-addon1"
                    value={formData.deliverydate}
                    readOnly
                    onChange={handleChange} />

                </div>

                <div class="input-group mb-3 col-sm-12 col-md-3 ">
                  <span class="input-group-text" id="basic-addon1">Ngày đặt</span>
                  <input
                    type="date"
                    class="form-control"
                    id="orderdate"
                    name="orderdate"
                    value={formData.orderdate}
                    onChange={handleChange}
                    readOnly
                    placeholder="orderdate"
                    aria-label="orderdate"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div class="input-group mb-3 col-sm-12 col-md-3">
                  <span class="input-group-text" id="basic-addon1">Mã người dùng</span>
                  <input
                    type="text"
                    class="form-control"
                    id="userid"
                    name="userid"
                    value={formData.userid}
                    onChange={handleChange}
                    readOnly
                    placeholder="userid"
                    aria-label="userid"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div class="input-group mb-3 col-sm-12 col-md-3 ">
                  <span class="input-group-text" id="basic-addon1">Mã đơn hàng</span>
                  <input
                    type="text"
                    class="form-control"
                    id="orderid"
                    name="orderid"
                    value={formData.orderid}
                    onChange={handleChange}
                    readOnly
                    placeholder="orderid"
                    aria-label="orderid"
                    aria-describedby="basic-addon1"

                  />
                </div>
              </div>
              <div className="user-details d-flex">
                <div class="input-group mb-3 ">
                  <span class="input-group-text" id="basic-addon1">Tên khách hàng: {user?.firtname} {user?.lastname}</span>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Số điện thoại: {user?.phone}</span>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Email: {user?.email}</span>
                </div>
              </div>

              <div className="order-details-table">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Product Image</th>
                      <th>Total Amount</th>
                      <th>Unit Price</th>
                      <th>Ship ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderDetailsList.map((detail, index) => (
                      <tr key={detail.orderdetailid}>
                        <td>{detail.productsid}</td>
                        <td>{productDetails[index]?.productname}</td>
                        <td >
                          <img
                            src={`/images/${productDetails[index]?.imagesmain}`}
                            style={{ width: '100px', height: '100px' }}
                            alt="product"
                          />
                        </td>
                        <td>{detail.totalamount}</td>
                        <td>{detail.unitprice}</td>
                        <td>{ship?.shipname}</td>
                      </tr>
                    ))}
                  </tbody>

                  <tr>
                    <th colSpan="2">Tổng tiền:</th>
                    <th>{calculateTotalAmount()}</th>
                  </tr>
                </table>
              </div>

              <div className="order-status-selects d-flex">

                <div className="col-sm-12 col-md-3">
                  <label htmlFor="orderstatus" className="form-label">
                    Trạng thái giao hàng
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="orderstatus"
                    name="orderstatus"
                    value={formData.orderstatus}
                    onChange={handleChange}
                    readOnly
                  >
                    
                  </input>
                </div>

                <div className="col-sm-12 col-md-3">
                  <label htmlFor="orderpay" className="form-label">
                    Thanh toán
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="orderpay"
                    name="orderpay"
                    value={formData.orderpay}
                    readOnly
                    onChange={handleChange}
                  >
                   
                  </input>
                </div>

               <div className="col-sm-12 col-md-3">
                  <label htmlFor="ordercancel" className="form-label">
                    Trạng thái đơn hàng
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ordercancel"
                    name="ordercancel"
                    value={formData.ordercancel}
                    onChange={handleChange}
                readOnly
                  >
                    
                  </input>
                </div>
              </div>

              <br />
              <a href="/order-list-user" className="btn btn-danger ms-2">  Hủy</a>
              {formData.ordercancel === 'Đã hủy'? "" :
              <button type="submit" className="btn btn-primary" onClick={handleCancelOrder}>
              Xác nhận hủy đơn hàng 
            </button>
              }
              
            </form>
          </div>
    
  );
};

export default EditOrderFormUser;
