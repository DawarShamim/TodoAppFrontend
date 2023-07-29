import jwt_decode from "jwt-decode";

// const baseURL = 'https://enchanting-ruby-nightingale.cyclic.app/';
const baseURL = 'http://localhost:8080/';


function getToken() {
  // Get token from local storage
  const tokenFromLocalStorage = localStorage.getItem('web-token');
  return tokenFromLocalStorage || '';
}

function saveToken(token) {
  // Save token in local storage
  localStorage.setItem('web-token', token);
}

function decodeToken() {
    const token = getToken();
    if (!token) {
      return '';
    }
    try {
      const decoded = jwt_decode(token);
      const userID = decoded.user_id;
      const username = decoded.username;
      return { userID, username };
    } catch (error) {
      return '';
    }
  }
  
  function logout(navigate) {
    localStorage.removeItem('web-token');
    navigate('/');
  }
  function config_header(){
    const authtoken= getToken();

    const req_header = {
      headers: {
        Authorization: `Bearer ${authtoken}`
      }
    }; 
    return req_header;
  }
   
  
  export { saveToken, decodeToken, logout, getToken, baseURL,config_header};

 

 
  // baseURL+api/Task/changeStatus/task_id;

  // {
  //   "title": "Updated Task Title",
  //   "description": "Updated task description",
  //   "dueDate": "2023-07-31",
  //   "priority": "high"
  // }


  // api/User/updatePassword;
  // {
  //   "oldPassword": "7272ammi",
  //   "newPassword": "ammi7272"
  // }


  // http://localhost:8080/api/User/updateProfile;
  // {
  //   "firstName": "John",
  //   "lastName": "Doe",
  //   "dateOfBirth": "1990-01-01"
  // }
  
  






  




