import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import ProductForm from './ProductForm';

const ProductEditPage = ({ match, history }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/admin/product/api/admin/product/${match.params.productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [match.params.productId]);

  const handleFormSubmit = async (formData) => {
    try {
      await axios.put(`/admin/product/api/admin/update-product/${product.productsid}`, formData);
      // Redirect back to the product list page after successful edit
      localStorage.setItem('productname', formData.productname);
      history.push('/add-product-images');
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
      <h2>Edit Product</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {product && (
        <ProductForm onSubmit={handleFormSubmit} onCancel={handleCancel} user={product} />
      )}
    </div>
  );
};

export default ProductEditPage;
