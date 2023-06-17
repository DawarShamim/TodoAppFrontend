import React from 'react';

function FormInput({ type, name, placeholder, id }) {
    return (
      <div className="form-group mt-2">
        <input type={type} name={name} className="form-style" placeholder={placeholder} id={id} autoComplete="off" />
        <i className={`input-icon uil uil-${id}`}></i>
      </div>
    );
  }
  
  function FormCard({ title, children }) {
    return (
        <div className="center-wrap">
          <div className="section text-center">
            <h4 className="mb-4 pb-3">{title}</h4>
            {children}
          </div>
        </div>
    );
  }

  export {FormCard,FormInput};