// ProductDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { GlassMagnifier } from 'react-image-magnifiers'; // Phần mới thêm vào
import Header from '../layout/header';
import FooterUser from '../layout/footer';
import Menu from '../../Admin/Layout/menu';
import '../../../css/productdetails.css';
const ProductDetail = ({ match }) => {
  const token = localStorage.getItem('tokenuser');
  const parts = token.split('.');
  const payload = JSON.parse(atob(parts[1]));
  const userId = payload.sub;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const productid = localStorage.getItem('productdetails');
  const [showAlert, setShowAlert] = useState(false);
  const [showAlerterror, setShowAlerterror] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [username, setusernames] = useState({});
  const [userImages, setuserImages] = useState({});
  const [reviewdata, setReviewdata] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    contents: '',
    evaluate: 1,
    status: true,
    productsid: productid,
    userid: userId
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleStarClick = (starValue) => {
    setFormData({
      ...formData,
      evaluate: starValue
    });
    console.log('Star value:', starValue);
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:1412/admin/product/api/admin/product-by-id/${productid}`);
        setProduct(response.data);
        // Chọn ảnh mặc định là ảnh chính
        setSelectedImage(response.data.imagesmain);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetail();
  }, []);
  const [userImagesAvarta, setUserImages] = useState('')
  const [usernameAvarta, setusernameAvarta] = useState('')
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:1412/security/profile/user/${userId}`);
        setUserImages(response.data.images);
        setusernameAvarta(response.data.username);

      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProductDetailreview = async () => {
      try {

        const response = await axios.get(`http://localhost:1412/review/api/admin/reviews-list-by-productsid/${productid}?page=${page}&limit=${limit}`);

          setReviewdata(response.data.listResult);
    
          setTotalPages(response.data.totalPage);
        
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetailreview();
  }, [reviewdata, page, limit]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responses = await Promise.all(reviewdata.map(review =>
          axios.get(`http://localhost:1412/security/profile/user/${review.userid}`)
        ));
        const userDataMap = responses.reduce((acc, response, index) => {
          const userId = reviewdata[index].userid;
          acc[userId] = response.data;
          return acc;
        }, {});
        setuserImages(userDataMap);
        setusernames(userDataMap);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (reviewdata.length > 0) {
      fetchUserData();
    }
  }, [reviewdata]);


  if (!product) {
    return <p>Loading...</p>;
  }


  const addToCart = () => {

    const cartItem = {
      productsid: product.productsid,
      userid: userId, // Hardcoded user ID, you may replace it with dynamic user ID
      qty: quantity,
    };

    axios.post('http://localhost:1412/shopping-cart/api/create-shopping-cart', cartItem)
      .then(response => {
        console.log('Product added to cart successfully');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          window.location.reload();
        }, 3000);


      })
      .catch(error => {
        setShowAlerterror(true);
        setTimeout(() => {
          setShowAlerterror(false);
          window.location.reload();
        }, 3000);
        console.error('Error adding product to cart:', error);
      });
  };

  const decreaseQuantity = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:1412/review/api/admin/create-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        formData.contents = '';
        // Handle success
        console.log('Review added successfully!');

      } else {
        // Handle error
        console.error('Failed to add review');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>

      {showAlert && (
        <div className="thongbao-fullscreen">
          <Alert variant="success" className="content-thongbao" onClose={() => setShowAlert(false)} >
            Sản phẩm đã được thêm vào giỏ hàng!
          </Alert>
        </div>
      )}
      <div className="header" >
        <Header />
      </div>

      <Container className="details-all main-content  ">
        <Row>
          <Col md={6} className="images-all">
            <Row className="mb-3 selectedImage">
              <GlassMagnifier
                imageSrc={`/images/${selectedImage}`}
                imageAlt={`Product`}
                className="img-fluid"
                allowOverflow={false}
                magnifierSize="50%"
                
              />
            </Row>
            <Row className="images-item-all">
              <Col className="mb-3 ">
                <img
                  src={`/images/${product.imagesmain}`}
                  alt={`Product`}
                  className="img-fluid images-item"
                  onMouseEnter={() => setSelectedImage(product.imagesmain)}
                />
              </Col>
              <Col className="mb-3 ">
                <img
                  src={`/images/${product.images2}`}
                  alt={`Product`}
                  className="img-fluid images-item"
                  onMouseEnter={() => setSelectedImage(product.images2)}
                />
              </Col>
              <Col className="mb-3 ">
                <img
                  src={`/images/${product.images3}`}
                  alt={`Product`}
                  className="img-fluid images-item"
                  onMouseEnter={() => setSelectedImage(product.images3)}
                />
              </Col>
              <Col className="mb-3 ">
                <img
                  src={`/images/${product.images4}`}
                  alt={`Product`}
                  className="img-fluid images-item"
                  onMouseEnter={() => setSelectedImage(product.images4)}
                />
              </Col>
              <Col className="mb-3">
                <img
                  src={`/images/${product.images5}`}
                  alt={`Product`}
                  className="img-fluid images-item"
                  onMouseEnter={() => setSelectedImage(product.images5)}
                />
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Card className="details">
              <Card.Body className="productname-all" >
                <Card.Title className="productname">{product.productname}</Card.Title>
              </Card.Body>
              <Card.Body >
                <hr />
                <Card.Text className="product-data productprice" >
                  <strong>Giá:</strong> {product.productprice.toLocaleString()} VNĐ
                </Card.Text>
                <Card.Text className="product-data">
                  <strong>số lượt xem:</strong> {product.productsview}
                </Card.Text>
                <Card.Text className="product-data">
                  <strong>Số lượng tồn :</strong> {product.productsqltk}
                </Card.Text>

                <Card.Text className="product-data">
                  <strong>Số lượng:</strong>
                  <button className="qty-button" onClick={decreaseQuantity}>-</button>
                  <input
                    className="qty mr-2 col-sm-12 col-md-2"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                    readOnly
                  />
                  <button className="qty-button" onClick={increaseQuantity}>+</button>
                </Card.Text>
                <hr />
                <Card.Text className="product-data">
                  <br />
                  <button className="add-to-cart" onClick={addToCart} >Thêm vào giỏ hàng</button>

                </Card.Text>

              </Card.Body>
            </Card>
          </Col>

        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text className="product-data">
                  <strong>Mô tả:</strong>
                </Card.Text>
                <hr />
                <Card.Text className="product-data">
                  {product.productsdescribe}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>

          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row >
          <Col>
            <Card>

              <div class="card-body">

                <div >
                  {reviewdata.map((review) => (
                    <div className="table-responsive " style={{ margin: '20px 20px ', boxShadow: '2px 2px 4px 5px rgba(0, 0, 0, 0.3)', padding: '10px 10px ', borderRadius: '20px' }}>
                      <div >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img src={`/images/${userImages[review.userid]?.images}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="products" />
                          <p style={{ textAlign: 'center', fontSize: '16px', marginLeft: '20px' }}>{username[review.userid]?.username}</p>
                        </div>
                      </div>
                      <div>
                        {[...Array(review.evaluate)].map((_, index) => (
                          <span
                            key={index}
                            style={{ cursor: 'pointer', color: index < formData.evaluate ? 'gold' : 'gray' }}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <div>
                        {review.contents}
                      </div>
                    </div>

                  ))}
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

                        <li className={`paginate_button page-item next ${page === totalPages ? 'disabled' : ''}`}>
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
              </div>
            </Card>
          </Col>
          <Col>
            <Card style={{ padding: '20px 20px ' }}>
              <form onSubmit={handleSubmit} >


                <div style={{ display: 'flex' }}>
                  <img src={`/images/${userImagesAvarta}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="products" />
                  <p style={{ textAlign: 'center', fontSize: '16px', marginLeft: '20px' }}>{usernameAvarta}</p>
                </div>
                <br />
                <div style={{ display: 'flex' }}>


                  <div >
                    <div>
                      <div class="mb-3">

                        <input class="form-control" id="formFileMultiple"
                          type="text"
                          name="contents"
                          value={formData.contents}
                          placeholder="Nhập Bình luận"
                          onChange={handleInputChange} multiple
                          style={{ border: '2px solid #000' }} />
                      </div>

                    </div>
                    <div style={{ display: 'flex' }}>

                      <label>Đánh giá :</label>
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          onClick={() => handleStarClick(index + 1)}
                          style={{ cursor: 'pointer', color: index < formData.evaluate ? 'gold' : 'gray' }}
                        >
                          ⭐
                        </span>
                      ))}
                      <p style={{ fontSize: '18px', marginLeft: '20px' }}>{formData.evaluate} Sao</p>

                    </div>
                  </div>
                  <div >
                    <button type="submit" class="btn btn-primary ml-3" >Gửi</button>
                  </div>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>


      <FooterUser />



    </div>
  );
};

export default ProductDetail;
