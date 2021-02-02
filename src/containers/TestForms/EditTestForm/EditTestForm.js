import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import classes from './EditTestForm.module.css';
import Alert from '../../../components/UI/Alert/Alert';

class TestForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        testOrgId: "",
        id: "",
        description: "",
        tds: "",
      }
    }

    this.handleTdsChange = this.handleTdsChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ok = this.ok.bind(this);
  }

  ok(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }

  componentDidMount() {
    // parse query from URL string
    const query = new URLSearchParams(this.props.location.search);
    const data = {};
    for (let param of query.entries()) {
      // ['itemType', 'TST']
      data[param[0]] = param[1];
    }
    this.setState({data: data});
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

  handleSubmit(event) {
    // prevent default submit action
    event.preventDefault();
    if (this.state.data.description === "" || this.state.data.tds === "")
    {
      Alert("One or more required fields are missing.")
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
    // store editable data in new object
    const newData = {
      description: this.state.data.description,
      tds: this.state.data.tds
    };
    // store value of id
    const itemToEdit = this.state.data.id;

    // make api call to update data
    axios.patch(`/tests/${itemToEdit}`, newData)
         // if request is successful, redirect to manage tests
         .then(res => {
           if (res.status === 200) {
            this.props.history.push('/manage-tests')
           } 
         })
         // else, display error
         .catch(error => Alert(error))    
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
    
    const uneditabletextbxstyle = {
      width: "70%",
      padding: "12px 20px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
      display: "inline-block",
      backgroundColor: "#f2f2f2"
    }

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
        {/* This is the html code for the custom alert window */}
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
          onClick={this.ok}>OK
          </button>
          </div>
      </div>
      </div>
        <main className={classes.main}>
          <h1 className={classes.header}>Edit Test</h1>
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
                          style={uneditabletextbxstyle} 
                          type="text" 
                          id="testOrgId" 
                          name="testOrgId"
                          readOnly
                          value={this.state.data.testOrgId}
                          onChange={this.handleTestOrgIdChange}
                          onBlur={this.formValChange} 
                        />
                        <br/>
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
                          style={uneditabletextbxstyle}  
                          type="text" 
                          id="id" 
                          name="id"
                          readOnly
                          value={this.state.data.id} 
                          onChange={this.handleIdChange}
                          onBlur={this.formValChange} 
                        />
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
                          value={this.state.data.description} 
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
                          value={this.state.data.tds}
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