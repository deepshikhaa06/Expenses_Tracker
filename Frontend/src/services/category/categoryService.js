import { parseJwt,getUserFromStorage } from "../../utils/getUserFromStorage";
import { BASE_URL } from "../../utils/url";
import axios from "axios"

const token=getUserFromStorage()

//! ADD
export const addCategoryAPI=async ({name,type})=>{
    const response = await axios.post(`${BASE_URL}/categories/create`,
        { name, type},
        { headers: { Authorization : `Bearer ${token}` } },
    );
    console.log("API Response:", response.data);
    return response.data
}

//! LISTS API Call
export const listCategoriesAPI=async ()=>{
    const response=await axios.get(`${BASE_URL}/categories/lists`,
        { headers: { Authorization : `Bearer ${token}` } },
    )
    //*RETURN A PROMISE
    return response.data
}

//! UPDATE API 
                    //*ID OF THE CATEGORY
export const updateCategoryAPI=async ({id,name,type})=>{
    const response = await axios.put(`${BASE_URL}/categories/update/${id}`,
        { name, type},
        { headers: { Authorization : `Bearer ${token}` } },
    );
    return response.data
}


//!DELETE
export const deleteCategoryAPI = async (id) => {
    const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //Return a promise
    return response.data;
};
