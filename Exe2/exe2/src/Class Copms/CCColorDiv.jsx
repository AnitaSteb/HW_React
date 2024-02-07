import React, { Component } from 'react'

export default class CCColorDiv extends Component {
    constructor(props){
        super(props);
        this.state={
            backgroundColor:''
        }
    }
    btnColor = (e) =>{
        this.setState({backgroundColor:e})
    }
  render() {
    return (
      <div style={{
        backgroundColor:this.state.backgroundColor,
        padding:50
        }}>
      {/* יש סוגרים לפני הפונקציה כי 
      אנחנו רוצים שרק ברגע שממש נלחץ על 
      הפונקציה השינוי יקרה ולא לפני, 
      אם לא נעשה את זה הוא כל הזמן יעשה סט-סטייט */}
        <button onClick={()=>this.btnColor('Red')}>Red</button>
        <button onClick={()=>this.btnColor('Orange')}>Orange</button>
        <button onClick={()=>this.btnColor('Yellow')}>Yellow</button>
        <button onClick={()=>this.btnColor('Green')}>Green</button>
        <button onClick={()=>this.btnColor('Blue')}>Blue</button>
        <button onClick={()=>this.btnColor('Purple')}>Purple</button>
        <button onClick={()=>this.btnColor('Pink')}>Pink</button>
        <button onClick={()=>this.btnColor('Brown')}>Brown</button>
      </div>
    )
  }
}
