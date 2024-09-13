import { BrowserRouter,Route,Routes } from "react-router-dom"
import HeroSection from "./components/Home/HomePage"
import PublicNavbar from "./components/Navbar/PublicNavbar"
import LoginForm from "./components/Users/Login"
import RegisterForm from "./components/Users/Register"
import PrivateNavbar from "./components/Navbar/PrivateNavbar"
import { getUserFromStorage } from "./utils/getUserFromStorage"
import { useSelector } from "react-redux"
import AddCategory from "./components/Category/AddCategory"
import CategoriesList from "./components/Category/CategoriesList"
import UpdateCategory from "./components/Category/UpdateCategory"
import TransactionForm from "./components/Transactions/TransactionForm"
import Dashboard from "./components/Users/Dashboard"
import UserProfile from "./components/Users/UserProfile"
import AuthRoute from "./components/Auth/AuthRoute"
function App() {
  //*GET THE TOKEN 
  // const token = getUserFromStorage()  //get the token from the local storage
  // console.log("Token", token);
  const user= useSelector((state)=>  //get the user from the redux store
  // console.log("state",state)
  state?.auth?.user
  )
  // console.log("user",user);
  return (

    <>
    <BrowserRouter>
    {/*Navbar */}
    {user ? <PrivateNavbar/> : <PublicNavbar/>}
    <Routes>
      <Route path="/" element={<HeroSection/>}/>
      <Route path="/login" element ={<LoginForm/>}/>
      <Route path="/register" element ={<RegisterForm/>}/>
      <Route path="/add-category" element={
        <AuthRoute>
          <AddCategory/>
        </AuthRoute>
      }/>
      <Route path="/categories" element={
        <AuthRoute>
          <CategoriesList/>
        </AuthRoute>
      }/>
      <Route path="/update-category/:id" element={
        <AuthRoute>
          <UpdateCategory/>
        </AuthRoute>
      }/>
      <Route path="/add-transaction" element={
        <AuthRoute>
          <TransactionForm/>
        </AuthRoute>
      }/>
      <Route path="/dashboard" element={
        <AuthRoute>
          <Dashboard/>
        </AuthRoute>
      }/>
      <Route path="/profile" element={
        <AuthRoute>
          <UserProfile/>
        </AuthRoute>
      }/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
