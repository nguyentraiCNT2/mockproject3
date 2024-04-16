import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import Header from '../layout/header';
import { format } from 'date-fns';
import FooterUser from '../layout/footer';
import MenuOrder from './menuOrder';
const OrderStatus3 = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [page, limit]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('tokenuser');
      const parts = token.split('.');
      const payload = JSON.parse(atob(parts[1]));
      const userId = payload.sub;
      const response = await axios.get(`/order/api/oder/userid/list/-status3/${userId}?page=${page}&limit=${limit}`);
      setOrders(response.data.listResult);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    }
  };

  const handleEdit = (order) => {
    localStorage.setItem('orderiduser',order.order.orderid)
    window.location.href = '/order-edit-user';
  };

  const handleCancelEdit = () => {
    setSelectedOrder(null);
  };
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1); // Đặt lại trang về 1 khi giới hạn thay đổi
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm:ss');
  };
  return (

    <div>
       <div className="header">
        <Header />
      </div>
      <div className="main-content">
        <div className="all">
    <div id="wrapper">
   
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content" className="d-flex">
          <div className="container d-flex flex-column">
            <div className="card shadow mb-4">
              <div className="card-body">
              <div className="row ">
                <MenuOrder/>
                  
                </div>
                  <br/>
                  <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Đã giao </h6>
              </div>
                  <br/>
                {!selectedOrder && (
                  <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                      <thead>
                        <tr>
                          <th>Mã đơn hàng</th>
                          <th>Ngày đặt hàng</th>
                          <th>Trạng thái đơn hàng</th>
                          <th>Trạng thái Thanh toán</th>
                          <th>Xác nhận đơn hàng</th>
                          <th>Xem </th>

                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.order.orderid}>
                            <td>{order.order.orderid}</td>
                            <td>{formatDate(order.order.orderdate)}</td>
                            <td>{order.order.orderstatus}</td>
                            <td>{order.order.orderpay}</td>
                            <td>{order.order.ordercancel}</td>
                            <td>
                              <button className="btn btn-warning" onClick={() => handleEdit(order)}>
                                Xem chi tiết đơn hàng
                              </button>
                              {/* Thêm các nút khác nếu cần */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {selectedOrder && (
                  <div>
                    <h3>Chỉnh sửa đơn hàng #{selectedOrder.orderId}</h3>
                  </div>
                )}

                {/* Hiển thị phân trang */}
                <div className="col-sm-12 col-md-7">
                  <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                    <ul className="pagination">
                      <li className={`paginate_button page-item previous ${page === 1 ? 'disabled' : ''}`}>
                        <button
                          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                          className="page-link"
                          aria-controls="dataTable"
                          data-dt-idx="0"
                          tabIndex="0"
                          disabled={page === 1}
                        >
                          Trước
                        </button>
                      </li>

                      {[...Array(totalPages).keys()].map((pageNumber) => (
                        <li key={pageNumber} className={`paginate_button page-item ${page === pageNumber + 1 ? 'active' : ''}`}>
                          <button
                            onClick={() => setPage(pageNumber + 1)}
                            className="page-link"
                            aria-controls="dataTable"
                            data-dt-idx={pageNumber + 1}
                            tabIndex="0"
                          >
                            {pageNumber + 1}
                          </button>
                        </li>
                      ))}

                      <li className={`paginate_button page-item next ${page === totalPages ? 'disabled' : ''}`}>
                        <button
                          onClick={() => setPage((prevPage) => (page < totalPages ? prevPage + 1 : page))}
                          className="page-link"
                          aria-controls="dataTable"
                          data-dt-idx={totalPages + 1}
                          tabIndex="0"
                          disabled={page === totalPages}
                        >
                          Sau
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Thông báo upload thành công hoặc lỗi
                {uploadSuccess && <div className="alert alert-success mt-3">{uploadSuccess}</div>}
                {uploadError && <div className="alert alert-danger mt-3">{uploadError}</div>} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
<FooterUser/>
    </div>
  );
};

export default OrderStatus3;

