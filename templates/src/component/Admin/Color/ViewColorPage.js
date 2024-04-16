// src/components/ViewColorPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const ViewColorPage = ({ color, onCancel }) => {
  return (
    <div className="container mt-5">
      <h1>Color Details</h1>
      <div>
        <strong>Color Name:</strong> {color.colorname}
      </div>
      <div>
        <strong>Hex Code:</strong> {color.hexcode}
      </div>
      {/* Add other fields related to the Color entity */}
      <Link to="/color-list" className="btn btn-secondary" onClick={onCancel}>
        Close
      </Link>
    </div>
  );
};

export default ViewColorPage;
