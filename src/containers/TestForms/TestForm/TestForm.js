import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import classes from './TestForm.module.css';
import Alert from  '../../../components/UI/Alert/Alert'

class TestForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        testOrgId: "",
        id: "",
        description: "",
        tds: "",
      },
    }
    
    this.handleTestOrgIdChange = this.handleTestOrgIdChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleTdsChange = this.handleTdsChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.testOrgIdVal = this.testOrgIdVal.bind(this);
    this.idVal = this.idVal.bind(this);
    this.descriptionVal = this.descriptionVal.bind(this);
    this.tdsVal = this.tdsVal.bind(this);
    this.ok = this.ok.bind(this);
  }

  ok(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }

  //whenever a change is made to an input field, update the corresponding state property

  handleTestOrgIdChange(event) {
    let data = {...this.state.data};
    data.testOrgId = event.target.value
    this.setState({data});
  }

  handleIdChange(event) {
    let data = {...this.state.data};
    data.id = event.target.value
    this.setState({data});
  }

  handleDescriptionChange(event) {
    let data = {...this.state.data};
    data.description = event.target.value
    this.setState({data});
  }

  handleTdsChange(event) {
    let data = {...this.state.data};
    data.tds = event.target.value
    this.setState({data});
  }
    
  testOrgIdVal(event) {
    if (event.target.value === ""){
      document.getElementById("testOrgIdErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("testOrgIdErrMsg").innerHTML=""
      }
  }

  idVal(event) {
    if (event.target.value === ""){
      document.getElementById("idErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("idErrMsg").innerHTML=""
      }
  }

  descriptionVal(event) {
    if (event.target.value === ""){
      document.getElementById("descriptionErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("descriptionErrMsg").innerHTML=""
      }
  }

  tdsVal(event) {
    if (event.target.value === ""){
      document.getElementById("tdsErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("tdsErrMsg").innerHTML=""
      }
  }


  handleSubmit(event) {
    // prevent default submit action
    event.preventDefault();

    if (this.state.data.testOrgId === "" || this.state.data.id === "" || this.state.data.description === "" || this.state.data.tds === "")
    {
      Alert("One or more required fields are missing.")

        if (this.state.data.testOrgId === "" ){
          document.getElementById("testOrgIdErrMsg").innerHTML="Required"
          }
          else{
          document.getElementById("testOrgIdErrMsg").innerHTML=""
          }
      
        if (this.state.data.id === "" ){
          document.getElementById("idErrMsg").innerHTML="Required"
          }
          else{
          document.getElementById("idErrMsg").innerHTML=""
          }
      
        if (this.state.data.description === ""){
          document.getElementById("descriptionErrMsg").innerHTML="Required"
          }
          else{
          document.getElementById("descriptionErrMsg").innerHTML=""
          }

        if (this.state.data.tds === ""){
          document.getElementById("tdsErrMsg").innerHTML="Required"
          }
          else{
          document.getElementById("tdsErrMsg").innerHTML=""
          }
      }
    
    else {
    // distribute data stored in state into new object
    const formData = {...this.state.data}

    // make api call to post data
    axios.post('/tests', formData)
        // if request is successful, redirect to confirmation page
        .then(res => {
          if (res.status === 200) {
            this.props.history.push('/add-test-confirmation')
          }
        })
        // else, display error
        .catch(error => Alert(error))    
    }
  }

  render () {
    const labelstyle = {
      color: "#3cB650",
      fontFamily: "sans-serif",
      fontWeight: "400",
      padding: "20px 75px 20px 0",
      position: "relative",
      textRendering: "optimizeLegibility",
      display: "inline-block",
      width: "100%"
      };
  
    const textbxstyle = {
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
      margin: "1rem 0 1.5rem 0",
      cursor: "pointer",
      borderRadius:"30px",
    };
  

    return (
      <div>
      {/* This is the html code for the custom alert window. */}
      <div 
      className={classes.dialogoverlay} 
      id ="dialogoverlay">
      </div>
      <div 
      className= {classes.dialogbox}
       id="dialogbox">
      <div>
          <div 
          className={classes.dialoghead} 
          id="dialogboxhead">
          </div>
          <div 
          className={classes.dialogbody} 
          id="dialogboxbody">
          </div>
          <div 
          className={classes.dialogfoot} 
          id="dialogboxfoot">
          <button 
          className={classes.alertbutton} 
          onClick={this.ok}>OK</button>
        </div>
      </div>
      </div>
        <main className={classes.main}>
          <h1 className={classes.header}>Add Test</h1>
          <form className={classes.wrapper} onSubmit={this.handleSubmit}>
            <fieldset>
              <div className={classes.flexChild}>
                <br/>
                <table>
                  <tbody>
                    <tr>
                      <td 
                        className={classes.cell1} 
                        style={{textAlign:"right"}}
                      >
                        <label 
                          htmlFor="testOrgId" 
                          style={labelstyle}
                        >Organization ID:
                        </label>
                      </td>
                      <td 
                        className={classes.cell2} 
                        style={{textAlign:"left"}}
                      >
                        <input 
                          style={textbxstyle} 
                          type="text" 
                          id="testOrgId" 
                          name="testOrgId"
                          value={this.state.testOrgId}
                          onChange={this.handleTestOrgIdChange}
                          onBlur={this.testOrgIdVal} 
                        />
                        <br/>
                        <span 
                          id="testOrgIdErrMsg"
                          style={{color:"red"}}>                          
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td 
                        className={classes.cell1} 
                        style={{textAlign:"right"}}
                        >
                        <label 
                          htmlFor="id" 
                          style={labelstyle}
                        >Test ID:
                        </label>
                      </td>
                      <td 
                        className={classes.cell2} 
                        style={{textAlign:"left"}}
                      >
                        <input
                          style={textbxstyle}  
                          type="text" 
                          id="id" 
                          name="id"
                          value={this.state.id} 
                          onChange={this.handleIdChange}
                          onBlur={this.idVal} 
                        />
                        <br/>
                        <span 
                          id="idErrMsg"
                          style={{color:"red"}}>
                        </span>
                      </td>
                    </tr>
                    <tr >
                      <td 
                        className={classes.cell1}  
                        style={{textAlign:"right"}}
                      >
                        <label 
                          htmlFor="description" 
                          style={labelstyle}
                        >Description:
                        </label>
                      </td>
                      <td 
                        className={classes.cell2} 
                        style={{textAlign:"left", width:"30%"}}
                      >
                        <input
                          style={textbxstyle} 
                          type="text" 
                          id="description" 
                          name="description"
                          value={this.state.description} 
                          onChange={this.handleDescriptionChange}
                          onBlur={this.descriptionVal} 
                        />
                        <br/>
                        <span 
                          id="descriptionErrMsg"
                          style={{color:"red"}}>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td 
                        className={classes.cell1} 
                        style={{textAlign:"right"}}
                      >
                        <label 
                          htmlFor="tds" 
                          style={labelstyle}
                        >Test Delivery System:
                        </label>
                      </td>
                      <td 
                        className={classes.cell2} 
                        style={{textAlign:"left"}}
                      >
                        <input
                          style={textbxstyle} 
                          type="text" 
                          id="tds" 
                          name="tds"
                          value={this.state.tds}
                          onChange={this.handleTdsChange}
                          onBlur={this.tdsVal}
                        />
                        <br/>
                        <span 
                          id="tdsErrMsg"
                          style={{color:"red"}}>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table> 
              </div>
              <div className={classes.flexChild}>
                <table>
                  <tbody>
                    <tr>
                      <td 
                        className={classes.cell8} 
                        style={{textAlign:"center", paddingLeft: "2%", paddingTop:"2%"}}
                      >
                        <input
                          style={buttonstyle}
                          type="submit"
                          value="Submit"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
          </form>
        </main>
      </div>
    );
  }
}

export default withRouter(TestForm);