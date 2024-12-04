export const getUserFromStorage=()=>{
    // const userInfo=JSON.parse(localStorage.getItem("userInfo") ||null)
    // if(userInfo && userInfo.token){
    // return userInfo.token  // RETURN THE ACTUAL JWT TOKEN
    // }else{
    //   console.log("No token found in local storage")  
    //   return null // HANDLE THE CASE WHERE THERE NO TOKEN
    // }
    const token=JSON.parse(localStorage.getItem("userInfo") ||null)
    return token?.token
}

// utils.js
export function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }
