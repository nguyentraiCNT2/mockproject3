// Homeweb.js

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './layout/header';
import FooterUser from './layout/footer';
import Slider from './layout/Slider';
import '../../css/index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import OwlCarousel from 'react-owl-carousel';
import Contact from './layout/content';
const Homeweb = () => {
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [products3, setProducts3] = useState([]);

  // Create separate refs for each OwlCarousel instance
  const owlRef1 = useRef(null);
  const owlRef2 = useRef(null);
  const owlRef3 = useRef(null);

  useEffect(() => {
    fetchProducts();
    fetchProducts2();
    fetchProducts3();
  }, []);

  useEffect(() => {
    // Set intervals for each OwlCarousel instance
    const interval1 = setInterval(() => {
      owlRef1.current.next();
    }, 10000);

    const interval2 = setInterval(() => {
      owlRef2.current.next();
    }, 10000);

    const interval3 = setInterval(() => {
      owlRef3.current.next();
    }, 10000);

    // Clear intervals on component unmount
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);
  const handleActions = (categotyid) => {
    localStorage.setItem('categoryids', categotyid);
    window.location.href = '/product-by-category';
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:1412/admin/product/api/admin/product-by-categoryid-list/1?page=1&limit=10');
      setProducts(response.data.listResult);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProducts2 = async () => {
    try {
      const response = await axios.get('http://localhost:1412/admin/product/api/admin/product-by-categoryid-list/2?page=1&limit=10');
      setProducts2(response.data.listResult);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProducts3 = async () => {
    try {
      const response = await axios.get('http://localhost:1412/admin/product/api/admin/product-by-categoryid-list/3?page=1&limit=10');
      setProducts3(response.data.listResult);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePrevSlide = (ref) => {
    // Previous slide handler for each OwlCarousel instance
    ref.current.prev();
  };
  const handledetails = (productsid) => {
    localStorage.setItem('productdetails', productsid);
    window.location.href = '/product-details';
  };
  const handledetails2 = (productsid) => {
    localStorage.setItem('productdetails', productsid);
    window.location.href = '/product-details';
  };
  const handledetails3 = (productsid) => {
    localStorage.setItem('productdetails', productsid);
    window.location.href = '/product-details';
  };
  const handleNextSlide = (ref) => {
    // Next slide handler for each OwlCarousel instance
    ref.current.next();
  };
  return (
    <div>
      <div className="header" >
        <Header />

      </div>
      <div className="main-content ">
        <div >
          <Slider />
        </div>
        <div className="all ">
        <div className="acctions">
          <div className="mobile-acctions">
            <div className='button-shop'>
            <a href='#' className="shop-now-button"onClick={() => handleActions(1)} >Buy now</a>
            </div>
           
            </div>
          <div className="laptop-acctions">
            <div className='button-shop'>
            <a href='#' className="shop-now-button2"  onClick={() => handleActions(2)}>Buy now</a>
            </div>
          </div>
          <div className="Accessory-acctions">
            <div className='button-shop'>
            <a href='#' className="shop-now-button3"onClick={() => handleActions(3)} >Buy now</a>
            </div>
            </div>

      </div>

      
          <div className="product-item-all">
            <div className="show-product">
              <div>
                <p className="go-mobile"> Mobile phone</p>
                <a href='#' onClick={() => handleActions(1)} className="go-mobile-all" >xem tất cả</a>
              </div>
              <div className="product-topbar">

                <button onClick={() => handlePrevSlide(owlRef1)} className="owl-prev"><i className="fa-solid fa-arrow-left"></i></button>
                {/* Nút chuyển slide phải */}
                <button onClick={() => handleNextSlide(owlRef1)} className="owl-next"><i className="fa-solid fa-arrow-right"></i></button>

              </div>
              <div className="product-slider-container">
                <OwlCarousel
                  key={products.length}
                  className="owl-carousel"
                  items={4}
                  loop
                  dots
                  margin={10}
                  responsive={{
                    0: { items: 1 },
                    600: { items: 2 },
                    1000: { items: 3 },
                    1200: { items: 4 },
                  }}
                  ref={owlRef1}
                >
                  {products.map((product) => (
                    <div key={product.productsid} className="item">
                      <Link onClick={() => handledetails(product.productsid)} className="product-details-item">
                        <div className="images">
                          <img
                            className="d-block w-100"
                            src={`/images/${product.imagesmain}`}
                            alt={product.productname}
                          />
                        </div>
                        <div className="product-item">
                          <p className="product-name">{product.productname.slice(0, 25)}</p>
                          <p className="product-price">{` ${product.productprice.toLocaleString()} VNĐ`}</p>
                          <p className="product-description">{product.productsview}</p>
                        </div>
                      </Link>
                  
                    </div>
                  ))}
                </OwlCarousel>
              </div>

            </div>
            <div>
              <div className="show-product">
                <div className="product-topbar">
                  <div  >
                    <div>
                      <p className="go-mobile"> Lap Top</p>
                      <a href='#' onClick={() => handleActions(2)} className="go-mobile-all" >xem tất cả</a>
                    </div>
                    <button onClick={() => handlePrevSlide(owlRef2)} className="owl-prev"><i className="fa-solid fa-arrow-left"></i></button>
                    {/* Nút chuyển slide phải */}
                    <button onClick={() => handleNextSlide(owlRef2)} className="owl-next"><i className="fa-solid fa-arrow-right"></i></button>


                  </div>
                </div>
                <div className="product-slider-container">
                  <OwlCarousel
                    key={products2.length}
                    className="owl-carousel"
                    items={4}
                    loop
                    dots
                    margin={10}
                    responsive={{
                      0: { items: 1 },
                      600: { items: 2 },
                      1000: { items: 3 },
                      1200: { items: 4 },
                    }}
                    ref={owlRef2}
                  >
                    {products2.map((product) => (
                      <div key={product.productsid} className="item">
                        <Link to="/product-details" onClick={() => handledetails2(product.productsid)} className="product-details-item">
                          <div className="images">
                            <img
                              className="d-block w-100"
                              src={`/images/${product.imagesmain}`}
                              alt={product.productname}
                            />
                          </div>
                          <div className="product-item">
                            <p className="product-name">{product.productname.slice(0, 25)}</p>
                            <p className="product-price">{` ${product.productprice.toLocaleString()} VNĐ`}</p>
                            <p className="product-description">{product.productsview}</p>
                          </div>
                        </Link>
                        <a href="#" className="add-Love-list"><i className="fa-solid fa-heart"></i></a>
                      </div>
                    ))}
                  </OwlCarousel>
                </div>
              </div>
            </div>
            <div>
              <div className="show-product">
                <div className="product-topbar">
                  <div>
                    <div>
                      <p className="go-mobile"> Accessory</p>
                      <a href='#' onClick={() => handleActions(3)} className="go-mobile-all" >xem tất cả</a>
                    </div>

                    <button onClick={() => handlePrevSlide(owlRef3)} className="owl-prev"><i className="fa-solid fa-arrow-left"></i></button>
                    {/* Nút chuyển slide phải */}
                    <button onClick={() => handleNextSlide(owlRef3)} className="owl-next"><i className="fa-solid fa-arrow-right"></i></button>

                  </div>
                </div>
                <div className="product-slider-container">
                  <OwlCarousel
                    key={products3.length}
                    className="owl-carousel"
                    items={4}
                    loop
                    dots
                    margin={10}
                    responsive={{
                      0: { items: 1 },
                      600: { items: 2 },
                      1000: { items: 3 },
                      1200: { items: 4 },
                    }}
                    ref={owlRef3}
                  >
                    {products3.map((product) => (
                      <div key={product.productsid} className="item">
                        <Link to="/product-details" onClick={() => handledetails3(product.productsid)} className="product-details-item">
                          <div className="images">
                            <img
                              className="d-block w-100"
                              src={`/images/${product.imagesmain}`}
                              alt={product.productname}
                            />
                          </div>
                          <div className="product-item">
                            <p className="product-name">{product.productname.slice(0, 25)}</p>
                            <p className="product-price">{` ${product.productprice.toLocaleString()} VNĐ`}</p>
                            <p className="product-description">{product.productsview}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </OwlCarousel>
                </div>
                <a href='#' onClick={() => handleActions(3)} className="go-mobile-all">xem tất cả</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>

      </div>
      <FooterUser />
    </div>
  );
};

export default Homeweb;
