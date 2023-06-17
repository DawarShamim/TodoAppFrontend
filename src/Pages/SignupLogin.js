import React,{useState} from 'react';
import './signuplogin.css';




function SignupLogin() {
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleLogInSubmit = () => {
    console.log('Log In Email:', logEmail);
    console.log('Log In Password:', logPassword);
  };

  const handleSignUpSubmit = () => {
    console.log('Sign Up Name:', signUpName);
    console.log('Sign Up Email:', signUpEmail);
    console.log('Sign Up Password:', signUpPassword);
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
                          <div className="form-group">
                            <input type="email" name="logemail" className="form-style" placeholder="Email" id="logemail" autoComplete="off" />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="password" name="logpass" className="form-style" placeholder="Password" id="logpass" autoComplete="off" />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <a href="#" className="btn mt-4" onClick={handleLogInSubmit}>submit</a>
        
        
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
                                <input type="text" name="regfirstname" className="form-style" placeholder="First Name" id="regfirstname" autoComplete="off" />
                                <i className="input-icon uil uil-user"></i>
                              </div>

                              <div className="flexbox-gap"></div>

                              <div className="form-group flexbox-child">
                                <input type="email" name="reglastname" className="form-style" placeholder="Last Name" id="reglastname" autoComplete="off" />
                                <i className="input-icon uil uil-at"></i>
                              </div>
                            </div>

                            <div className="form-group mt-2">
                              <input type="text" name="regphone" className="form-style" placeholder="Phone Number" id="regphone" autoComplete="off" />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>

                            <div className="form-group mt-2">
                              <input type="text" name="regemail" className="form-style" placeholder="Email" id="regemail" autoComplete="off" />
                              <i className="input-icon uil uil-user"></i>
                            </div>

                            <div className="form-group mt-2">
                              <input type="password" name="regpassword" className="form-style" placeholder="New Password" id="regpassword" autoComplete="off" />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>

                            <div className="form-group mt-2">
                              <input type="password" name="regconfirm" className="form-style" placeholder="Confirm Password" id="regconfirm" autoComplete="off" />
                              <i className="input-icon uil uil-lock-alt"></i>
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

                            <a href="#" className="btn mt-4">Submit</a>
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
