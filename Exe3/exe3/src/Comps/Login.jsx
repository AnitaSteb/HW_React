import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login(props) {
    const [formData, setFormData] = useState({
          username: '',
          password: ''
        })

    const navigate = useNavigate();
      
    const [errors, setErrors] = useState({})
    const regexUsername = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    const regexPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
    }

    const handleSubmit = (e) => {
        if (formData.username === "admin" && formData.password === 'ad12343211ad') {
            console.log("Successfully Loged as Admin!");
            navigate('/systemadmin');
            sessionStorage.setItem('loggedInUser', JSON.stringify({username:"admin"}));
        }

        else{    
            e.preventDefault()
            const validationErrors = {}

            //מעבר על הלוקאל סטורג וחיפוש אחר השם משתמש
            let usernameInList = props.sendUsers.find(
                user => user.username === formData.username
            );

            if(!formData.username.trim()) {
                validationErrors.username = "Username is required"
            }
            else if (formData.username.length > 60 || !regexUsername.test(formData.username)) {
                validationErrors.username = "Invalid Username"
            }
            //אם לא קיים במערך המתשמשים משתמש עם השם הזה, תחזור שגיאה
            else if (!usernameInList) {
                validationErrors.username = "Username not found"
            }
            else{
                console.log(usernameInList.username);
            }
        


            let passwordInList = props.sendUsers.find(
                user => user.username === formData.username && user.password === formData.password
            );

            if(!formData.password.trim()) {
                validationErrors.password = "Password is required"
            } else if(formData.password.length < 7 || formData.password.length > 12 || !regexPassword.test(formData.password)){
                validationErrors.password = "Invalid Password"
            }
            //אם הסיסמה לא תואמת את השם משתמש, תחזור שגיאה
            else if (!passwordInList) {
                validationErrors.password = "Password is incorrect"
            }
            else{
                console.log(usernameInList.password);
            }

            setErrors(validationErrors)
        
            if(Object.keys(validationErrors).length === 0) {
                console.log("Successfully Loged!");
                props.sendUserToApp(usernameInList);
                let user = props.sendUsers.find(
                u => u.username === formData.username && u.password === formData.password
                );
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                navigate('/profile',{state:user});
            }
        
        }}
  return (
    <div><h1><b>Login Form</b></h1>
    <form onSubmit={handleSubmit}>
        <TextField
            id="outlined-Username-input"
            label="User Name*"
            type="text"
            size="small"
            autoComplete="current-password"
            name='username' 
            onChange={handleChange}
        />
        <br/>{errors.username && <span>{errors.username}</span>}<br/>
        <TextField
            id="outlined-password-input"
            label="Password*"
            type="password"
            size="small"
            autoComplete="current-password"
            name='password' 
            onChange={handleChange}
        />
        
        <br/>{errors.password && <span>{errors.password}</span>} 
        <br/>
        
        <Button type="submit" variant="contained" color="primary">Login</Button>
    </form>
    </div>
  )
}
