import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import Menu from '../Layout/menu';
import Navbar from '../Layout/navbar';
import { format } from 'date-fns';
const OrderListByCancelok = () => {
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
      const response = await axios.get(`/order/api/oder/ordercancel/list/Xác nhận?page=${page}&limit=${limit}`);
      setOrders(response.data.listResult);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    }
  };


  const handleEdit = (order) => {
    localStorage.setItem('orderid',order.order.orderid)
    window.location.href = '/order-edit';
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
    <div id="wrapper">
      <Navbar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content" className="d-flex">
          <Menu />
          <div className="container d-flex flex-column">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Danh sách đơn hàng</h6>
              </div>
              <div className="card-body">
                <Link to="/tao-don-hang" className="btn btn-primary mt-3"> Tạo đơn hàng</Link>
                       {/* ... (Giữ nguyên phần còn lại) */}
                       <div className="mb-3">
                  {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <label htmlFor="searchOrderId" className="form-label">Tìm kiếm theo Mã đơn hàng</label>
                        <input
                          type="search"
                          className="form-control me-2"
                          id="searchOrderId"
                          placeholder="Tìm kiếm"
                          aria-label="Tìm kiếm"
                          value={searchOrderId}
                          onChange={(e) => setSearchOrderId(e.target.value)}
                        />
                        <button className="btn btn-outline-success" onClick={handleSearch}>Tìm kiếm</button>
                      </div>
                    </div>
                  </nav> */}
                </div>

                {/* Thêm dropdown cho việc chọn giới hạn */}
                <div className="row ">
                  <div className="col-sm-12 col-md-2">
                    <div className="dataTables_length" id="dataTable_length">
                      <label htmlFor="limitSelect" className="form-label">Số lượng hiển thị</label>
                      <select
                        id="limitSelect"
                        name="dataTable_length"
                        aria-controls="dataTable"
                        className="custom-select custom-select-sm form-control form-control-sm"
                        value={limit}
                        onChange={handleLimitChange}
                      >
                        <option value="1">1</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                      </select>
                    </div>
                  </div>
                </div>
                  <br/>
                  <br/>
                  
                {/* Hiển thị danh sách đơn hàng */}
                {!selectedOrder && (
                  <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                      <thead>
                        <tr>
                          <th>Mã đơn hàng</th>
                          <th>Ngày đặt hàng</th>
                          <th>Trạng thái</th>
                          <th>Thao tác</th>
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
                                Sửa
                              </button>
                              {/* Thêm các nút khác nếu cần */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Hiển thị form sửa nếu có đơn hàng được chọn */}
                {selectedOrder && (
                  <div>
                    <h3>Chỉnh sửa đơn hàng #{selectedOrder.orderId}</h3>
                    {/* <OrderForm order={selectedOrder} onCancel={handleCancelEdit} /> */}
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
  );
};

export default OrderListByCancelok;

