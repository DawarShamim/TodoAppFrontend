import React from 'react';
import './SignupLogin.css';
import DataTable from '../layout/DataGrid.layout';

function DataGrid() {
    return (
      
      <div className="card-front">
      <div className="section">
        <div className="container">
        <h1>DataTable Example</h1>
        <DataTable />
      </div>
      </div>
      </div>
    );
  }
  
export default DataGrid;