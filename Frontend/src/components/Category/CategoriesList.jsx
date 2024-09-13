import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link,useNavigate } from "react-router-dom";
import { deleteCategoryAPI, listCategoriesAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage"


const CategoriesList = () => {
    // Fetch categories data
    // const { data, isError, isLoading, isFetched, error ,refetch} = useQuery({
      const query=useQuery({
        queryFn: listCategoriesAPI,
        queryKey: ["list-categories"],
    })
    // console.log("query", query);
    const navigate=useNavigate()
    //*MUTATION
    const mutation=useMutation({
      mutationFn: deleteCategoryAPI,
      mutationKey: ["delete-category"],
    })
    //*DELETE HANDLER 
    //?according to udmey
    const handleDelete=(id)=>{
      mutation.mutateAsync(id).then((data)=>{
        console.log("delete Data",data)
        query.refetch()
      }).catch((err)=>{console.log("handle delete error",err);
      })
    }
  return (
    <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Categories</h2>
      {/* Display Message */}
      {query.isLoading && <AlertMessage type="loading" message="Loading..."/> }
      {query.isError && (
        <AlertMessage type="error" message={query.error.response.data.message} />
      )}
      <ul className="space-y-4">
        {query.data?.map((category) => (
          <li
            key={category?._id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
          >
            <div>
              <span className="text-gray-800 ">{category?.name}</span>
              <span
                className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  category.type === "income"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {category?.type?.charAt(0).toUpperCase() +
                  category?.type?.slice(1)}
              </span>
            </div>
            <div className="flex space-x-3">
              <Link to={`/update-category/${category._id}`}>
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
              </Link>
              <button
               onClick={() => handleDelete(category?._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default CategoriesList;



//!its use pasre but upper code working properly .
// import React from "react";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { Link, useNavigate } from "react-router-dom";
// import { deleteCategoryAPI, listCategoriesAPI } from "../../services/category/categoryService";
// import AlertMessage from "../Alert/AlertMessage";
// import { getUserFromStorage, parseJwt } from "../../utils/getUserFromStorage"; // Import utilities

// const CategoriesList = () => {
//     const token = getUserFromStorage(); // Get token from storage
//     const decodedToken = parseJwt(token); // Decode the token
//     const userIdFromToken = decodedToken?.id; // Extract the user ID from the token

//     console.log("Decoded User ID from Token:", userIdFromToken);

//     // Fetch categories data
//     const query = useQuery({
//         queryFn: listCategoriesAPI,
//         queryKey: ["list-categories"],
//     });

//     const navigate = useNavigate();

//     // Mutation for deleting categories
//     const mutation = useMutation({
//         mutationFn: deleteCategoryAPI,
//         mutationKey: ["delete-category"],
//     });

//     // Handle delete action
//     const handleDelete = async (id) => {
//         console.log("Deleting category with ID:", id);
//         try {
//             await mutation.mutateAsync(id);
//             console.log("Category deleted successfully");
//             // Optionally refetch the list after deleting
//             query.refetch();
//         } catch (error) {
//             console.error("Error deleting category:", error);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Categories</h2>
//             {/* Display loading or error messages */}
//             {query.isLoading && <AlertMessage type="loading" message="Loading..." />}
//             {query.isError && (
//                 <AlertMessage type="error" message={query.error.response?.data?.message || "Error"} />
//             )}
//             <ul className="space-y-4">
//                 {query.data?.map((category) => (
//                     <li
//                         key={category?._id}
//                         className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
//                     >
//                         <div>
//                             <span className="text-gray-800">{category?.name}</span>
//                             <span
//                                 className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                                     category.type === "income"
//                                         ? "bg-green-100 text-green-800"
//                                         : "bg-red-100 text-red-800"
//                                 }`}
//                             >
//                                 {category?.type?.charAt(0).toUpperCase() + category?.type?.slice(1)}
//                             </span>
//                         </div>
//                         <div className="flex space-x-3">
//                             <Link to={`/update-category/${category._id}`}>
//                                 <button className="text-blue-500 hover:text-blue-700">
//                                     <FaEdit />
//                                 </button>
//                             </Link>
//                             <button
//                                 onClick={() => handleDelete(category?._id)}
//                                 className="text-red-500 hover:text-red-700"
//                             >
//                                 <FaTrash />
//                             </button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default CategoriesList;
