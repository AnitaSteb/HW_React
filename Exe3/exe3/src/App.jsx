import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Comps/Register'
import Login from './Comps/Login'
import Profile from './Comps/Profile'
import {Link, Route, Routes} from 'react-router-dom'
import EditDetails from './Comps/EditDetails'
import SystemAdmin from './Comps/SystemAdmin'


function App() {
  const [Users, setUsers] = useState([]);
  const [User, setUser] = useState({});

  const getUser=(user) =>{
    //console.log(user);
    setUser(user);
  }

  useEffect(() => {
    // Check if the data exists in localStorage
    const storedData = localStorage.getItem('Users');

    // If Users exists, parse it and set the state
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUsers(parsedData);
    }
  }, []);

  

  return (
    <>
    <div>
      <Link to="/"> Login |</Link>
      <Link to="/register"> Register</Link>
    </div>
    <Routes>
      <Route path="/" element={<Login sendUsers={Users} sendUserToApp={getUser}/>}/>
      <Route path="/register" element={ <Register/>}/>
      <Route path="/profile" element={ <Profile/>}/>
      <Route path='/editDetails' element ={<EditDetails/>}/>
      <Route path="/systemadmin" element={ <SystemAdmin/>}/>
    </Routes>
    </>
  )
}

export default App
