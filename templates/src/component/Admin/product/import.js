import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import AddInPort from './AddImport';
const ImportProduct = ({ match, history }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const productsid = localStorage.getItem('productsid');
      const fetchProduct = async () => {
        try {
          // Use the correct variable for the productsid
          const response = await axios.get(`/admin/product/api/admin/product-by-id/${productsid}`);
          setProduct(response.data);
          setLoading(false);
        } catch (error) {
          setError('Error fetching product details');
          setLoading(false);
        }
      };
  
      fetchProduct();
    }, []); // Make sure to include any dependencies if needed
  
    const handleFormSubmit = async (formData) => {
      try {
        // Use the correct URL for the import endpoint
        await axios.post(`/admin/import/api/admin/create-import-product`, formData);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
  
    const handleCancel = () => {
      // Redirect back to the product list page if the user cancels the edit
      history.push('/product-list');
    };

  return (
    <div className="container mt-5">
      <h2>import Product</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {product && (
        <AddInPort onSubmit={handleFormSubmit} onCancel={handleCancel} user={product} />
      )}
    </div>
  );
};

export default ImportProduct;
