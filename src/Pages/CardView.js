import React from 'react';
import Modalbox from '../components/modalbox';
import TaskList from "../layout/TaskCard";
import './cardview.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { decodeToken } from '../services/base.services';

function CardView() {
  const decodedToken = decodeToken();

  if (!decodedToken) {
    // Redirect to the login page or perform any other desired action
    window.location.href = 'http://localhost:3000/login';
  } else {
    console.log(decodedToken);
  }
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [orderBy, setOrderBy] = React.useState(null);
  const [sortOrder,setSortOrder]= React.useState(null);


  const tasks = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', due_date: "2023-6-23", priority: 'low' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', due_date: "2023-6-25", priority: 'low' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', due_date: "2023-6-20", priority: 'high' },
    { id: 4, title: 'Task 4', description: 'Description for Task 4', due_date: "2023-6-28", priority: 'medium' },
    { id: 5, title: 'Task 5', description: 'Description for Task 5', due_date: "2023-6-26", priority: 'medium' },
  ];

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
    let priorityOrder = { low: 3, medium: 2, high: 1 };  
    if(sortOrder ==="ascending"){
      priorityOrder = { low: 1, medium: 2, high: 3 };}

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

  return (
    <div className="body-container">
<div className="row">
        <div className="col-2">
          <h1>Tasks</h1>
        </div>
        <div className="col-10 d-flex justify-content-end align-items-center">
          <button className="btn" onClick={handleShow}>
            Add New
          </button>
          <Modalbox title="New Task" show={show} onClose={handleClose} type="Task" />
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

      <TaskList tasks={sortedTasks} />
    </div>
  );
}

export default CardView;
