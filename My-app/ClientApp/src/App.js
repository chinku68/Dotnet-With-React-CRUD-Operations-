import React, { useEffect, useState } from 'react'
import SignUp from './components/Account/SignUp'
import CreateEmployee from './components/Account/Emo'
import { Route, Routes } from 'react-router-dom';
import EditEmployee from './components/Account/UpdateEmployee'
import Home from './components/Home';
import { useNavigate } from 'react-router-dom';
import EmployeeList from './components/Account/UpdateEmployee';
import Login from './components/Account/LogIn';
import PostProduct from './components/Products/PostProduct';
import CartItems from './components/Products/Cart';
import UserProfile from './components/Account/UserProfile';
import { AddToFav } from './components/Products/GetProducts';
import FavouriteList from './components/Products/Favlist';

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // const [cartItem, setCartItem] = useState([]);

    // const handleCartItemsChange = (items) => {
    //     setCartItem(items);
    // };
    const storedUserDetails = sessionStorage.getItem("UserDetails");
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      console.log(userDetails);
      setUser(userDetails);

    }
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("UserId");
    sessionStorage.removeItem("UserName");
    sessionStorage.removeItem("UserDetails");
    setUser(null);
    alert("Logged out sucessfully")
    navigate('/');
  };
  const handlePPost = () => {
    navigate("/PostProduct")
  }

  let User = user;
  console.log("User state: ", User);
  return (
    <div>

    <Routes>
        <Route path="/EmployeeList" element={<EmployeeList />}></Route>
        <Route path="/" element={<Home User={User} />}></Route>
        < Route path="/signup" element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/CreateEmployee' element={<CreateEmployee />} />
        <Route path='/Cart' element={<CartItems />} />
        {/* onCartItems={handleCartItemsChange}  */}
        <Route path='/UserProfile' element={<UserProfile User={User} />} />
        <Route path='/PostProduct' element={<PostProduct User={User} />} />
        <Route path='/FavList' element={<FavouriteList/>} />
      </Routes>
      <>
      <div>{user ?<button onClick={handleLogout}>Logout</button>: <></>}</div>

        {user &&user.type=="Admin"?<button onClick={handlePPost}>Post</button>:<></>}
          
      </>
    </div>
  )
}

export default App