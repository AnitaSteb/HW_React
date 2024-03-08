import React, {useState} from "react"
import { useNavigate } from "react-router-dom"

export default function SystemAdmin() {
    const users = JSON.parse(localStorage["Users"]);
    const [users1, setUsers] = useState(users);
    const navigate = useNavigate();

    const DeleteUser = (e) =>{
        let mail = e.target.name;
        const updatedUsers = users1.filter(user => user.email !== mail);
        // Update state with the new array of users
        setUsers(updatedUsers);
        // Update localStorage with the new array of users
        localStorage.setItem("Users", JSON.stringify(updatedUsers));
    }

    const ShowTable = users1.map((user,index) =>
    <tr key={index} style={{borderCollapse:'collapse', border:'1px solid black',width:'100%',height:'100%'}}>
        <td style={{borderCollapse:'collapse', border:'1px solid black'}}>{user.username}</td>
        <td style={{borderCollapse:'collapse', border:'1px solid black'}}>{user.lastName}</td>
        <td style={{borderCollapse:'collapse', border:'1px solid black'}}>{user.birthday}</td>
        <td style={{borderCollapse:'collapse', border:'1px solid black'}}>{user.street}</td>
        <td style={{borderCollapse:'collapse', border:'1px solid black'}}>{user.email}</td>
        <td style={{borderCollapse:'collapse', border:'1px solid black'}}>
        <img src={user.image} alt="" style={{width:80, height:80}}/>
        </td>
        <td>
            <button name={user.email} onClick={DeleteUser}>Delete</button>
            <button onClick={(e)=>{navigate('/editdetails', {state : user})}}>Update</button>
        </td>
    </tr>
    )
  return (
    <table style={{borderCollapse:'collapse', border:'1px solid black'}}>
       <tbody>{ShowTable}</tbody>
    </table>
  )
}