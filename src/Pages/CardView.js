import React from 'react';
import Modalbox from '../components/modalbox';
import TaskList from "../layout/TaskCard";
import './cardview.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { decodeToken } from '../services/base.services';
import {useNavigate} from 'react-router-dom';
import { baseURL,config_header } from '../services/base.services';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Navbar from '../components/NavBar';

function CardView() {
  const navigate = useNavigate();
  const decodedToken = decodeToken();
  const [tasks,setTasks] = useState([]);

  if (!decodedToken) {
    // Redirect to the login page or perform any other desired action
    navigate('/login');
  }
  
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [orderBy, setOrderBy] = React.useState(null);
  const [sortOrder,setSortOrder]= React.useState(null);

  // baseURL+api/Task/all;
const config = config_header();

const refresher =async () =>{
  try {
  setTasks([]);
  const tasksData = await getAllTasks();
  setTasks(tasksData);
} catch (error) {
  console.log(error);
};
};

useEffect(() => {
  // Fetch tasks only once when the component mounts
  const fetchTasks = async () => {
    try {
      const tasksData = await getAllTasks();
      setTasks(tasksData);
    } catch (error) {
      console.log(error);
    }
  };
  fetchTasks();
}, []); // Ensure that the dependency array is empty so that the effect runs only once

    const getAllTasks = async () => {
      try {
        const response = await axios.get(`${baseURL}api/Task/all`,config);

        // Check the status code
        if (response.status === 200) {
          const convertedData = response.data.tasks.map((task, index) => ({
            id: task._id,
            title: task.title || `Task ${index + 1}`,
            description: task.description || `Description for Task ${index + 1}`,
            due_date: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "",
            priority: task.priority || 'Low',
            Status:task.Status,
          }));
          return convertedData;
        } else {
          throw new Error('Failed to fetch tasks.');
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    };


    
  const sortTasksByDueDate = (tasks,sortOrder) => {
    return tasks.sort((a, b) => {
      const dateA = new Date(a.due_date);
      const dateB = new Date(b.due_date);
      if(sortOrder ==="ascending"){
              return dateA - dateB;}
        else{
          return dateB - dateA;}
    });
  };

  const sortTasksByPriority = (tasks,sortOrder) => {
    let priorityOrder = { Low: 3, Medium: 2, High: 1 };  
    if(sortOrder ==="ascending"){
      priorityOrder = { Low: 1, Medium: 2, High: 3 };}

    return tasks.sort((a, b) => {
      const priorityA = priorityOrder[a.priority];
      const priorityB = priorityOrder[b.priority];
        return priorityA - priorityB;})

  };

  const handleOrderByChange = (eventKey) => {
    setOrderBy(eventKey);
  };
  const handleSortOrder =(eventKey) =>{
    setSortOrder(eventKey);
  };

  let sortedTasks = tasks;

  if (orderBy === 'date') {
    sortedTasks = sortTasksByDueDate(tasks,sortOrder);
  } else if (orderBy === 'priority') {
    sortedTasks = sortTasksByPriority(tasks,sortOrder);
  }

  return (<>
  <Navbar/>
  <div className="body-container">
      <div className="row">
        <div className="col-2">
          <h1>Tasks</h1>
        </div>
        <div className="col-10 d-flex justify-content-end align-items-center">
          <button className="btn" onClick={handleShow}>
            Add New
          </button>
          <Modalbox title="New Task" show={show} onClose={handleClose} type="Task" fetchTasks={refresher}/>
          <Dropdown onSelect={handleOrderByChange} className="ml-3">
            <Dropdown.Toggle variant="secondary" id="dropdownMenuButton">
              {orderBy ? `Order By: ${orderBy}` : 'Order By'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="date">Date</Dropdown.Item>
              <Dropdown.Item eventKey="priority">Priority</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown onSelect={handleSortOrder} className="ml-3">
            <Dropdown.Toggle variant="secondary" id="dropdownMenuButton">
              {sortOrder ? `Sort By: ${sortOrder}` : 'Sort By'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="ascending">Ascending</Dropdown.Item>
              <Dropdown.Item eventKey="descending">Descending</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <TaskList tasks={sortedTasks} fetchTasks={refresher} />
    </div>
    </>);
}

export default CardView;
