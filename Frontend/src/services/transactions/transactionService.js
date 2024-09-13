import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { BASE_URL } from "../../utils/url";
import axios from "axios"


const token=getUserFromStorage()
//!ADD TRANSACTION API 
export const addTransactionAPI=async ({type,category,amount,date,description})=>{
    const response = await axios.post(`${BASE_URL}/transactions/create`,
        { type,category,amount,date,description},
        { headers: { Authorization : `Bearer ${token}` } },
    );
    return response.data
}

//!LISTS

export const listTransactionsAPI=async ({category,startDate,type,endDate})=>{
    const response=await axios.get(`${BASE_URL}/transactions/lists`,
        {
            params:{category,startDate,type,endDate},
            headers:{Authorization:`Bearer ${token}`}
        })
    return response.data
}