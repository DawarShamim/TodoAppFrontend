import React from 'react';
import './taskcard.css';
import Navbar from '../components/NavBar';
function TaskCard({ task }) {
    const cardClasses = getPriorityClass(task.priority);
  
    return (<>
        <Navbar/>
        <div className="card-body">
      <div className={cardClasses}>
          <h5 className="card-title ">{task.title}</h5>
          <p className="card-text">{task.description}</p>
          <h6 className="card-h6">Due By:</h6>
          <p className="card-text">{task.due_date}</p>
          <button className="btn btn-primary">Edit</button>
          <button className="btn btn-danger">Delete</button>
          <button className="btn btn-secondary">Update</button>
        </div>
      </div></>
    );
  }
  
  function getPriorityClass(priority) {
    if (priority === 'low') {
      return 'card-priority-low';
    } else if (priority === 'medium') {
      return 'card-priority-medium';
    } else if (priority === 'high') {
      return 'card-priority-high';
    } else {
      return '';
    }
  }
  

function TaskList({ tasks }) {
  return (<div className='m-3'> 
    <div className="task-list ">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div></div>
  );
}



export default TaskList;
