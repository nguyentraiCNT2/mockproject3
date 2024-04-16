// Import thêm useState và useEffect từ React
import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import Header from '../layout/header';
import FooterUser from '../layout/footer';
import '../../../css/contact.css';
const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [searchProductName, setSearchProductName] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategorys] = useState([]);
  const categoryid = localStorage.getItem('categoryids');

  useEffect(() => {
    fetchProducts();
    fetchCategory();
  }, [page, limit, searchProductName]);

  const fetchProducts = async () => {
    try {
      let response;
      const datasearch = localStorage.getItem('searchProducts');
      setSearchProductName(datasearch)

        response = await axios.get(`/admin/product/api/admin/product-by-name-list/${searchProductName}?page=${page}&limit=${limit}`);
 
      setProducts(response.data.listResult);
      setTotalPages(response.data.totalPage/2);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategory = async () => {
    try {
      let response;

      response = await axios.get(`/admin/category/api/admin/category-by-id/${categoryid}`);
      setCategoryName(response.data.categoryname);
      setCategorys(response.data.listResult);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddImage = (productId) => {
    // Add your logic for adding images here
    console.log(`Adding images for product with ID ${productId}`);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handleSearch = () => {
    setPage(1);
    fetchProducts();
  };

  const renderPagination = () => (
    <div style={{marginLeft:'632px'}}>
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
            <i class="fa-solid fa-chevron-left"></i>
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
          <li className={`paginate_button page-item next-listuser ${page === totalPages ? 'disabled' : ''}`}>
            <button
              onClick={() => setPage((prevPage) => (page < totalPages ? prevPage + 1 : page))}
              className="page-link"
              aria-controls="dataTable"
              data-dt-idx={totalPages + 1}
              tabIndex="0"
              disabled={page === totalPages}
            >
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
  const handleActions = (categotyid) => {
    localStorage.setItem('categoryids',categotyid);
    window.location.href='/product-by-category';
  };

    const handledetails = (productsid) => {
    localStorage.setItem('productdetails',productsid);
    window.location.href='/product-details';
  };
  return (
    <div>
        <div className="header" >
      <Header />
      </div>
      <div className="main-content all">
        <div className="row">
          <p>
            <a href="/index" className="pagedisplay">Trang chủ {' '}</a>
              /
               <a href="#" onClick={() => handleActions(1)} className="pagedisplay">{' '} {categoryName}{' '}</a> 
          </p>
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
               
                  <option value="4">4</option>
                  <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
                <option value="20">20</option>
              </select>
              <br />
            </div>
          </div>
        </div>
        <div className="product-item-all">
            <div className="row">
              {products.map((product) => (
                <div key={product.productsid} className={`col-sm-12 col-md-3 item-product-category`}>
                  <Link  onClick={() => handledetails(product.productsid)} className="product-details-item">
                    <div className="images">
                      <img className="d-block w-100" src={`/images/${product.imagesmain}`} alt={product.productname} />
                    </div>
                    <div className="product-item">
                      <p className="product-name">{product.productname.slice(0, 25)}</p>
                      <p className="product-price">{`${product.productprice.toLocaleString()} VNĐ`}</p>
                      <p className="product-description">{product.productsview}</p>
                    </div>
                  </Link>
                  <button onClick={() => handleAddImage(product.productsid)} className="add-Love-list">
                    <i className="fa-solid fa-heart"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        
        <div className="page-limit mx-auto" >{renderPagination()}</div>
      </div>
      <FooterUser />
    </div>
  );
};

export default SearchProduct;
