import React, {Component} from 'react';

import classes from './UserForm.module.css';

class UserForm extends Component {

  render () {
    const labelstyle = {
      color: "#3cB650",
	    fontFamily: "sans-serif",
      fontWeight: "400",
      padding: "20px",
      position: "relative",
      textRendering: "optimizeLegibility",
      display: "inline-block",
      width: "70%"
    };
  
    const textbxstyle = {
      width: "90%",
      padding: "12px 20px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
      display: "inline-block"
    }; 

    const textbxstyle2 = {
      width: "70%",
      padding: "12px 20px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
      display: "inline-block"
    }; 

    const buttonstyle = {
      backgroundColor: "#4CAF50",
      border: "none",
      color: "white",
      padding: "10px 22px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      fontSize: "16px",
      margin: "4px 2px",
      cursor: "pointer",
      borderRadius:"30px",
    };

    const textbxstyle4 = {
      width: "93%",
      padding: "12px 20px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
      display: "inline-block"
    }; 

    return (
      <div>
        <main className={classes.main}>
            <h1 className={classes.header}>Add User</h1>
          <form className={classes.wrapper}>
              <fieldset>
                <div className={classes.flexChild}>
                <table>
                  <tr >
                  <td className={classes.cell10} style={{textAlign:"right"}}><label for="userid" style={labelstyle}> User ID:</label></td>
                  <td className={classes.cell11} style={{textAlign:"left"}}><input style={textbxstyle4} type="text" id="userid" name="userid"/></td>
                  <td className={classes.cell12} style={{textAlign:"right"}}><label for="userid" style={labelstyle}></label></td>
                  <td className={classes.cell13} style={{textAlign:"left"}}></td>
                  </tr>
                  </table>
                  <hr></hr>
                </div>
              
              <div className={classes.flexChild}>
                <br/>
              <table>
            
                <tr ><td id={classes.cell1}  style={{textAlign:"right"}} ><label for="fname" style={labelstyle}>First Name:</label></td>
                <td className={classes.cell2} style={{textAlign:"left", width:"30%"}}><input style={textbxstyle} type="text" id="fname" name="fname"/></td>
                </tr>
            
                <tr ><td className={classes.cell1} style={{textAlign:"right"}}><label for="lname" style={labelstyle}>Last Name:</label></td>
                <td className={classes.cell2} style={{textAlign:"left"}}><input style={textbxstyle} type="text" id="lname" name="lname"/></td>
                </tr>

                <tr ><td className={classes.cell1} style={{textAlign:"right"}}><label for="email" style={labelstyle}>Email:</label></td>
                <td className={classes.cell2} style={{textAlign:"left"}}><input style={textbxstyle} type="text" id="email" name="email"/></td>
                </tr>

                <tr><td className={classes.cell1} style={{textAlign:"right"}}><label for="phone" style={labelstyle}>Phone:</label></td>
                <td className={classes.cell2} style={{textAlign:"left"}}><input style={textbxstyle} type="text" id="phone" name="phone"/></td>
                </tr>

                <tr><td className={classes.cell1} style={{textAlign:"right"}}><label for="picture" style={labelstyle}>Profile Picture:</label></td>
                <td className={classes.cell2} style={{textAlign:"left"}}><input type="file" id="picture" name="picture" accept="image/*"></input></td>
                </tr>

                </table> 
                
                </div>
                <div className={classes.flexChild}>
                  <br/>
                <table>

            
                <tr><td className={classes.cell3} style={{textAlign:"right"}}><label for="street" style={labelstyle}>Street:</label></td>
                <td className={classes.cell4} style={{textAlign:"left"}}><input style={textbxstyle2} type="text" id="street" name="street"/></td>
                </tr>

                <tr><td className={classes.cell3} style={{textAlign:"right"}}><label for="city" style={labelstyle}>City:</label></td>
                <td className={classes.cell4} style={{textAlign:"left"}}><input style={textbxstyle2} type="text" id="city" name="city"/></td>
                </tr>

                <tr><td className={classes.cell3} style={{textAlign:"right"}}><label for="state" style={labelstyle}>State/Province:</label></td>
                <td className={classes.cell4} style={{textAlign:"left"}}><input style={textbxstyle2} type="text" id="state" name="state"/></td>
                </tr>

                <tr><td className={classes.cell3} style={{textAlign:"right"}}><label for="zip" style={labelstyle}>Zip Code:</label></td>
                <td className={classes.cell4} style={{textAlign:"left"}}><input style={textbxstyle2} type="text" id="zip" name="zip"/></td>
                </tr>

                <tr><td className={classes.cell3} style={{textAlign:"right"}}><label for="country" style={labelstyle}>Country:</label></td>
                <td className={classes.cell4} style={{textAlign:"left"}}><input style={textbxstyle2} type="text" id="country" name="country"/></td>
                </tr>

                </table>
                </div>
                <div className={classes.flexChild}>
                  <table>
                  <tr>
                  <td className={classes.cell7} style={{textAlign:"right", paddingRight: "2%"}}><button style={buttonstyle}>Edit</button></td>
                  <td className={classes.cell8} style={{textAlign:"left", paddingLeft: "2%"}}><button style={buttonstyle}>Add</button></td>
                  {/* <td className={classes.cell9} style={{textAlign:"left"}}><button style={buttonstyle}>Submit</button></td> */}
                  </tr>
                  </table>
                </div>
          </fieldset>
          </form>
        </main>
      </div>
    );
  }
}

export default UserForm;