import React from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Profile(props) {
  const {state} = useLocation();
  const navigate = useNavigate();


  if (!state) {
    // Handle the case where state is null or undefined, for example, redirect to an error page or a default route
    navigate('/');
    return null;
  }
  const { firstName, lastName, email, street, streetNumber, city } = state;


  const logoutUser = (userEmail)=>{
    // Retrieve the logged-in user from sessionStorage
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    
    // Check if loggedInUserString is not null
    if (loggedInUserString) {
        const loggedInUser = JSON.parse(loggedInUserString);
        
        // Check if the email matches the userEmail parameter
        if (userEmail === loggedInUser.email) {
            sessionStorage.removeItem('loggedInUser');
            navigate('/');
        }
    }
  }

  return (
    
    <div>
    <br/>
     <Card sx={{ maxWidth: 345 }}>
      <img
      src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
      alt="Your Image"
      style={{ width: '150px', height: '150px' }}
    />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {firstName} {lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {email}<br/>
        {street} {streetNumber}, {city} 
        <br/>
        </Typography>
      </CardContent>
      <CardActions 
     sx={{
      alignSelf: "stretch",
      display: "flex",
      justifyContent: "center", // Center horizontally
      alignItems: "center",     // Center vertically
      marginTop: "auto",       // Move it from the bottom
      p: 2,
    }}>
        <Button size="small" variant="contained" color="error" onClick={() => logoutUser(email)}>Logout</Button>
        <Button size="small" variant="contained" color="success"  onClick={()=>window.location.replace("https://games.yo-yoo.co.il/games_play.php?game=5772")}>Game</Button>
        <Button size="small" variant="contained" color="primary" onClick={()=> navigate('/editDetails', {state})}>Edit Profile</Button>
      </CardActions>
    </Card>
    </div>
  )
}
