import React from "react";
import { FaUserCircle, FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import UpdatePassword from "./UpdatePassword";
import { useMutation } from "@tanstack/react-query";
import { updateProfileAPI } from "../../services/users/userServices";
import AlertMessage from "../../components/Alert/AlertMessage";

const UserProfile = () => {
    const mutation=useMutation({
        mutationFn: updateProfileAPI,
        mutationKey: ["updateProfile"]
    })
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },

    //Submit
    onSubmit: (values) => {
    //   console.log(values);
    mutation.mutateAsync(values).then((data) => {
        console.log("Updated Successfully",data);
    }).catch((e) => {console.log(e);
    })
    },
  });
  const information=JSON.parse(localStorage.getItem("userInfo"))
  // console.log("information", information);
  return (
    <>
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-2 text-2xl text-center font-extrabold">
          Welcome {information.user.username}
          <span className="text-gray-500 text-sm ml-2">{information.user.email}</span>
        </h1>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Update Profile
        </h3>
 {/* Display messages */}
 {mutation.isPending && <AlertMessage type="loading" message="Updating please wait..."/>}
      {mutation.isError && <AlertMessage type="error" message={mutation.error?.response?.data?.message || "An error occurred"}/>}
      {mutation.isSuccess && <AlertMessage type="success" message="Successfully Updated..."/>}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* User Name Field */}
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-3xl text-gray-400" />
            <div className="flex-1">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                {...formik.getFieldProps("username")}
                type="text"
                id="username"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your username"
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <span className="text-xs text-red-500">
                {formik.errors.username}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-3xl text-gray-400" />
            <div className="flex-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your email"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <span className="text-xs text-red-500">
                {formik.errors.email}
              </span>
            )}
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <UpdatePassword />
    </>
  );
};

export default UserProfile;