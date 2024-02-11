import React, { Component } from 'react'

export default class CCTable2 extends Component {
    constructor(props) {
        super(props);
        // הגדרת ה- state ההתחלתי עם רוחב 100%
        this.state = {
          width: '100%'
        };
      }
     // פונקציה שמקבלת אירוע לחיצה ומעדכנת את ה- state ל- 50%
    handleClick = (event) => {
        this.setState({
        width: '50%'
        });
    }

    // פונקציה שמקבלת אירוע לחיצה כפולה ומעדכנת את ה- state ל- 100%
    handleDoubleClick = (event) => {
        this.setState({
        width: '100%'
        });
    }


  render() {
     // השמת הרוחב הנוכחי למשתנה
     const currentWidth = this.state.width;
     // יצירת סגנון לטבלה שמשתמש ברוחב הנוכחי
     const tableStyle = {
       width: currentWidth,
       border: '1px solid black'
     };
     // החזרת הטבלה בתוך JSX עם האירועים המתאימים
 
    return (
      <div>
        <table style={tableStyle} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
        <tr>
                <td>a</td>
                <td>b</td>
                <td>c</td>
            </tr>
            <tr>
                <td>d</td>
                <td>e</td>
                <td>f</td>
            </tr>
        </table>
      </div>
    )
  }
}
