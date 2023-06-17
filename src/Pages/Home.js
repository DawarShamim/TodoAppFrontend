import React from 'react';
import './home.css';
import DataTable from '../layout/DataGrid.layout';

import Navbar from '../components/NavBar';

function DataGrid() {
  return (<>
      <Navbar/>
      <div className="card-front">
      <div className="section">
        <div className="container">

        <DataTable />
      </div>
      </div>
      </div></>
    );
  }
  
export default DataGrid;