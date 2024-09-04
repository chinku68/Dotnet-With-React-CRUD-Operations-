import React from 'react'
import Header from './Header'
import SignUp from './Account/SignUp'
import Products from './Products/GetProducts';

const Home = ({ User }) => {
  console.log("User in Home component: ", User);
  let user = User;
  return (
    <div>
      <Header User={user} />
      <Products />
    </div>
  )
}

export default Home;
