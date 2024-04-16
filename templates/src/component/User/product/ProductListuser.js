import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import Header from '../layout/header';
import FooterUser from '../layout/footer';
import Slider from '@mui/material/Slider';
import '../../../css/contact.css';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';

const ProductListUser = () => {
  const [showAlerterror, setShowAlerterror] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsloc, setProductsloc] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [searchProductName, setSearchProductName] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategorys] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Mặc định sắp xếp tăng dần
  const [sortBy, setSortBy] = useState('productprice'); // Thuộc tính để sắp xếp, mặc định là giá sản phẩm
  const categoryid = localStorage.getItem('categoryids');
  const [AscOrDesc, setAscOrDesc] = useState('');
  const [Desccheck, setDesccheck] = useState(false);
  const [loc, setLoc] = useState(false);
  const [Asccheck, setAsccheck] = useState(false);
  const [productSelect, setProductSelect] = useState(true);
  const [productAsc, setProductAsc] = useState([]);
  const [productDesc, setProductDesc] = useState([]);
  const [colorselect, setColor] = useState(0);
  const [price, setPrice] = useState(0);
  const [colorList, setcolorList] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [sortButtonText, setSortButtonText] = useState('Giá từ thấp đến cao');

  useEffect(() => {
    fetchProducts();
    fetchCategory();
    fetchProductAsc();
    fetchProductDesc();
    fetchProductLoc();
    fetchColorList();
  }, [page, limit, searchProductName, sortOrder, sortBy]);

  const fetchProducts = async () => {
    try {
      let response;
      const startIndex = (page - 1) * limit;

      response = await axios.get(`http://localhost:1412/admin/product/api/admin/product-by-categoryid-list-${sortOrder}/${categoryid}?page=${page}&limit=${limit}`);

      setProducts(response.data.listResult);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProductDesc = async () => {
    try {
      let response;
      response = await axios.get(`http://localhost:1412/admin/product/api/admin/product-by-categoryid-list-desc/${categoryid}?page=${page}&limit=${limit}`);

      setProductDesc(response.data.listResult);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProductAsc = async () => {
    try {
      let response;

      response = await axios.get(`http://localhost:1412/admin/product/api/admin/product-by-categoryid-list-asc/${categoryid}?page=${page}&limit=${limit}`);

      setProductAsc(response.data.listResult);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProductLoc = async () => {
    try {
      let response;

      response = await axios.get(`http://localhost:1412/admin/product/api/filter/${categoryid}?color=${colorselect}&page=${page}&limit=${limit}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`);

      setProductsloc(response.data.listResult);
      setTotalPages(response.data.totalPage);
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
    console.log(`Adding images for product with ID ${productId}`);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1);
  };
  const fetchColorList = async () => {
    try {
      let response;
      response = await axios.get(`http://localhost:1412/admin/color/api/admin/color-list?page=1&limit=100`);

      setcolorList(response.data.listResult);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setAsccheck(sortOrder === 'asc' ? true : false);
    setDesccheck(sortOrder === 'desc' ? true : false);
    setSortButtonText(sortOrder === 'asc' ? 'Giá từ cao đến thấp' : 'Giá từ thấp đến cao');
    setProductSelect(false);
  };

  const handledetails = (productsid) => {
    localStorage.setItem('productdetails', productsid);
    window.location.href = '/product-details';
  };

  const handleActions = (categoryId) => {
    localStorage.setItem('categoryids', categoryId);
    window.location.href = '/product-by-category';
  };

  const handleColorClick = (color) => {
    setColor(color);
  };

  const handlePriceChange = (event, newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const handleLoc = (color, minPrice, maxPrice) => {
    setLoc(true);
    fetchProductLoc();
    setShowAlerterror(!showAlerterror);
  };

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="main-content all">
        <div className="row">
          {showAlerterror && (
            <div className="thongbao-fullscreen">
              <Alert variant="success loc-form" className="content-thongbao" onClose={() => setShowAlerterror(false)}>
              <h2>Lọc sản phẩm </h2>
              <hr style={{height: ' 3px'}}/>
                <div>
                <h3>Chọn màu</h3>
                  <div>
                    {colorList.map(color => (
                      <button
                        className="color-set"
                        key={color.colorid}
                        onClick={() => handleColorClick(color.colorid)}
                        style={{
                          backgroundColor: color.colorCore,
                          boxShadow: colorselect === color.colorid ? '0 0 0 2px white, 0 0 0 4px green' : 'none'
                        }}
                      >
                      </button>
                    ))}
                   
                  </div>
                </div>
                <hr style={{height: ' 3px'}}/>
                <br/>
                <div>
                  <h3>Chọn giá</h3>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100000000}
                    className="price-loc"
                    style={{ color: '#000', width:'300px' }}
                  />
                  <p>Giá từ: {priceRange[0].toLocaleString()} đến {priceRange[1].toLocaleString()}</p>
                </div>
                <br/>
                <button className="close-loc button-loc" onClick={() => setShowAlerterror(false)}>Hủy Hiển thị bộ lọc</button>
                <button className="submit-loc button-loc" onClick={() => handleLoc(colorselect, priceRange[0], priceRange[1])}>Lọc</button>
              </Alert>
            </div>
          )}
          <p>
            <a href="/index" className="pagedisplay">Trang chủ {' '}</a>
            /
            <a href="#" onClick={() => handleActions(1)} className="pagedisplay">{' '} {categoryName}{' '}</a>
          </p>
          <div style={{ display: 'flex' }}>
            <div className="col-sm-12 col-md-1" >
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
            <div className="sort-buttons">
              <button onClick={toggleSortOrder} className="sort-button">
                {sortButtonText}
              </button>
              <button className="sort-button" onClick={() => setShowAlerterror(true)}>Hiển thị bộ lọc</button>
            </div>
          </div>
        </div>
        <div className="product-item-all">
          {loc && (
            <div className="row">
              {productsloc.map((product) => (
                <div key={product.productsid} className={`col-sm-12 col-md-3 item-product-category`}>
                  <Link onClick={() => handledetails(product.productsid)} className="product-details-item">
                    <div className="images">
                      <img className="d-block w-100" src={`/images/${product.imagesmain}`} alt={product.productname} />
                    </div>
                    <div className="product-item">
                      <p className="product-name">{product.productname.slice(0, 25)}</p>
                      <p className="product-price">{`${product.productprice.toLocaleString()} VNĐ`}</p>
                      <p className="product-description">{product.productsview}</p>
                    </div>
                  </Link>
                  <button onClick={() => handleAddImage(product.productsid)} className="add-Love-list"></button>
                </div>
              ))}
            </div>
          )}
          {(Asccheck || Desccheck) && (
            <div className="row">
              {products.map((product) => (
                <div key={product.productsid} className={`col-sm-12 col-md-3 item-product-category`}>
                  <Link onClick={() => handledetails(product.productsid)} className="product-details-item">
                    <div className="images">
                      <img className="d-block w-100" src={`/images/${product.imagesmain}`} alt={product.productname} />
                    </div>
                    <div className="product-item">
                      <p className="product-name">{product.productname.slice(0, 25)}</p>
                      <p className="product-price">{`${product.productprice.toLocaleString()} VNĐ`}</p>
                      <p className="product-description">{product.productsview}</p>
                    </div>
                  </Link>
                  <button onClick={() => handleAddImage(product.productsid)} className="add-Love-list"></button>
                </div>
              ))}
            </div>
          )}
          {productSelect && !Asccheck && !Desccheck && !loc && (
            <div className="row">
              {products.map((product) => (
                <div key={product.productsid} className={`col-sm-12 col-md-3 item-product-category`}>
                  <Link onClick={() => handledetails(product.productsid)} className="product-details-item">
                    <div className="images">
                      <img className="d-block w-100" src={`/images/${product.imagesmain}`} alt={product.productname} />
                    </div>
                    <div className="product-item">
                      <p className="product-name">{product.productname.slice(0, 25)}</p>
                      <p className="product-price">{`${product.productprice.toLocaleString()} VNĐ`}</p>
                      <p className="product-description">{product.productsview}</p>
                    </div>
                  </Link>
                  <button onClick={() => handleAddImage(product.productsid)} className="add-Love-list"></button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ marginLeft: '632px' }}>
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
                  <i className="fa-solid fa-chevron-left"></i>
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
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <FooterUser />
    </div>
  );
};

export default ProductListUser;

