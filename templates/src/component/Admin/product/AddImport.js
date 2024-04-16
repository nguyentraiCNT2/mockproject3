import React, { useState, useEffect } from 'react';
import axios from '../../../axios';

const AddInPort = ({ onSubmit, onCancel, user }) => {
  const [formData, setFormData] = useState({
    productsid: '',
    importprice:'',
    importqty:'',
  });

  const [users, setUsers] = useState([]);
  const [categorys, setCategory] = useState([]);
  const [lovelist, setLovelists] = useState([]);
  const [categorylv2s, setCategorylv2] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/admin/color/api/admin/color-list?page=1&limit=10');
        setUsers(response.data.listResult);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    const fetchlovelist = async () => {
      try {
        const response = await axios.get('/admin/love-list/api/admin/love-list/all?page=1&limit=10');
        setLovelists(response.data.listResult);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    const fetchCategory = async () => {
      try {
        const response = await axios.get('/admin/category/api/admin/category-list?page=1&limit=10');
        setCategory(response.data.listResult);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchCategorylv2 = async () => {
      try {
        const response = await axios.get('/admin/category-level-2/api/admin/category-list?page=1&limit=10');
        setCategorylv2(response.data.listResult);
      } catch (error) {
        console.error('Error fetching categories (level 2):', error);
      }
    };
    fetchlovelist();
    fetchUsers();
    fetchCategory();
    fetchCategorylv2();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        importprice:'',
        importqty:'',
        productsid: '',
      
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = async () => {
    try {
        const importdetailsResponse = await axios.post('/admin/import/api/admin/create-import-product', formData);
        window.location.href = '/product-list';
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
    <form onSubmit={handleFormSubmit} style={{marginBottom:'50px'}}>
       <div className="mb-3">
        <label htmlFor="importqty" className="form-label">importqty</label>
        <input
          type="number"
          className="form-control"
          id="importqty"
          name="importqty"
          value={formData.importqty}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="importprice" className="form-label">importprice</label>
        <input
          type="number"
          className="form-control"
          id="importprice"
          name="importprice"
          value={formData.importprice}
          onChange={handleChange}
        />
      </div>
         <div className="mb-3">
        <label htmlFor="productname" className="form-label">Product id</label>
        <input
          type="text"
          className="form-control"
          id="productname"
          name="productname"
          value={formData.productsid}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      <button onClick={handleReset} className="btn btn-secondary ms-2">Reset</button>
      <button onClick={onCancel} className="btn btn-danger ms-2">Cancel</button>
    </form>
      <div className="mb-3">
        <label htmlFor="productname" className="form-label">Product Name</label>
        <input
          type="text"
          className="form-control"
          id="productname"
          name="productname"
          value={formData.productname}
          onChange={handleChange}
        />
      </div>

      {/* Add other input fields for productcore, productprice, productsdescribe, productsview, productsstatus, loveListid, categoryLV2id, categoryid, colorid */}
      
      <div className="mb-3">
        <label htmlFor="productcore" className="form-label">Product Core</label>
        <input
          type="text"
          className="form-control"
          id="productcore"
          name="productcore"
          value={formData.productcore}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="productprice" className="form-label">Product Price</label>
        <input
          type="text"
          className="form-control"
          id="productprice"
          name="productprice"
          value={formData.productprice}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productsqltk" className="form-label">Product QTY</label>
        <input
          type="text"
          className="form-control"
          id="productsqltk"
          name="productsqltk"
          value={formData.productsqltk}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productsdescribe" className="form-label">Product Description</label>
        <input
          type="text"
          className="form-control"
          id="productsdescribe"
          name="productsdescribe"
          value={formData.productsdescribe}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="productsview" className="form-label">Product View</label>
        <input
          type="number"
          className="form-control"
          id="productsview"
          name="productsview"
          value={formData.productsview}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="productsstatus" className="form-label">Product Status</label>
        <select
          className="form-select"
          id="productsstatus"
          name="productsstatus"
          value={formData.productsstatus}
          onChange={handleInputChange}
        >
          <option value="">-- Select Product Status --</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>


      <div className="mb-3">
        <label htmlFor="categoryid" className="form-label">Select Category</label>
        <select
          className="form-select"
          id="categoryid"
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
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="categoryLV2id" className="form-label">Select Category Level 2</label>
        <select
          className="form-select"
          id="categoryLV2id"
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
        </select>
      </div>
      {/* <div className="mb-3">
        <label htmlFor="loveListid" className="form-label">Select Love List</label>
        <select
          className="form-select"
          id="loveListid"
          name="loveListid"
          value={formData.loveListid}
          onChange={handleInputChange}
        >
          <option value="">-- Select Love List --</option>
          {lovelist.map((lovelist) => (
            <option key={lovelist.lovelistid} value={lovelist.lovelistid}>
              {lovelist.lovelistname}
            </option>
          ))}
        </select>
      </div> */}
</>
  );
};

export default AddInPort;
