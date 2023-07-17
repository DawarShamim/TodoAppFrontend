import axios from 'axios';
import React,{useState} from 'react';
import './signuplogin.css';
import { baseURL, saveToken } from '../services/base.services';


function SignupLogin() {
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');


  const [signUpFName, setSignUpFName] = useState('');
  const [signUpLName, setSignUpLName] = useState('');
  
  const [signUpEmail, setSignUpEmail] = useState('');
  const [DOB, setDOB] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirm, setSignUpConfirm] = useState('');
  const [errors, setErrors] = useState({});

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
  const startYear = 1945; // Start year of the range
  const endYear = 2023; // End year of the range
  
  const yearRange = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );
  
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getDaysInMonth = (month, year) => {
    switch (month) {
      case 'January':
      case 'March':
      case 'May':
      case 'July':
      case 'August':
      case 'October':
      case 'December':
        return 31;
      case 'April':
      case 'June':
      case 'September':
      case 'November':
        return 30;
      case 'February':
        return isLeapYear(year) ? 29 : 28;
      default:
        return 0; // Invalid month
    }
  };
  

  

  const handleLogInSubmit = () => {
    setErrors({});
      if (!logEmail) {
      setErrors((prevErrors) => ({ ...prevErrors, Logmail: '*Enter Email or Username' }));
    
    } else if (!logPassword) {
    
      setErrors((prevErrors) => ({ ...prevErrors, logPassword: '*Enter Password' }));
    
    } else {
      // Create a payload object with the required data
      const payload = {
        usernameOrEmail: logEmail,
        password: logPassword,
            };
  
            axios({
              method: 'post',
              url: baseURL +'api/Login',
              timeout: 10000,    // 4 seconds timeout
              data:payload
            })
            .then(response => {
              saveToken(response.data.result.token)
              console.log(response.data.result);
              console.log(response.request.status);              
              // Check the status code
              if (response.request.status === 200) {
                // Redirect to the next page
                window.location.href = 'http://localhost:3000/task/card';
              }
            })
            .catch(error => {
              if(error.request.status === 401){
                setErrors((prevErrors) => ({ ...prevErrors, Invalid: 'Invalid Username or Password' }));
              setLogEmail('');
              setLogPassword('');
          };
        })  
    }
  };
  
  

  const handleSignUpSubmit = () => {      
    setErrors({});
    setDOB(selectedYear + "-" + (months.indexOf(selectedMonth)+1) + "-" + selectedDay);
    console.log(DOB);
    console.log("Month", months[months.indexOf(selectedMonth)]);

    // 2001-01-16
    if (!signUpLName) {
      setErrors((prevErrors) => ({ ...prevErrors, LastName: '*Please fill in all the required fields' }));
    }

    if (!signUpFName) {
      setErrors((prevErrors) => ({ ...prevErrors, FirstName: '*Please fill in all the required fields' }));
    }

    if (!signUpEmail) {
      setErrors((prevErrors) => ({ ...prevErrors, Email: '*Please fill in all the required fields' }));
    }
    if (selectedYear === 'Year' || selectedMonth === 'Month' || selectedDay === 'Day') {
      setErrors((prevErrors) => ({ ...prevErrors, DOB: '*Please Select An Option' }));
    }

    if (!signUpPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, Password: '*Please fill in all the required fields' }));
    }

    if (signUpPassword.length < 8 || signUpPassword.length > 20) {
      setErrors((prevErrors) => ({ ...prevErrors, Password: '*Password length should be between 8 and 20 characters' }));
    }

    if (signUpConfirm !== signUpPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, Confirm: '*Both passwords should be the same' }));
    }

    // Proceed with signup if there are no errors
    if (Object.keys(errors).length === 0) {
      // Perform signup logic here
      
  }
}

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                          {errors.Invalid && <p className="error-message">{errors.Invalid}</p>}
                            
                            <input type="email" name="logemail" className="form-style" placeholder="Email" id="logemail" autoComplete="off"
                            onChange={e=>setLogEmail(e.target.value)} />
                            <i className="input-icon uil uil-at"></i>  
                            {errors.Logmail && <p className="error-message">{errors.Logmail}</p>}
                          </div>
                          
                          <div className="form-group mt-2">
                            <input type="password" name="logpass" className="form-style" placeholder="Password" id="logpass" autoComplete="off"
                            onChange={e=>setLogPassword(e.target.value)} />
                            <i className="input-icon uil uil-lock-alt"></i>
                            {errors.logPassword && <p className="error-message">{errors.logPassword}</p>}
                          
                          </div>
                          <a href="#" className="btn mt-4" onClick={handleLogInSubmit}>Login</a>
        
        
                          <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <h4 className="mb-1 pb-2">Sign Up</h4>

                            <div className="flexbox">
                              <div className="form-group flexbox-child">
                                <input type="text" name="regfirstname" className="form-style" placeholder="First Name" id="regfirstname" autoComplete="off" 
                                  onChange={e=>setSignUpFName(e.target.value)} 
                                />
                                <i className="input-icon uil uil-user"></i>
                              </div>

                              <div className="flexbox-gap"></div>

                              <div className="form-group flexbox-child">
                                <input type="email" name="reglastname" className="form-style" placeholder="Last Name" id="reglastname" autoComplete="off" 
                                  onChange={e=>setSignUpLName(e.target.value)} 
                                />
                                <i className="input-icon uil uil-at"></i>
                                </div>
                            </div>
                              {(errors.LastName || errors.FirstName) && (<p className="error-message">{errors.LastName || errors.FirstName}</p>)}
                            <div className="form-group mt-2">
                              <input type="text" name="regemail" className="form-style" placeholder="Email" id="regemail" autoComplete="off"
                              onChange={e=>setSignUpEmail(e.target.value)} />
                              <i className="input-icon uil uil-user"></i>
                              {errors.Email && <p className="error-message">{errors.Email}</p>}
                            </div>

                            <div className="form-group mt-2">
                              <input type="password" name="regpassword" className="form-style" placeholder="New Password" id="regpassword" autoComplete="off" 
                                onChange={e=>setSignUpPassword(e.target.value)} 
                                />
                              <i className="input-icon uil uil-lock-alt"></i>
                              {errors.Password && <p className="error-message">{errors.Password}</p>}
                              </div>

                            <div className="form-group mt-2">
                              <input type="password" name="regconfirm" className="form-style" placeholder="Confirm Password" id="regconfirm" autoComplete="off" 
                                onChange={e=>setSignUpConfirm(e.target.value)} 
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                              {errors.Confirm && <p className="error-message">{errors.Confirm}</p>}
                            </div>

                            <h5 className= "form-heading">Date of Birth</h5>
                            <div className="flexbox mt-2">
                            <select className="form-group p-3 m-0 form-style flexbox-child"
                              value={selectedYear}
                              onChange={(e) => setSelectedYear(e.target.value)}
                            >
                              <option>Year</option>
                              {yearRange.map((year) => (
                                <option key={year}>{year}</option>
                              ))}
                            </select>

                            <div className="flexbox-gap"></div>

                            <select
                              className="form-group p-3 m-0 form-style flexbox-child"
                              value={selectedMonth}
                              onChange={(e) => setSelectedMonth(e.target.value)}
                            >
                              <option>Month</option>
                              {months.map((month, index) => (
                                <option key={index}>{month}</option>
                              ))}
                            </select>

                            <div className="flexbox-gap"></div>

                            <select
                              className="form-group p-3 m-0 form-style flexbox-child"
                              value={selectedDay}
                              onChange={(e) => setSelectedDay(e.target.value)}
                            >
                              <option>Day</option>
                              {Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, index) => (
                                <option key={index + 1}>{index + 1}</option>
                              ))}
                            </select>
                            </div>
                            {errors.DOB && <p className="error-message">{errors.DOB}</p>}
                            
                            </div>

                            <a href="#" className="btn mt-4" onClick={handleSignUpSubmit}>Sign Up</a>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div></>);
}

export default SignupLogin;
