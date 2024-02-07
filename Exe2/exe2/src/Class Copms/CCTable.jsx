import React, { Component } from 'react'

export default class CCTable extends Component {
    constructor(props){
        super(props);
        this.state={
            width:'100%'
        }
    }
    click = () =>{
        console.log('click');
    }

  render() {
    return (
      <div>
        <table onClick={this.click} onDoubleClick={this.doubleClick} style={{width:this.state.width, border: '1px solid black'}}>
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
