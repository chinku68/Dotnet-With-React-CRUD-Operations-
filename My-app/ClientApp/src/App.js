import React from 'react'
import SignUp from './components/Account/SignUp'
import CreateEmployee from './components/Account/Emo'
import EmployeeList from './components/Counter'
import EditEmployee from './components/Account/UpdateEmployee'

const App = () => {
  return (
    <div>
      {/* <SignUp/> */}
      <CreateEmployee/>
      <EmployeeList/>
      {/* <EditEmployee/> */}
    </div>
  )
}

export default App