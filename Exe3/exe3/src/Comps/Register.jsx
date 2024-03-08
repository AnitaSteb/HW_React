import React , { useState }from 'react'
import { useNavigate } from "react-router-dom"
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Register = () => {
        const navigate = useNavigate();

        const [formData, setFormData] = useState({
          username: '',
          email: '',
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

        const cities = ["Tel Aviv", "Haifa", "Jerusalem", "Natanya", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beer Sheva", "Holon", "Bnei Brak", "Ramat Gan", "Bat Yam", "Rehovot", "Herzliya", "Kfar Saba", "Lod", "Ramla", "Beit Shemesh", "Modiin", "Nahariya", "Tiberias", "Hadera", "Ra'anana", "Acre", "Ashkelon"];
        const [city, setCity] = useState('');
        const [filteredCities, setFilteredCities] = useState(cities);

        const handleCity = (e) => {
            const { name, value } = e.target;
            setCity(value);
        
            const filtered = cities.filter(city =>
                city.toLowerCase().startsWith(value.toLowerCase())
            );
            setFilteredCities(filtered);
            setFormData({
                ...formData,
                city: value // Assuming 'city' is the key in formData that you want to update
            });
        }

        const handleImageChange = (e) => {
            const { name, value } = e.target;
    
            // For file inputs, you may want to access the files property
            // to get the selected file(s)
            const file = e.target.files[0];
             setFormData({
                 ...formData, [name]: file,
               });
    
          };
        const handleFileChange = (e) => {
            const file = e.target.files[0];
            const [SelectFile, setSelectedFile] = useState(file);
        
            // Check if a file is selected
            if (file) {
              // Check the file type
              if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                // File type is allowed
                setSelectedFile(file);
                setError('');
              } else {
                // File type is not allowed
                setSelectedFile(null);
                setError('Please select a valid JPEG or JPG file.');
              }
            }
        };

        const handleBirthdayChange = (e) => {
            const {name,value} = e.target;
            setFormData({
                ...formData, [name] : value
            })
          };

        const registerUser = (e) => {
            e.preventDefault()
            const validationErrors = {}
            if(!formData.username.trim()) {
                validationErrors.username = "Username is required"
            }
            else if (formData.username.length > 60 || !regexUsername.test(formData.username)) {
                validationErrors.username = "Invalid Username"
            }
        
            if(!formData.email.trim()) {
                validationErrors.email = "Email is required"
            } 
            // else if(!/\S+@\S+\.\S+/.test(formData.email)){
            //     validationErrors.email = "Email is not valid"
            // }
            else if(!/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{3}$/.test(formData.email)){
                validationErrors.email = "Email is not valid"
            }
        
            if(!formData.password.trim()) {
                validationErrors.password = "Password is required"
            } else if(formData.password.length < 7 || formData.password.length > 12 || !regexPassword.test(formData.password)){
                validationErrors.password = "Invalid Password"
            }
        
            if(formData.confirmPassword !== formData.password) {
                validationErrors.confirmPassword = "Password not matched"
            }

            // Check if the selected file is a JPEG or JPG
            if(!formData.image) {
                validationErrors.image = "Image is required"
            }
            else if (/\.(jpe?g)$/i.test(formData.image.name)) {
                validationErrors.image="Invalid file type. Please select a JPEG or JPG file.";
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
                console.log("Form Submitted successfully");
                if (localStorage["Users"] == undefined) {
                    var users=[];
                }
                else{
                    var users = JSON.parse(localStorage["Users"]);
                }
                let user={
                    username:formData.username,
                    email:formData.email,
                    password:formData.password,
                    confirmPassword:formData.confirmPassword,
                    image:formData.image,
                    firstName:formData.firstName ,
                    lastName:formData.lastName,
                    birthday:formData.birthday ,
                    city:formData.city ,
                    street:formData.street,
                    streetNumber:formData.streetNumber
                }
                users.push(user);
                localStorage["Users"] = JSON.stringify(users);
                setFormData({
                    username: '',
                    email: '',
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
                navigate('/');
            }
        
          }    

          return (
            <div><h1><b>Register Form</b></h1>
            <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={registerUser}
                >
            <TextField
                     name='username'
                     onChange={handleChange}
                     required
                      label="User Name"
                      type="text"
                      size="small"
                    />
                    {/* <input name='username' onChange={handleChange} type='text' /> */}
                    {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
            
                    <TextField
                    name='email'
                     onChange={handleChange}
                     required
                      label="Email"
                      type="email"
                      size="small"
                    />
                    {/* <input name='email' type='email' onChange={handleChange}/> */}
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                    <br/>
            
                    <TextField
                    name='password'
                     onChange={handleChange}
                     required
                      label="Password"
                      type="password"
                      size="small"
                    />
                    {/* <input name='password' type='password' onChange={handleChange}/> */}
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
                    {/* <input name='firstName' type='text' onChange={handleChange}/> */}
                    {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>} 
            
                    <TextField
                    name='lastName'
                     onChange={handleChange}
                     required
                      label="Last Name"
                      type="text"
                      size="small"
                    />
                    {/* <input name='lastName' type='text' onChange={handleChange}/> */}
                    {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>} 
                    <br/>
            
                    <TextField
                    name='image'
                     onChange={handleImageChange}
                     accept=".jpg, .jpeg"
                     required
                      id="photo"
                      label="Image"
                      type="file"
                      size="small"
                    />
                    {/* <input type="file" id="photo" name="image" accept=".jpg, .jpeg" onChange={handleFileChange}/> */}
                    {errors.image && <div style={{ color: 'red' }}>{errors.image}</div>} 
                    
                    <TextField
                    name='birthday'
                     onChange={handleChange}
                     required
                      label="Date of birth"
                      type="date"
                      size="small"
                    />
                    {/* <input name='birthday' type='date' onChange={handleBirthdayChange}/> */}
                    {errors.birthday && <div style={{ color: 'red' }}>{errors.birthday}</div>}
                    <br/>
            
                    {/* <TextField
                    name='city'
                     onChange={handleChange}
                     required
                      label="City"
                      type="text"
                      size="small"
                    />
                    <label>City: </label> */}
                    {/* <TextField  required name='city' list='data' size="small" label="City" type='text' value={city} onChange={handleCity} />
                    {filteredCities.length === 0 && <div style={{ color: 'red' }}>No matching cities</div>}
                    <datalist id='data'>
                    {filteredCities.map((city, index) => (
                        <option key={index} value={city} />
                    ))}
                    </datalist> */}
                    
            
                    <TextField
                    name='street'
                     onChange={handleChange}
                     required
                      label="Street Name"
                      type="text"
                      size="small"
                    />
                    {/* <input name='street' type='text' onChange={handleChange}/> */}
                    {errors.street && <div style={{ color: 'red' }}>{errors.street}</div>}
                    
                    <TextField
                    name='streetNumber'
                     onChange={handleChange}
                     required
                      label="Number"
                      type="number"
                      size="small"
                    />
                    {/* <input name='streetNumber' type='number' onChange={handleChange}/> */}
                    {errors.streetNumber && <div style={{ color: 'red' }}>{errors.streetNumber}</div>}
                    <br/>

                    <input
                    required
                    name='city'
                    list='data'
                    size="small"
                    label="City"
                    type='text'
                    placeholder='City*'
                    value={city}
                    onChange={handleCity}
                    />
                    {filteredCities.length === 0 && <div style={{ color: 'red' }}>No matching cities</div>}
                    <datalist id='data'>
                    {filteredCities.map((city, index) => (
                        <option key={index} value={city} />
                    ))}
                    </datalist>

                    {/* <input name='city' type='text' onChange={handleChange}/> */}
                    {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}
                    <br/><br/>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                    
                </Box>
               
            </div>
            
            )}
  export default  Register;
