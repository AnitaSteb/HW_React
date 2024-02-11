import React, { Component } from 'react'

 export default class CCForm extends Component {
    constructor(props){
        super(props);
        this.state={
            score:'',
            message: '',
            showPtag: {
                firstName:false,
                lastName:false
            }
        }
    }
    
    handleMouseOver = (field) => {
        this.setState((prevValues =>({
            showPtag:{...prevValues.showPtag,[field]:true}
        })));
    }
    handleMouseOut = (field) => {
        this.setState((prevValues => ({
            showPtag :{...prevValues.showPtag,[field]:false}
        })));
    }
    getScore = (e) =>{
        console.log(e.target.value);
        this.setState({score : e.target.value})
    }
    handleMouseOutScore = () => {
        const { score } = this.state;
        if (score >= 555 && score<=800) {
          this.setState({ message: "You can be accepted for studies!" });
        } else {
          this.setState({ message: "Please try again next year." });
        }
      };
   render() {
     return (
       <form>
        <label htmlFor="first_name">First Name:</label>
        <div onMouseOver={() => this.handleMouseOver('firstName')} onMouseOut={() => this.handleMouseOut('firstName')}>
          <input type="text" id="first_name" name="first_name"/>
          {this.state.showPtag.firstName && <p style={{color:'red'}}>Please enter your first name</p>}
        </div>
        <br /><br />
        

        <label htmlFor="last_name">Last Name:</label>
        <div onMouseOver={() =>this.handleMouseOver('lastName')} onMouseOut={() =>this.handleMouseOut('lastName')}>
          <input type="text" id="last_name" name="last_name"/>
          {this.state.showPtag.lastName && <p style={{color:'red'}}>Please enter your Last name</p>}
        </div>
        <br /><br />

        <label htmlFor="psychometric_score">Psychometric Score:</label>
        <input onChange={this.getScore} onMouseOut={this.handleMouseOutScore}  type="text" id="psychometric_score" name="psychometric_score" />
        {this.state.message && <p style={{ color: 'red' }}>{this.state.message}</p>}

        <br /><br />
        </form>
     )
   }
 }
    

