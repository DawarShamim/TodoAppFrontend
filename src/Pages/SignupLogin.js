import React,{useState} from 'react';
import './signuplogin.css';




function SignupLogin() {
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');


  const [signUpFName, setSignUpFName] = useState('');
  const [signUpLName, setSignUpLName] = useState('');
  
  const [signUpEmail, setSignUpEmail] = useState('');
  const [DOB, setDOB] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirm, setSignUpConfirm] = useState('');
  const [errorMSG, setErrorMSG] = useState('');
  const [errorOn,setErrorOn] = useState('');
  
  const handleLogInSubmit = () => {
    console.log('Log In Email:', logEmail);
    console.log('Log In Password:', logPassword);
    if (!logEmail) {
      setErrorOn('Logmail');
      setErrorMSG('Enter Email or Username');
  
    } else if (!logPassword) {
      setErrorOn('logPassword');
      setErrorMSG('*Enter Password')
  };
  };

  const handleSignUpSubmit = () => {      
    if (!signUpLName) {
      setErrorOn('LastName');
      setErrorMSG('*Please fill in all the required fields')
  
    } else if (!signUpFName) {
      setErrorOn('FirstName');
      setErrorMSG('*Please fill in all the required fields')
    } else if (!signUpEmail) {
      setErrorOn('Email');
      setErrorMSG('*Please fill in all the required fields')
    } else if (!DOB) {
      setErrorOn('DOB');
      setErrorMSG('*Please fill in all the required fields')
    }   else if (!signUpPassword){
      setErrorOn('Password');
        setErrorMSG('*Please fill in all the required fields')
  }
      if (signUpPassword.length >= 8 && signUpPassword.length <= 20) {
        if (signUpConfirm === signUpPassword) {
        } else {
          setErrorOn('Confirm');
          setErrorMSG('*Both passwords should be the same');
        }
      } else {
        setErrorOn('Password');
        setErrorMSG('*Password length should be between 8 and 20 characters');
      
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
                            <input type="email" name="logemail" className="form-style" placeholder="Email" id="logemail" autoComplete="off"
                            onChange={e=>setLogEmail(e.target.value)} />
                            <i className="input-icon uil uil-at"></i>  
                            {errorOn === 'Logmail'  && <p className='error-message'>{errorMSG}</p>}
                          </div>
                          
                          <div className="form-group mt-2">
                            <input type="password" name="logpass" className="form-style" placeholder="Password" id="logpass" autoComplete="off"
                            onChange={e=>setLogPassword(e.target.value)} />
                            <i className="input-icon uil uil-lock-alt"></i>
                            {errorOn === 'logPassword'  && <p className='error-message'>{errorMSG}</p>}
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
                                {errorOn === 'FirstName'  && <p className='error-message'>{errorMSG}</p>}
                              </div>

                              <div className="flexbox-gap"></div>

                              <div className="form-group flexbox-child">
                                <input type="email" name="reglastname" className="form-style" placeholder="Last Name" id="reglastname" autoComplete="off" 
                                  onChange={e=>setSignUpLName(e.target.value)} 
                                />
                                <i className="input-icon uil uil-at"></i>
                                {errorOn === 'LastName'  && <p className='error-message'>{errorMSG}</p>}
                              </div>
                            </div>

                            <div className="form-group mt-2">
                              <input type="text" name="regemail" className="form-style" placeholder="Email" id="regemail" autoComplete="off"
                              onChange={e=>setSignUpEmail(e.target.value)} />
                              <i className="input-icon uil uil-user"></i>
                              {errorOn === 'Email'  && <p className='error-message'>{errorMSG}</p>}
                            </div>

                            <div className="form-group mt-2">
                              <input type="password" name="regpassword" className="form-style" placeholder="New Password" id="regpassword" autoComplete="off" 
                                onChange={e=>setSignUpPassword(e.target.value)} 
                                />
                              <i className="input-icon uil uil-lock-alt"></i>
                              {errorOn === 'Password'  && <p className='error-message'>{errorMSG}</p>}
                            </div>

                            <div className="form-group mt-2">
                              <input type="password" name="regconfirm" className="form-style" placeholder="Confirm Password" id="regconfirm" autoComplete="off" 
                                onChange={e=>setSignUpConfirm(e.target.value)} 
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                              {errorOn === 'Confirm'  && <p className='error-message'>{errorMSG}</p>}
                            </div>

                            <div className="flexbox mt-2">
                              <select className="form-group p-3 m-0 form-style flexbox-child">
                              <option>Day</option>
                              {Array.from({ length: 30 }, (_, index) => (
                                <option key={index + 1}>{index + 1}</option>
                              ))}
                            </select>

                            <div className="flexbox-gap"></div>

                            <select className="form-group p-3 m-0 form-style flexbox-child">
                                <option>Month</option>
                                {/* Add month options here */}
                              </select>

                              <div className="flexbox-gap"></div>

                              <select className="form-group p-3 m-0 form-style flexbox-child">
                                <option>Year</option>
                                {/* Add year options here */}
                              </select>
                            </div>
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
