import { BASE_URL } from "../../utils/url";
import axios from "axios"
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const token=getUserFromStorage()
//! Login API Call
export const loginAPI=async ({email,password})=>{
    const response = await axios.post(`${BASE_URL}/users/login`,
        { email, password},
        // { headers: { "Content-Type": "application/json" } },
    );
    return response.data
}

//! Register API Call
export const registerAPI=async ({email,password,username})=>{
    const response=await axios.post(`${BASE_URL}/users/register`,{email,password,username})
    //*RETURN A PROMISE
    return response.data
}

//! CHANGE PASSWORD
export const changePasswordAPI=async (newPassword)=>{
    const response=await axios.put(`${BASE_URL}/users/change-password`,{newPassword},{headers:{Authorization:`Bearer ${token}`}})
    //*RETURN A PROMISE
    return response.data
}

//! UPDATE PROFILE
export const updateProfileAPI=async ({username,email})=>{
    const response=await axios.put(`${BASE_URL}/users/update-profile`,{username,email},{headers:{Authorization:`Bearer ${token}`}})
    //*RETURN A PROMISE
    return response.data
}