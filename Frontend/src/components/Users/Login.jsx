import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginAPI } from "../../services/users/userServices";
import AlertMessage from "../../components/Alert/AlertMessage";
import {useDispatch} from "react-redux";
import { loginAction } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

//! VALIDATIONS 

const validationSchema = Yup.object({
  email : Yup.string().email("Invaild").required("Email is required"),
  password : Yup.string().min(3,"Password must be at least 3 characters").required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch= useDispatch()
  //*MUTATION 
  const mutation=useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  })
  
  const formik=useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values)=>{
      // console.log("Values", values);
      //*http requset 
      mutation.mutateAsync(values).then((data)=>{
        // console.log("Data",data);
        dispatch(loginAction(data)); // Dispatch action from redux
        //* Save the user into localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));
        //* Reset form
        // formik.resetForm();
      }).catch((error)=>{
        console.log("Error",error);
      })
    }
  })
  // console.log("Formik",formik);
  //?REDIRECT
  useEffect(()=>{
    // if(localStorage.getItem("userInfo")){
    //   navigate("/profile")
    // }
    setTimeout(()=>{
      if(mutation.isSuccess){
        navigate("/profile")
        console.log("Profile");
        
      }
    },3000)
  }, [mutation.isSuccess, navigate])
  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Login
      </h2>
      {/* Display messages */}
      {mutation.isPending && <AlertMessage type="loading" message="login you in..."/>}
      {mutation.isError && <AlertMessage type="error" message={mutation.error?.response?.data?.message || "An error occurred"}/>}
      {mutation.isSuccess && <AlertMessage type="success" message="Successfully login..."/>}

      <p className="text-sm text-center text-gray-500">
        Login to access your account
      </p>

      {/* Input Field - Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-red-500">{formik.errors.email}</span>
        )}
      </div>

      {/* Input Field - Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;