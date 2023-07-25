import React from 'react';

const ConfirmationDialog = ({ isOpen, onConfirm, onCancel }) => {
  return isOpen ? (
    <div className="dialog-overlay">
      <div className="dialog">
        <p>Are you sure you want to delete this task?</p>
        <div className="dialog-buttons">
          <button className='btn' onClick={onConfirm}>Yes</button>
          <button className='btn' onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ConfirmationDialog;