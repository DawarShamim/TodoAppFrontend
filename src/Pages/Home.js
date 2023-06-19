import React from 'react';
import './home.css';
import DataTable from '../layout/DataGrid.layout';
import Navbar from '../components/NavBar';
import Modalbox from '../components/modalbox';

function DataGrid() 
{
const [show, setShow] = React.useState(false);
const handleShow = () => setShow(true);
const handleClose = () => setShow(false);
  return (<>
      <Navbar/>
      <div className="card-front">
      <div className="section">
        <div className="container">

        <DataTable />
      <button className="btn" onClick={handleShow}>
        Add New
      </button>
      <Modalbox title={"New Task"} show={show} onClose={handleClose} type = "Task" />
    </div>

      </div>
      </div></>
    );
  }
  
export default DataGrid;