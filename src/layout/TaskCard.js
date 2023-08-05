import React,{useState,useEffect} from 'react';
import './taskcard.css';
import Navbar from '../components/NavBar';
import ConfirmationDialog from '../components/DialogBox';
import axios from 'axios';
import { baseURL,config_header } from '../services/base.services';
import Alertprompt from '../components/Alert';
import EditModal from '../components/EditModal';

function TaskCard({ task ,fetchTasks }) {
    const cardClasses = getPriorityClass(task.priority);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);
    const config = config_header();
    const [popupShowAlert, setpopupShowAlert] = useState(false);
    const [showStatusUpdateAlert, setShowStatusUpdateAlert] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [TaskData,setTaskData]=useState('');
    // opens Delete Dialog Box
    const handleDelete = () => {
      setConfirmationOpen(true);
    };

    // on Confirmation of delete button 
    const handleConfirmDelete = async() => {
      await axios.delete(`${baseURL}api/Task/delete/${task.id}`,config);
      fetchTasks();
      // setShowAlert(true); 
      setConfirmationOpen(false);
    };

    const handleCancelDelete = () => {
      setConfirmationOpen(false);
    };

    const handleEdit = () => {     
      setShow(true); 
      // console.log(task);
      setTaskData(task,fetchTasks);

      // Add your edit logic here...
    };
  
    const handleUpdate = async () => {
      const payload = { newstatus: !task.Status };
      try {
        await axios.put(`${baseURL}api/Task/changeStatus/${task.id}`, payload, config);
        fetchTasks();
        setShowStatusUpdateAlert(true);
        handleShowAlert(`Status update of ${task.title} successful!`);
        alert(`Status update of ${task.title} successful!`);
      } catch (error) {
        setShowStatusUpdateAlert(true);
        alert('Status Update failed');
        
      }
    };
  const [alertMessage, setAlertMessage] = useState('');

  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setpopupShowAlert(true);
  };

  const handleCloseAlert = () => {
    setpopupShowAlert(false);
  };
    
    return (<>
        <Navbar/>
                <div className="card-body">
        
          {/* <Alertprompt type="success" message={`Status update of ${task.title} successful!`} onClose={() => setShowStatusUpdateAlert(false)} />
         */}
          {/* <Alertprompt severity="success" message="Sample Success Message"></Alertprompt> */}
            {/* <Alertprompt severity="danger" message='sample'></Alertprompt> */}
        {/* <Alertprompt type="success">Deleted {task.title}</Alertprompt> */}
      
        {popupShowAlert && <Alertprompt message={alertMessage} onClose={handleCloseAlert} />}

        <div className={cardClasses}>

          <h5 className="card-title ">{task.title}</h5>
          <p className="card-text">{task.description}</p>
          <h6 className="card-h6">Due By:</h6>
          <p className="card-text">{task.due_date}</p>
          <h6 className="card-h6">Status</h6>
          <p className={task.Status ? "p-status-complete" : "p-status-incomplete"}>
            {task.Status ? "Complete" : "Incomplete"}
          </p>
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit
          </button>
          
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={handleUpdate}>
            Update Status
          </button>
        </div>
          <EditModal title="Edit Task" show={show} onClose={handleClose} refresher={fetchTasks} type="Task" Editdata={(TaskData)}/>
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
  

function TaskList({ tasks ,fetchTasks}) {
  return (<div className='m-3'> 
    <div className="task-list ">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} fetchTasks={fetchTasks}/>
      ))}
    </div></div>
  );
}



export default TaskList;
