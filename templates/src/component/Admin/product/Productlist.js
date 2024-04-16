// Import thêm useState và useEffect từ React
import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import ProductForm from './ProductForm';
import { Link } from 'react-router-dom';
import Menu from '../Layout/menu';
import Navbar from '../Layout/navbar';
import ImportProduct from './import';
const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isInport, setIsInport] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchProductName, setSearchProductName] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    fetchProducts();

  }, [page, limit, searchProductName]);

  const fetchProducts = async () => {
    try {
      let response;

      if (searchProductName.trim() === '') {
        response = await axios.get(`/admin/product/api/admin/product-list?page=${page}&limit=${limit}`);
      } else {
        response = await axios.get(`/admin/product/api/admin/product-by-name-list/${searchProductName}?page=${page}&limit=${limit}`);
      }

      setProducts(response.data.listResult);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  const handleView = (product) => {
    setSelectedProduct(product);
    setIsViewing(true);
    setIsEditing(false);
    setIsAddingImage(false);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/admin/product/api/admin/delete-product/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.productsid !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing) {
        await axios.put(`/admin/product/api/admin/update-product/${selectedProduct.productsid}`, formData);
      } else {
        await axios.post('/admin/product/api/admin/create-product', formData);
      }
      localStorage.setItem('productname', formData.productname);
      window.location.href = '/add-product-images';
      fetchProducts();
      setIsEditing(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const handleCancelEdit = () => {
   
    setIsEditing(false);
    setSelectedProduct(null);
    setIsAddingImage(false);
  };
  const handleCancelInport = () => {
    setIsInport(false)
    setIsEditing(false);
    setSelectedProduct(null);
    setIsAddingImage(false);
  };
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsViewing(false);
    setIsEditing(true);
    setIsAddingImage(false);
  };
  const handleInport = (product) => {
    localStorage.setItem('productsid',product.productsid);
    setSelectedProduct(product);
    setIsInport(true)
    setIsViewing(false);
    setIsEditing(false);
    setIsAddingImage(false);
  };

  const handleCancelView = () => {
    setIsViewing(false);
    setSelectedProduct(null);
    setIsAddingImage(false);
  };

  const handleAddImage = (productId) => {
    setIsAddingImage(true);
    setSelectedProduct(products.find((product) => product.productsid === productId));
    setIsViewing(false);
    setIsEditing(false);
  }; 
  
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handleSearch = () => {
    setPage(1);
    fetchProducts();
  };

  return (
    <div id="wrapper">
      <Navbar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content" className="d-flex">
          <div className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Menu />
          </div>
          <div className="container d-flex flex-column">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Product List</h6>
              </div>
              <div className="card-body">
                <Link to="/add-product" className="btn btn-primary mt-3">
                  Add new Product
                </Link>
                <br />
                <br />
                <div className="mb-3">
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <label htmlFor="searchProductName" className="form-label">
                          Search by Product Name
                        </label>
                        <input
                          type="search"
                          className="form-control me-2"
                          id="searchProductName"
                          placeholder="Search"
                          aria-label="Search"
                          value={searchProductName}
                          onChange={(e) => setSearchProductName(e.target.value)}
                        />
                        <button className="btn btn-outline-success" onClick={handleSearch}>
                          Search
                        </button>
                      </div>
                    </div>
                  </nav>
                </div>
                <div className="row ">
                  <div className="col-sm-12 col-md-1">
                    <div className="dataTables_length" id="dataTable_length">
                      <select
                        id="limitSelect"
                        name="dataTable_length"
                        aria-controls="dataTable"
                        className="custom-select custom-select-sm form-control form-control-sm"
                        value={limit}
                        onChange={handleLimitChange}
                      >
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                      </select>
                      <br />
                    </div>
                  </div>
                </div>
                {isEditing ? (
                  <ProductForm onSubmit={handleFormSubmit} onCancel={handleCancelEdit} user={selectedProduct} />
                ) : (
                
                  <>
                    {isInport && (
                    <ImportProduct onCancel={handleCancelInport} user={selectedProduct} />
                  )}
                    {isViewing && (
                      <div>
                        <h3>View Product</h3>
                        <p>Product ID: {selectedProduct.productsid}</p>
                        <p>Product Name: {selectedProduct.productname}</p>
                        <p>imagesmain: {selectedProduct.imagesmain}</p>
                        <p>productprice: {selectedProduct.productprice}</p>
                        <p>CORE: {selectedProduct.productcore}</p>
                        <button className="btn btn-primary" onClick={handleCancelView}>
                          Back
                        </button>
                        <br />
                        <br />
                      </div>
                    )}
                    {!isViewing && !isInport &&(
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.productsid}>
                              <td>{product.productsid}</td>
                              <td>{product.productname}</td>
                              <td>{product.productsqltk === 0 ? 'Hết hàng': product.productsqltk}</td>
                              <td>
                                <img src={`/images/${product.imagesmain}`} style={{ width: '50px', height: '50px' }} alt="products" />
                              </td>
                              <td>
                                <button className="btn btn-info" onClick={() => handleView(product)}>
                                  View
                                </button>
                                <button className="btn btn-warning ms-2" onClick={() => handleEdit(product)}>
                                  Edit
                                </button>
                                <button className="btn btn-danger ms-2" onClick={() => handleDelete(product.productsid)}>
                                  Delete
                                </button>
                                <button className="btn btn-outline-success ms-2" onClick={() => handleInport(product)}>
                                 Import
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
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
                              Previous
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
                              Next
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
               
                )}

                {uploadSuccess && <div className="alert alert-success mt-3">{uploadSuccess}</div>}
                {uploadError && <div className="alert alert-danger mt-3">{uploadError}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
