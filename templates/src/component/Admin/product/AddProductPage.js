import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../Layout/menu';
import Navbar from '../Layout/navbar';

const AddProductPage = ({ history }) => {
  const [formData, setFormData] = useState({
    productname: '',
    productcore: '',
    productprice: '',
    productsdescribe: '',
    productsview: '',
    productsstatus: '',
    productsqltk: '',
    categoryLV2id: '',
    categoryid: '',
    colorid: '',
  });

  const [categorys, setCategory] = useState([]);
  const [lovelist, setLovelists] = useState([]);
  const [categorylv2s, setCategorylv2] = useState([]);
  const [colors, setColors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [productid, setproductid] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const colorResponse = await axios.get('/admin/color/api/admin/color-list?page=1&limit=100');
        setColors(colorResponse.data.listResult);


        const categoryResponse = await axios.get('/admin/category/api/admin/category-list?page=1&limit=100');
        setCategory(categoryResponse.data.listResult);

        const categorylv2Response = await axios.get('/admin/category-level-2/api/admin/category-list?page=1&limit=100');
        setCategorylv2(categorylv2Response.data.listResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/admin/product/api/admin/create-product', formData);
      localStorage.setItem('productname', formData.productname);
      setproductid(formData.productname);
      setSuccessMessage('Product added successfully');
      setErrorMessage('');
      window.location.href = '/add-product-images';
      setFormData({
        productname: '',
        productcore: '',
        productprice: '',
        productsdescribe: '',
        productsview: '',
        productsstatus: '',
        productsqltk: '',
        categoryLV2id: '',
        categoryid: '',
        colorid: '',
     
      });
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error adding product');
    }
  };

  return (
    <div id="wrapper">
      <Navbar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content" className="d-flex">
          <div class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Menu />
          </div>
          <div className="container col-sm-12 col-md-6">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Add Product</h6>
              </div>
              <div class="card-body">
                <Link to="/product-list" className="btn btn-primary">
                  Back to list
                </Link>
                <br />
                <br />
                {successMessage && <div className="alert alert-success">{successMessage} {productid && <div>{productid}</div>} </div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <Form className="col-sm-12 col-md-9" onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3" controlId="productname">
                    <InputGroup>
                      <InputGroup.Text>Product Name</InputGroup.Text>
                      <FormControl
                        type="text"
                        name="productname"
                        value={formData.productname}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="productcore">
                    <InputGroup>
                      <InputGroup.Text>Product Core</InputGroup.Text>
                      <FormControl
                        type="text"
                        name="productcore"
                        value={formData.productcore}
                        onChange={handleInputChange}
                        placeholder="Enter product core"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="productprice">
                    <InputGroup>
                      <InputGroup.Text>Product Price</InputGroup.Text>
                      <FormControl
                        type="text"
                        name="productprice"
                        value={formData.productprice}
                        onChange={handleInputChange}
                        placeholder="Enter product price"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="productsqltk">
                    <InputGroup>
                      <InputGroup.Text>Product QTY</InputGroup.Text>
                      <FormControl
                        type="text"
                        name="productsqltk"
                        value={formData.productsqltk}
                        onChange={handleInputChange}
                        placeholder="Enter product quantity"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="productsdescribe">
                    <InputGroup>
                      <InputGroup.Text>Product Description</InputGroup.Text>
                      <FormControl
                        type="text"
                        name="productsdescribe"
                        value={formData.productsdescribe}
                        onChange={handleInputChange}
                        placeholder="Enter product description"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="productsview">
                    <InputGroup>
                      <InputGroup.Text>Product View</InputGroup.Text>
                      <FormControl
                        type="number"
                        name="productsview"
                        value={formData.productsview}
                        onChange={handleInputChange}
                        placeholder="Enter product view"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="productsstatus">
                    <InputGroup>
                      <InputGroup.Text>Product Status</InputGroup.Text>
                      <Form.Select
                        name="productsstatus"
                        value={formData.productsstatus}
                        onChange={handleInputChange}
                      >
                        <option value="">-- Select Product Status --</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="categoryid">
                    <InputGroup>
                      <InputGroup.Text>Select Category</InputGroup.Text>
                      <Form.Select
                        name="categoryid"
                        value={formData.categoryid}
                        onChange={handleInputChange}
                      >
                        <option value="">-- Select Category --</option>
                        {categorys.map((category) => (
                          <option key={category.categoryid} value={category.categoryid}>
                            {category.categoryname}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="categoryLV2id">
                    <InputGroup>
                      <InputGroup.Text>Select Category Level 2</InputGroup.Text>
                      <Form.Select
                        name="categoryLV2id"
                        value={formData.categoryLV2id}
                        onChange={handleInputChange}
                      >
                        <option value="">-- Select Category Level 2 --</option>
                        {categorylv2s.map((categorylv2) => (
                          <option key={categorylv2.categorylvid} value={categorylv2.categorylvid}>
                            {categorylv2.categorylvname}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="colorid">
                    <InputGroup>
                      <InputGroup.Text>Select Color</InputGroup.Text>
                      <Form.Select
                        name="colorid"
                        value={formData.colorid}
                        onChange={handleInputChange}
                      >
                        <option value="">-- Select Color --</option>
                        {colors.map((color) => (
                          <option key={color.colorid} value={color.colorid}>
                            {color.colorname}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>

                  <Button type="submit" className="btn btn-primary btn-lg">
                    Add Product
                  </Button>
                </Form>
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
