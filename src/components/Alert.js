import React, { useState } from "react";

import { Alert } from "reactstrap";

function Alertprompt(props) {
  const [showAlert, setShowAlert] = useState(true);

  const handleClose = () => {
    setShowAlert(false);
    props.onClose();
  };
  return (


<div className="alert-popup">
      <div className="alert-content">
        <p>{props.message}</p>
        {/* <button className="close-button" onClick={props.onClose}> */}
        
        <button className="close-button" onClick={handleClose}>
        handleClose
          Close
        </button>
      </div>
    





    
            <Alert color={(props.severity)}>
            {(props.message)}
        </Alert>
        {/* color="danger"
        color="warning"
        color="primary"  
        color="secondary" */}
    </div>
);}

export default Alertprompt;
