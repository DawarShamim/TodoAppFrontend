import axios from 'axios';
import React,{useState} from 'react';
import './signuplogin.css';
import { baseURL, saveToken } from '../services/base.services';
import { useNavigate} from 'react-router-dom';
import {Mail,Lock,User2,MoveUpLeft} from "lucide-react";

function SignupLogin() {
  const navigate = useNavigate();
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');
  const[APIhit,setAPIhit] =useState(false);

  const [signUpFName, setSignUpFName] = useState('');
  const [signUpLName, setSignUpLName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirm, setSignUpConfirm] = useState('');
  
  const [errors, setErrors] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
  const startYear = 1960; 
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
        return 0; 
    }
  };

  const handleLogInSubmit = () => {
    setErrors({});
    setAPIhit(true);
    if (!logEmail) {
      setErrors((prevErrors) => ({ ...prevErrors, Logmail: '*Enter Email or Username' }));
    
    } else if (!logPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, logPassword: '*Enter Password' }));
    
    } else {
      const payload = {
        usernameOrEmail: logEmail,
        password: logPassword,
            };
  
            axios({
              method: 'post',
              url: baseURL +'api/Login',
              timeout: 10000,    
              data:payload
            })
            .then(response => {
              saveToken(response.data.result.token)            
              if (response.request.status === 200) {
                navigate('/task/card');
              }
            })
            .catch(error => {
                setErrors((prevErrors) => ({ ...prevErrors, Invalid: 'Invalid Username or Password' }));
              
              setLogEmail('');
              setLogPassword('');
        })  
    };
    setAPIhit(false);
  };
  
const validateForm= () =>{
  setErrors({});
    const validDomains = ["gmail.com", "hotmail.com", "yahoo.com"]; 
    const emailRegex = new RegExp(`^[\\w+.-]+@(?:${validDomains.join("|")})$`, "i");
    
    if (!signUpLName) {
      setErrors((prevErrors) => ({ ...prevErrors, LastName: '*Please fill in all the required fields' }));
    }

    if (!signUpFName) {
      setErrors((prevErrors) => ({ ...prevErrors, FirstName: '*Please fill in all the required fields' }));
    }

    if (!signUpEmail) {
      setErrors((prevErrors) => ({ ...prevErrors, Email: '*Please fill in all the required fields' }));
       }
      else if (!emailRegex.test(signUpEmail)) {
        setErrors((prevErrors) => ({ ...prevErrors, Email: '*Please enter a valid email address' }));
      }

    if (selectedYear === 'Year' || selectedMonth === 'Month' || selectedDay === 'Day' || selectedYear === '' || selectedMonth === '' || selectedDay === '') {
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

    if (Object.keys(errors).length === 0) {
      return true;      
  }
}

  const handleSignUpSubmit = () => {      
    const isValid = validateForm();
    if (isValid) {
  const trimmedEmail = signUpEmail.replace(/@.*/, ''); // Removes everything after the @ symbol
  const SignupPayload = {
    Email: signUpEmail,
    Username: trimmedEmail,
    Password: signUpPassword,
    FirstName: signUpFName,
    LastName: signUpLName,
    DateOfBirth: selectedYear + '-' + (months.indexOf(selectedMonth) + 1) + '-' + selectedDay,
  };
      axios({
        method: 'post',
        url: baseURL +'api/User/new',
        timeout: 10000,    // 4 seconds timeout
        data:SignupPayload
      })
      .then(response => {
        saveToken(response.data.token)            
        // Check the status code
        if (response.request.status === 201) {
          // Redirect to the next page
          navigate('/task/card');
        }
      })
      .catch(error => {
        setErrors((prevErrors) => ({ ...prevErrors, Email: '*Email already Registered' }));    
});}else{return;}
}

const handleKeyPress = (event, type) => {
  if (event.key === "Enter") {
    if (type === "login") {
      handleLogInSubmit();
    } else if (type === "signup") {
      handleSignUpSubmit();
    }
  }
};

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
                          {errors.Invalid && <p className="error-message">{errors.Invalid}</p>}
                          <div className="form-group">
          
                            <input 
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Email or Username"
                            id="logemail"
                            autoComplete="off"
                            value={logEmail}
                            onChange={e=>setLogEmail(e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, "login")}
                             />
                            <Mail className="input-icon" />  
                            {errors.Logmail && <p className="error-message">{errors.Logmail}</p>}
                            </div>
                          
                          <div className="form-group mt-2">
                            <input 
                            type="password" 
                            name="logpass" 
                            className="form-style" 
                            placeholder="Password" 
                            id="logpass" 
                            autoComplete="off" 
                            value={logPassword}
                            onChange={e=>setLogPassword(e.target.value)}
                            onKeyDown={(e)=>{handleKeyPress(e,"login")}}
                            />
                            <Lock className="input-icon"/>
                            {errors.logPassword && <p className="error-message">{errors.logPassword}</p>}
                          
                          </div>
                          <button className="btn mt-4" onClick={handleLogInSubmit} disabled ={APIhit}>
                          {APIhit ? ('Loading') : ('Login')}</button>
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
                                <input 
                                type="text"
                                name="regfirstname"
                                className="form-style"
                                placeholder="First Name"
                                id="regfirstname"
                                autoComplete="off" 
                                onChange={e=>setSignUpFName(e.target.value)} 
                                onKeyDown={(e) => handleKeyPress(e, "signup")}
                                />
                                <User2 className="input-icon" />
                              </div>

                              <div className="flexbox-gap"></div>

                              <div className="form-group flexbox-child">
                                <input 
                                type="email"
                                name="reglastname"
                                className="form-style"
                                placeholder="Last Name"
                                id="reglastname"
                                autoComplete="off" 
                                onChange={e=>setSignUpLName(e.target.value)} 
                                onKeyDown={(e) => handleKeyPress(e, "signup")} 
                                />
                                <User2 className="input-icon" />
                              </div>
                            </div>
                              {(errors.LastName || errors.FirstName) && (<p className="error-message">{errors.LastName || errors.FirstName}</p>)}
                            <div className="form-group mt-2">
                              <input 
                              type="text"
                              name="regemail"
                              className="form-style"
                              placeholder="Email"
                              id="regemail"
                              autoComplete="off"
                              onChange={e=>setSignUpEmail(e.target.value)} 
                              onKeyDown={(e) => handleKeyPress(e, "signup")}
                              />
                              <Mail className="input-icon"/>
                              {errors.Email && <p className="error-message">{errors.Email}</p>}
                            </div>

                            <div className="form-group mt-2">
                              <input 
                              type="password" 
                              name="regpassword" 
                              className="form-style" 
                              placeholder="New Password" 
                              id="regpassword" 
                              autoComplete="off" 
                              onChange={e=>setSignUpPassword(e.target.value)} 
                              onKeyDown={(e) => handleKeyPress(e, "signup")}
                              />  
                              <Lock className="input-icon" />
                              {errors.Password && <p className="error-message">{errors.Password}</p>}
                              </div>

                            <div className="form-group mt-2">
                              <input 
                              type="password" 
                              name="regconfirm" 
                              className="form-style" 
                              placeholder="Confirm Password" 
                              id="regconfirm" 
                              autoComplete="off" 
                              onChange={e=>setSignUpConfirm(e.target.value)} 
                              onKeyDown={(e) => handleKeyPress(e, "signup")}
                              />
                              <Lock className="input-icon" />
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
                            <button className="btn mt-4" onClick={handleSignUpSubmit} disabled ={APIhit}>
                          {APIhit ? ('Loading' ) : ('Sign Up' )}</button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
    </>);
}

export default SignupLogin;
