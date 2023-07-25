import React,{useState} from 'react';
import './taskcard.css';
import Navbar from '../components/NavBar';
import ConfirmationDialog from '../components/DialogBox';
import axios from 'axios';
import { baseURL,config_header } from '../services/base.services';


function TaskCard({ task }) {
    const cardClasses = getPriorityClass(task.priority);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);
    const config =config_header();

    const handleConfirmDelete = async() => {
      console.log('Delete button pressed. Card ID:', task.id);
      const result = await axios.delete(`${baseURL}api/Task/delete/${task.id}`,config);
      console.log(result);
      setConfirmationOpen(false);
    };
    const handleDelete = () => {
      setConfirmationOpen(true);
    };
    const handleCancelDelete = () => {
      setConfirmationOpen(false);
    };


    const handleEdit = () => {
      console.log('Edit button pressed. Card ID:', task.id);
      // Add your edit logic here...
    };
  
    const handleUpdate = () => {
      console.log('Update button pressed. Card ID:', task.id);
      // Add your update logic here...
    };
    
    return (<>
        <Navbar/>
        <div className="card-body">
      <div className={cardClasses}>
          <h5 className="card-title ">{task.title}</h5>
          <p className="card-text">{task.description}</p>
          <h6 className="card-h6">Due By:</h6>
          <p className="card-text">{task.due_date}</p>
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div><ConfirmationDialog
        isOpen={isConfirmationOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      /></>
    );
  }
  
  function getPriorityClass(priority) {
    if (priority === 'Low') {
      return 'card-priority-low';
    } else if (priority === 'Medium') {
      return 'card-priority-medium';
    } else if (priority === 'High') {
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
