import React, {useState} from 'react'
import { useLocation,useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

export default function EditDetails() {
    const {state} =useLocation();
    const navigate = useNavigate();
    let userEmail =state.email;

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        image: '',
        firstName: '' ,
        lastName: '' ,
        birthday: '' ,
        city: '' ,
        street: '' ,
        streetNumber: ''
      })
    
      const [errors, setErrors] = useState({})
      const regexUsername = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
      const regexPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;
    
      const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
      }

      const editUser = (e) => {
        e.preventDefault()
        const validationErrors = {}
        if(!formData.username.trim()) {
            validationErrors.username = "Username is required"
        }
        else if (formData.username.length > 60 || !regexUsername.test(formData.username)) {
            validationErrors.username = "Invalid Username"
        }
    
        
        if(!formData.password.trim()) {
            validationErrors.password = "Password is required"
        } else if(formData.password.length < 7 || formData.password.length > 12 || !regexPassword.test(formData.password)){
            validationErrors.password = "Invalid Password"
        }
    
        if(formData.confirmPassword !== formData.password) {
            validationErrors.confirmPassword = "Password not matched"
        }

        if (!formData.firstName.trim()) {
            validationErrors.firstName = "First name is required"
        }
        else if(!formData.firstName.replace(/[^a-zA-Z\s]/g, '')){
            validationErrors.firstName = "Enter text only"
        }

        if (!formData.lastName.trim()) {
            validationErrors.lastName = "Last Name is required"
        }
        else if(!formData.lastName.replace(/[^a-zA-Z\s]/g, '')){
            validationErrors.lastName = "Enter text only"
        }
        
        if(!formData.image) {
            validationErrors.image = "Image is required"
        }
        else if (/\.(jpe?g)$/i.test(formData.image.name)) {
            validationErrors.image="Invalid file type. Please select a JPEG or JPG file.";
        }

        if (!formData.birthday.trim()) {
            validationErrors.birthday = "Birthday is required";
        } else {
            const today = new Date();
            const birthDate = new Date(formData.birthday);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            // אם יומולדת המשתמש עוד לא התרחשה השנה, יש להחסיר שנה אחת מהגיל
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
        
            // אם הגיל לא חוקי (פחות מ-18 או יותר מ-120), יש להוסיף הודעת שגיאה
            if (age < 18 || age > 120) {
                validationErrors.birthday = "Invalid Birth date";
            }
        }

        if(!formData.city.trim()){
            validationErrors.city = "City is required"
        }

        if(!formData.street.trim()){
            validationErrors.street = "Street is required"
        }
        else if (!/^[\u0590-\u05FF\s]*$/.test(formData.street)) {
            validationErrors.street = "Invalid street"
        }

        if(!formData.streetNumber.trim()){
            validationErrors.streetNumber = "Street Number is required"
        }
        else if(isNaN(formData.streetNumber) || Number(formData.streetNumber) <= 0){
            validationErrors.streetNumber = "Invalid street number"
        }

    
        setErrors(validationErrors)
    
        if(Object.keys(validationErrors).length === 0) {
            console.log("Edit Submitted successfully");
            let users =JSON.parse(localStorage["Users"]);
            let currUser = users.find(u => u.username === formData.username);

            for (let i = 0; i < users.length; i++) {
                if (users[i].email === userEmail) {
                    // Update user's properties here
                    users[i].username = formData.username;
                    users[i].password = formData.password;
                    users[i].image=formData.image;
                    users[i].firstName=formData.firstName ;
                    users[i].lastName=formData.lastName;
                    users[i].birthday=formData.birthday ;
                    users[i].city=formData.city ;
                    users[i].street=formData.street;
                    users[i].streetNumber=formData.streetNumber;
                    localStorage.setItem("Users", JSON.stringify(users));

                    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
                    if (loggedInUser && loggedInUser.username !== 'admin') {
                        sessionStorage.setItem('loggedInUser', JSON.stringify(users[i]));
                    } 
                    break;
                }
              }
            setFormData({
                username: '',
                password: '',
                confirmPassword: '',
                image: '',
                firstName: '' ,
                lastName: '' ,
                birthday: '' ,
                city: '' ,
                street: '' ,
                streetNumber: ''
            });
            console.log(currUser);
            
            //אם המשתמש הפעיל כרגע הוא האדמין תחזור לדף של סיסטם אדמין אחרת לך לפרופיל
            var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
            if (loggedInUser && loggedInUser.username === 'admin') {
                navigate('/systemadmin');
            }
            else{
                navigate('/profile',{state:currUser});
            }
        }
      } 

  return (
    <div><h1><b>Edit Details</b></h1>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={editUser}
    >
      <TextField
            name='username'
            onChange={handleChange}
            required
            label="User Name"
            type="text"
            size="small"
          />
          {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
          
          
          <br/>
          <TextField
            name='password'
            onChange={handleChange}
            required
            label="Password"
            type="password"
            size="small"
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
          
          <TextField
                    name='confirmPassword'
                     onChange={handleChange}
                     required
                      label="Password Confirm"
                      type="password"
                      size="small"
                    />
                    {/* <input name='confirmPassword' type='password' onChange={handleChange}/> */}
                    {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}  
                    <br/>
          
          <TextField
            name='firstName'
            onChange={handleChange}
            required
            label="First Name"
            type="text"
            size="small"
          />
          {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
          
          <TextField
            name='lastName'
            onChange={handleChange}
            required
            label="Last Name"
            type="text"
            size="small"
          />
          {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
          <br/>

          <TextField
            name='image'
            onChange={handleChange}
            accept=".jpg, .jpeg"
            required
            id="photo"
            label="Image"
            type="file"
            size="small"
          /> 
          {errors.image && <div style={{ color: 'red' }}>{errors.image}</div>}

          <TextField
            name='birthday'
            onChange={handleChange}
            required
            label="Date of birth"
            type="date"
            size="small"
          />
          {errors.birthday && <div style={{ color: 'red' }}>{errors.birthday}</div>}
          <br/>
         
          <TextField
            name='street'
            onChange={handleChange}
            required
            label="Street Name"
            type="text"
            size="small"
        />
        {errors.street && <div style={{ color: 'red' }}>{errors.street}</div>}

          <TextField
            name='streetNumber'
            onChange={handleChange}
            required
            label="Number"
            type="number"
            size="small"
          /> 
          {errors.streetNumber && <div style={{ color: 'red' }}>{errors.streetNumber}</div>}
        <br/>

        <TextField
            name='city'
            onChange={handleChange}
            required
            label="City"
            type="text"
            size="small"
          />
          {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}
          <br/>
          <Button type="submit" variant="contained" color="primary" >Update</Button>
    </Box>   
  </div>
  )
}
