import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { changePasswordAPI } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";
const validationSchema = Yup.object({
  password: Yup.string()
    .min(4, "Password must be at least 4 characters long")
    .required("Email is required"),
});

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const mutation=useMutation({
        mutationFn: changePasswordAPI,
        mutationKey: ["change-password"]
    })
  const formik = useFormik({
    initialValues: {
      password: "123456",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: (values) => {
      console.log(values);
      mutation.mutateAsync(values.password).then((data) => {
        console.log("Data", data);
        //*AFTER CCHANGEING PASSWORD WE CALL LOGOUT
         //Logout
         dispatch(logoutAction());
         //remove the user from storage
         console.log("wetwettrweee");
         
         localStorage.removeItem("userInfo");
      }).catch((error) => {
        console.log("Error", error);
      });
    },
  });
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Display messages */}
 {mutation.isPending && <AlertMessage type="loading" message="Updating please wait..."/>}
      {mutation.isError && <AlertMessage type="error" message={mutation.error?.response?.data?.message || "An error occurred"}/>}
      {mutation.isSuccess && <AlertMessage type="success" message="Successfully Updated..."/>}
      <h2 className="text-lg font-semibold mb-4">Change Your Password</h2>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="new-password"
          >
            New Password
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded">
            <AiOutlineLock className="text-gray-400 mr-2" />
            <input
              id="new-password"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("password")}
              className="outline-none flex-1"
              placeholder="Enter new password"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;