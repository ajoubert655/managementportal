import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

import classes from './OrgForm.module.css';
import Accordion from '../../components/Accordion/Accordion';
import Accordion2 from '../../components/Accordion/Accordion2';
import Accordion3 from '../../components/Accordion/Accordion3';
import Accordion4 from '../../components/Accordion/Accordion4';
import Accordion5 from '../../components/Accordion/Accordion5';
import Alert from '../../components/UI/Alert/Alert';

class OrgForm extends Component {
  constructor() {
    super();
    this.state = {
          description: '',
          id: '',
          itemType: '',
          contact: null,
          address: null,
          configuration: null,
          }

    //Global variables used in multiple methods         
    let RadioVal1 = null
    let RadioVal2 = null
    let imgCapVal = null
    let idCapVal = null
    let statea = null
    let statea2 = null

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleOrgIDChange = this.handleOrgIDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleAChange = this.handleAChange.bind(this);
    this.handleimgCapture = this.handleimgCapture.bind(this);
    this.handleConfigChange = this.handleConfigChange.bind(this);
    this.handleidCapture = this.handleidCapture.bind(this);
    this.orgnameVal = this.orgnameVal.bind(this);
    this.orgidVal = this.orgidVal.bind(this);
    this.addresstypeVal = this.addresstypeVal.bind(this);
    this.streetVal = this.streetVal.bind(this);
    this.cityVal = this.cityVal.bind(this);
    this.zipVal = this.zipVal.bind(this);
    this.stateVal = this.stateVal.bind(this);
    this.countryVal = this.countryVal.bind(this);
    this.contacttypeVal = this.contacttypeVal.bind(this);
    this.fnameVal = this.fnameVal.bind(this);
    this.lnameVal = this.lnameVal.bind(this);
    this.phoneVal = this.phoneVal.bind(this);
    this.emailVal = this.emailVal.bind(this);
    this.emailVal2 = this.emailVal2.bind(this);
    this.imgcaptureVal = this.imgcaptureVal.bind(this);
    this.idcaptureVal = this.idcaptureVal.bind(this);
    this.smoothingframeVal = this.smoothingframeVal.bind(this);
    this.anomalydurationVal = this.anomalydurationVal.bind(this);
    this.frameintervalVal = this.frameintervalVal.bind(this);
    this.stateUpdate = this.stateUpdate.bind(this);
    this.selectState = this.selectState.bind(this);
    this.selectState2 = this.selectState2.bind(this);
    this.handlestateVariable = this.handlestateVariable.bind(this);
    this.handlestateVariable2 = this.handlestateVariable2.bind(this);
    this.ok = this.ok.bind(this);
  }

  ok(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }

  componentDidMount() {
    //Hide the state/province textbox and state/province dropdown and display US states by default when the form first loads. 
    //The others (CA dropdown or other country dropdown) are displayed conditionally based on country selection.
    let statedropUS = document.getElementById("stateselectUS")
    let statedropCA = document.getElementById("stateselectCA")
    let stateinput = document.getElementById("state")

    let statedropUS2 = document.getElementById("stateselectUS2")
    let statedropCA2 = document.getElementById("stateselectCA2")
    let stateinput2 = document.getElementById("state2")

    stateinput.style.display = "none"
    statedropCA.style.display = "none"
    stateinput2.style.display = "none"
    statedropCA2.style.display = "none"
  }

  //Whenever a change is made to an input field, the corresponding state property is updated.
  handleNameChange(event) {
    this.setState({description: event.target.value});
  }

  handleOrgIDChange(event) {
    this.setState({id: event.target.value});
  }

  //The following two methods set the "statea" and "statea2" variables which correspond to the state/province inputs on the form (for the first address and second address).
  //These variables will later be used to set the state properties of the state/province values for the two addresses.
  handlestateVariable() {
    let statedropUS = document.getElementById("stateselectUS")
    let statedropCA = document.getElementById("stateselectCA")
    let stateinput = document.getElementById("state")
    let countrya = document.getElementById("country")

    if (countrya.value === "US")
    {
        this.statea = statedropUS.value
    }
    else if (countrya.value === "CA")
    {
        this.statea = statedropCA.value
    }
    else
    {
        this.statea = stateinput.value
    }

  }

  handlestateVariable2() {

    let statedropUS2 = document.getElementById("stateselectUS2")
    let statedropCA2 = document.getElementById("stateselectCA2")
    let stateinput2 = document.getElementById("state2")
    let countrya2 = document.getElementById("country2")

    if (countrya2.value ==="US") 
    {
      this.statea2 = statedropUS2.value
    }
    else if (countrya2.value === "CA")
    {
      this.statea2 = statedropCA2.value
    }
    else 
    {
      this.statea2 = stateinput2.value
    }
  }

  //This method sets the state for the address arrays conditionally based on whether one or two addresses are selected.
  handleAChange() {
    let typea = document.getElementById("addresstype")
    let streeta = document.getElementById("street")
    let citya = document.getElementById("city")
    let zipa = document.getElementById("zip")
    let countrya = document.getElementById("country")
    let typea2 = document.getElementById("addresstype2")
    let streeta2 = document.getElementById("street2")
    let citya2 = document.getElementById("city2")
    let zipa2 = document.getElementById("zip2")
    let countrya2 = document.getElementById("country2")

    if (typea2.value.length !== 0 || streeta2.value.length !== 0 || citya2.value.length !== 0 || zipa2.value.length !== 0 || countrya2.value.length !== 0)
    {
    this.setState({
      address: 
      [{zip: zipa.value,
        country: countrya.value,
        state: this.statea,
        type: typea.value,
        city: citya.value,
        street: streeta.value },
      {
        zip: zipa2.value,
        country: countrya2.value,
        state: this.statea2,
        type: typea2.value,
        city: citya2.value,
        street: streeta2.value }]
      })
      }else {
        this.setState({
          address: 
          [{zip: zipa.value,
            country: countrya.value,
            state: this.statea,
            type: typea.value,
            city: citya.value,
            street: streeta.value }]
          })
      }
  }

  //This method sets the state for the contact arrays, conditionally based on whether one or two contact sets are entered.
  handleCChange() {
    let fnamec = document.getElementById("fname")
    let lnamec = document.getElementById("lname")
    let typec = document.getElementById("contacttype")
    let phonec = document.getElementById("phone")
    let emailc = document.getElementById("email")
    let fnamec2 = document.getElementById("fname2")
    let lnamec2 = document.getElementById("lname2")
    let typec2 = document.getElementById("contacttype2")
    let phonec2 = document.getElementById("phone2")
    let emailc2 = document.getElementById("email2")

    if (typec2.value.length !== 0 || fnamec2.value.length !== 0 || lnamec2.value.length !== 0 || phonec2.value.length !== 0 || emailc2.value.length !== 0)
    {
    this.setState({ 
      contact: 
      [{firstName: fnamec.value,
        lastName: lnamec.value, 
        type: typec.value, 
        phone: phonec.value, 
        email: emailc.value},

        {
        firstName: fnamec2.value,
        lastName: lnamec2.value, 
        type: typec2.value, 
        phone: phonec2.value, 
        email: emailc2.value}]
      })
    }else {
      this.setState({ 
        contact: 
        [{firstName: fnamec.value,
          lastName: lnamec.value, 
          type: typec.value, 
          phone: phonec.value, 
          email: emailc.value}]
        })
    }
  }

  //The following two methods set the "RadioVal" variables with the values from the radio buttons.
  //The radiobutton inputs are translated into "true/false" values and set to the variables.
  //The RadioVal variables are later used to set the state (in the handleConfigChange() method).
  handleimgCapture() {
    let RadioimgNo = document.getElementById("imgCaptureNo")
    let RadioimgYes = document.getElementById("imgCaptureYes")

    if (RadioimgNo.checked) {
      this.RadioVal1 = false
    }
    if (RadioimgYes.checked) {
      this.RadioVal1 = true
    }
  }

  handleidCapture() {
    let RadioidNo = document.getElementById("idCaptureNo")
    let RadioidYes = document.getElementById("idCaptureYes")

    if (RadioidNo.checked) {
      this.RadioVal2 = false
    }
    if (RadioidYes.checked) {
      this.RadioVal2 = true
    }
  }

  //This method sets the state for the configuration items. The postProcess values are converted to integers.
  handleConfigChange() {
    let smoothingf = document.getElementById("smoothingframe")
    let anomalyd = document.getElementById("anomalyduration")
    let framei = document.getElementById("frameinterval")
    
    this.setState({ 
      configuration: {
        registration: {
          imageCapture: this.RadioVal1,
          idCapture: this.RadioVal2
        },
        postProcess: {
          anomalyDuration: parseInt(anomalyd.value, 10),
          smoothingFrame: parseInt(smoothingf.value, 10),
          frameInterval: parseInt(framei.value, 10)}
      }
    })
  }

  //The following two methods display the correct form input for "state/province" based upon which country is selected ( The US state dropdown, the CA province dropdown, or textbox for any other country). 
  //These methods are called in an onChange handler in the "country" html inputs.
  selectState() {
    let countrydrop = document.getElementById("country")
    let statedropUS = document.getElementById("stateselectUS")
    let statedropCA = document.getElementById("stateselectCA")
    let stateinput = document.getElementById("state")

    if (countrydrop.value === "US")
    {
      statedropUS.style.display = "block";
      statedropCA.style.display = "none";
      stateinput.style.display = "none";
    }
    else if (countrydrop.value === "CA")
    {
      statedropUS.style.display = "none";
      statedropCA.style.display = "block";
      stateinput.style.display = "none";
    }
    else 
    {
      statedropUS.style.display = "none";
      statedropCA.style.display = "none";
      stateinput.style.display = "block";
    }
  }

  selectState2() {
    let countrydrop2 = document.getElementById("country2")
    let statedropUS2 = document.getElementById("stateselectUS2")
    let statedropCA2 = document.getElementById("stateselectCA2")
    let stateinput2 = document.getElementById("state2")

    if (countrydrop2.value === "US")
    {
      statedropUS2.style.display = "block";
      statedropCA2.style.display = "none";
      stateinput2.style.display = "none";
    }
    else if (countrydrop2.value === "CA")
    {
      statedropUS2.style.display = "none";
      statedropCA2.style.display = "block";
      stateinput2.style.display = "none";
    }
    else 
    {
      statedropUS2.style.display = "none";
      statedropCA2.style.display = "none";
      stateinput2.style.display = "block";
    }
  }

  //This method is called in an onClick handler at the bottom of the form and performs the final state updates before submission by calling the appropriate methods.
  stateUpdate() {
    this.handlestateVariable();
    this.handlestateVariable2();
    this.handleCChange();
    this.handleAChange();
    this.handleConfigChange();
    this.idcaptureVal();
    this.imgcaptureVal();
  }

  //The following are Onblur validation methods. All fields are required except for the second address and second contact fields. 
  //The "postProcess" inputs have to be numeric and the email has to be a valid format.
  orgnameVal(event) {
    if (event.target.value === ""){
      document.getElementById("orgnameErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("orgnameErrMsg").innerHTML=""
      }
  }

  orgidVal(event) {
    if (event.target.value === ""){
      document.getElementById("orgidErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("orgidErrMsg").innerHTML=""
      }
  }

  addresstypeVal(event) {
    if (event.target.value === ""){
      document.getElementById("addresstypeErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("addresstypeErrMsg").innerHTML=""
      }
  }

  streetVal(event) {
    if (event.target.value === ""){
      document.getElementById("streetErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("streetErrMsg").innerHTML=""
      }
  }

  zipVal(event) {
    if (event.target.value === ""){
      document.getElementById("zipErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("zipErrMsg").innerHTML=""
      }
  }

  cityVal(event) {
    if (event.target.value === ""){
      document.getElementById("cityErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("cityErrMsg").innerHTML=""
      }
  }

  stateVal(event) {
    if (event.target.value === ""){
      document.getElementById("stateErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("stateErrMsg").innerHTML=""
      }
  }

  countryVal(event) {
    if (event.target.value === ""){
      document.getElementById("countryErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("countryErrMsg").innerHTML=""
      }
  }

  contacttypeVal(event) {
    if (event.target.value === ""){
      document.getElementById("contacttypeErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("contacttypeErrMsg").innerHTML=""
      }
  }

  fnameVal(event) {
    if (event.target.value === ""){
      document.getElementById("fnameErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("fnameErrMsg").innerHTML=""
      }
  }

  lnameVal(event) {
    if (event.target.value === ""){
      document.getElementById("lnameErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("lnameErrMsg").innerHTML=""
      }
  }

  phoneVal(event) {
    if (event.target.value === ""){
      document.getElementById("phoneErrMsg").innerHTML="Required"
      }
      else{
      document.getElementById("phoneErrMsg").innerHTML=""
      }
  }

  emailVal(event) {
    let emailv = document.getElementById("email")
    let rg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid= rg.test(emailv.value)
    
    if (event.target.value === ""){
      document.getElementById("emailErrMsg").innerHTML="Required"
      }
    else if (emailv.value !== "" &&!isValid) {
        document.getElementById("emailErrMsg").innerHTML="This email is not valid"
      }
    else {
        document.getElementById("emailErrMsg").innerHTML=""
      }
  }

  emailVal2() {
    let emailv = document.getElementById("email2")
    let rg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid= rg.test(emailv.value)
    
    if (emailv.value !== "" && !isValid) {
        document.getElementById("emailErrMsg2").innerHTML="This email is not valid"
      }

    else if (emailv.value === "")
    {
      document.getElementById("emailErrMsg2").innerHTML=""
    }
    else {
        document.getElementById("emailErrMsg2").innerHTML=""
      }
  }

  //The following two methods are used in the on-submit validation. 
  //They set variables which correspond to the radio button values based on whether the radio buttons have been checked.
  idcaptureVal() {
    let RadioidNo = document.getElementById("idCaptureNo")
    let RadioidYes = document.getElementById("idCaptureYes")
    if (!RadioidNo.checked && !RadioidYes.checked){
      this.idCapVal = false
      }
      else{
      this.idCapVal = true
      }
  }

  imgcaptureVal() {
    let RadioimgNo = document.getElementById("imgCaptureNo")
    let RadioimgYes = document.getElementById("imgCaptureYes")
    if (!RadioimgNo.checked && !RadioimgYes.checked){
      this.imgCapVal = false
      }
      else{
      this.imgCapVal = true
      }
  }

  frameintervalVal(event) {
    if (event.target.value === ""){
      document.getElementById("frameintervalErrMsg").innerHTML="Required"
      }
      else if (isNaN(event.target.value)){
      document.getElementById("frameintervalErrMsg").innerHTML="Frame Interval must be a number"
      }
      else {
      document.getElementById("frameintervalErrMsg").innerHTML=""
      }
  }

  anomalydurationVal(event) {
    if (event.target.value === ""){
      document.getElementById("anomalydurationErrMsg").innerHTML="Required"
      }
      else if (isNaN(event.target.value)){
      document.getElementById("anomalydurationErrMsg").innerHTML="Anomaly Duration must be a number"
      }
      else {
      document.getElementById("anomalydurationErrMsg").innerHTML=""
      }
  }

  smoothingframeVal(event) {
    if (event.target.value === ""){
      document.getElementById("smoothingframeErrMsg").innerHTML="Required"
      }
      else if (isNaN(event.target.value)){
      document.getElementById("smoothingframeErrMsg").innerHTML="Smoothing Frame must be a number"
      }
      else {
      document.getElementById("smoothingframeErrMsg").innerHTML=""
      }
  }

  //This method is called on submit and handles final validation as well as the API call.
  handleSubmit(event) {

    event.preventDefault();
    let orgNamev = document.getElementById("orgname")
    let orgIdv = document.getElementById("orgID")
    let typeav = document.getElementById("addresstype")
    let streetav = document.getElementById("street")
    let cityav = document.getElementById("city")
    let zipav = document.getElementById("zip")
    let countryav = document.getElementById("country")
    let fnamecv = document.getElementById("fname")
    let lnamecv = document.getElementById("lname")
    let typecv = document.getElementById("contacttype")
    let phonecv = document.getElementById("phone")
    let emailcv = document.getElementById("email")
    let smoothingfv = document.getElementById("smoothingframe")
    let anomalydv = document.getElementById("anomalyduration")
    let frameiv = document.getElementById("frameinterval")
    let emailv = document.getElementById("email")
    let emailv2 = document.getElementById("email2")
    let rg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailValid= rg.test(emailv.value)
    let emailValid2 = rg.test(emailv2.value)

    //The same validation as the onBlur validation is run a second time on all the required fields and an alert is generated if something is wrong.
    if (emailv.value !== "" && !emailValid)
    {
      Alert("The primary email is not valid.")
    }
    else if (emailv2.value !== "" && !emailValid2)
    {
      Alert("The secondary email is not valid.")
    }
    else if (isNaN(smoothingfv.value))
    {
      Alert("Smoothing Frame must be a number.")
    }
    else if (isNaN(anomalydv.value))
    {
      Alert("Anomaly Duration must be a number.")
    }
    else if (isNaN(frameiv.value))
    {
      Alert("Frame Interval must be a number.")
    }
    else if (orgNamev.value === "" || orgIdv.value === "" || typeav.value === "" || streetav.value === "" || cityav.value === "" || 
    this.statea === "" || zipav.value === "" || countryav.value === "" || fnamecv.value === "" || lnamecv.value === "" ||
    typecv.value === "" || phonecv.value === "" || emailcv.value === "" || !this.idCapVal   || !this.imgCapVal || smoothingfv.value === "" ||
    anomalydv.value === "" || frameiv.value === "")
    {
      Alert("One or more required fields are missing.")
      if (!this.idCapVal)
      {
        document.getElementById("idCaptureErrMsg").innerHTML="Required"
      }
      else {
        document.getElementById("idCaptureErrMsg").innerHTML=""
      }

      if (!this.imgCapVal)
      {
        document.getElementById("imgCaptureErrMsg").innerHTML="Required"
      }
      else {
        document.getElementById("imgCaptureErrMsg").innerHTML=""
      }

      if (orgNamev.value === ""){
        document.getElementById("orgnameErrMsg").innerHTML="Required"
      }
      else{
        document.getElementById("orgnameErrMsg").innerHTML=""
      }

      if (orgIdv.value === ""){
        document.getElementById("orgidErrMsg").innerHTML="Required"
      }
      else{
        document.getElementById("orgidErrMsg").innerHTML=""
      }

      if (typeav.value === ""){
        document.getElementById("addresstypeErrMsg").innerHTML="Required"
      }
      else{
        document.getElementById("addresstypeErrMsg").innerHTML=""
      }
  
      if (streetav.value === ""){
        document.getElementById("streetErrMsg").innerHTML="Required"
      }
      else{
        document.getElementById("streetErrMsg").innerHTML=""
      }

      if (zipav.value === ""){
        document.getElementById("zipErrMsg").innerHTML="Required"
      }
      else{
        document.getElementById("zipErrMsg").innerHTML=""
      }

      if (cityav.value === ""){
        document.getElementById("cityErrMsg").innerHTML="Required"
      }
      else{
        document.getElementById("cityErrMsg").innerHTML=""
      }

      if (this.statea === "" ){
        document.getElementById("stateErrMsg").innerHTML="Required"
      }
      else{
        document.getElementById("stateErrMsg").innerHTML=""
      }

      if (countryav.value === "" ){
        document.getElementById("countryErrMsg").innerHTML="Required"
      }
      else{
        document.getElementById("countryErrMsg").innerHTML=""
      }

      if (typecv.value === ""){
        document.getElementById("contacttypeErrMsg").innerHTML="Required"
      }
      else{
        document.getElementById("contacttypeErrMsg").innerHTML=""
      }

      if (fnamecv.value === "" ){
        document.getElementById("fnameErrMsg").innerHTML="Required"
      }
      else{
        document.getElementById("fnameErrMsg").innerHTML=""
      }

      if (lnamecv.value === "" ){
        document.getElementById("lnameErrMsg").innerHTML="Required"
      }
      else{
        document.getElementById("lnameErrMsg").innerHTML=""
      }

      if (phonecv.value === "" ){
        document.getElementById("phoneErrMsg").innerHTML="Required"
      }
      else{
        document.getElementById("phoneErrMsg").innerHTML=""
      }
    
      if (emailcv.value === ""){
        document.getElementById("emailErrMsg").innerHTML="Required"
      }
      else {
        document.getElementById("emailErrMsg").innerHTML=""
      }

      if (frameiv.value === ""){
        document.getElementById("frameintervalErrMsg").innerHTML="Required"
      }
      else {
        document.getElementById("frameintervalErrMsg").innerHTML=""
      }

      if (anomalydv.value === "" ){
        document.getElementById("anomalydurationErrMsg").innerHTML="Required"
      }
      else {
        document.getElementById("anomalydurationErrMsg").innerHTML=""
      }

      if (smoothingfv.value === ""){
        document.getElementById("smoothingframeErrMsg").innerHTML="Required"
      }
      else {
        document.getElementById("smoothingframeErrMsg").innerHTML=""
      }

    }
    else {
    //Distribute the data stored in state into new object.
    const formData = {
      description: this.state.description,
      id: this.state.id,
      contact: this.state.contact,
      address: this.state.address,
      configuration: this.state.configuration
    }
    console.log(formData);
    //Make an API call to post the data.
    axios.post(`/orgs`, formData)
         .then(res => {
          if (res.status === 200) {
            this.props.history.push('/add-org-confirmation')
           } 
         })
         //Display error
         .catch(error => Alert(error))   
    }
  }

  //The following state operations are to ensure that the Accordions on the form function.
      state = {
      isOpen: true,
      isOpen2: false,
      isOpen3: false,
      isOpen4: false, 
      isOpen5: false,
      };

      onChange = isOpen => {
        this.setState({
          isOpen
        });
      };

      onChange2 = isOpen2 => {
        this.setState({
          isOpen2
        });
      };

      onChange3 = isOpen3 => {
        this.setState({
          isOpen3
        });
      };

      onChange4 = isOpen4 => {
        this.setState({
          isOpen4
        });
      };

      onChange5 = isOpen5 => {
        this.setState({
          isOpen5
        });
      };

  render () {
    //The following CSS variables are for form labels, inputs and buttons.
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
        width: "70%",
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

      //These variables are for the five Accordions on the form.
      const { isOpen } = this.state;
      const { isOpen2 } = this.state;
      const { isOpen3 } = this.state;
      const { isOpen4 } = this.state;
      const { isOpen5 } = this.state;
      
    return (
      <div>
        {/* This is the html code for the alert window. */}
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
          <h1 className={classes.header}>Add Organizations</h1>
          <form className={classes.wrapper} 
            onSubmit={this.handleSubmit}>
            <fieldset>
              <div>
                <table>
                  <tr>
                    <td className={classes.cell3} 
                        style={{textAlign:"right"}}>
                        <label htmlFor="orgname" 
                          style={labelstyle}>
                          Name:
                       </label>
                    </td>
                    <td 
                      className={classes.cell4} 
                      style={{textAlign:"left"}}>
                      <input 
                        style={textbxstyle2} 
                        type="text" 
                        id="orgname" 
                        name="orgname"
                        value={this.state.description}
                        onChange={this.handleNameChange}
                        onBlur={this.orgnameVal}
                        />
                      <br/>
                      <span 
                          id="orgnameErrMsg"
                          style={{color:"red"}}>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td 
                      className={classes.cell3} 
                      style={{textAlign:"right"}}>
                      <label 
                        htmlFor="orgID" 
                        style={labelstyle}>
                        ID:
                      </label>
                    </td>
                    <td 
                      className={classes.cell4} 
                      style={{textAlign:"left"}}>
                        <input  
                          style={textbxstyle2} 
                          type="text" 
                          id="orgID" 
                          name="orgID"
                          value={this.state.id}
                          onBlur={this.orgidVal}
                          onChange={this.handleOrgIDChange}/>
                        <br/>
                        <span 
                          id="orgidErrMsg"
                          style={{color:"red"}}>
                      </span>
                    </td>
                  </tr>
                </table>
                  <hr></hr>
                    </div> 
                      <div> 
                      <Accordion isOpen={isOpen} onChange={this.onChange} label={"Address"}>
                          <br/>
                          <table>
                            <tr>
                              <td 
                                className={classes.cell3} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="addresstype" 
                                  style={labelstyle}>
                                  Type of Address:
                                </label>
                              </td>
                              <td 
                                className={classes.cell4}
                                style={{textAlign:"left"}}>
                                <select
                                style={textbxstyle2} 
                                id="addresstype" 
                                name="addresstype"                                
                                onBlur={this.addresstypeVal}
                                >
                                <option>Primary</option>
                                <option>Billing</option>
                                <option>Technical</option>
                                </select>
                                <br/>
                                <span 
                                  id="addresstypeErrMsg"
                                  style={{color:"red"}}>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td 
                                className={classes.cell3} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="street" 
                                  style={labelstyle}>
                                  Street:
                                </label>
                              </td>
                              <td 
                                className={classes.cell4} 
                                style={{textAlign:"left"}}>
                                <input 
                                  style={textbxstyle2} 
                                  type="text" 
                                  id="street" 
                                  name="street"
                                  onBlur={this.streetVal}
                                  />
                                <br/>
                                <span 
                                  id="streetErrMsg"
                                  style={{color:"red"}}>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td 
                                className={classes.cell3} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="city" 
                                  style={labelstyle}>
                                  City:
                                </label>
                              </td>
                              <td 
                                className={classes.cell4} 
                                style={{textAlign:"left"}}>
                                <input 
                                  style={textbxstyle2} 
                                  type="text" 
                                  id="city" 
                                  name="city"
                                  onBlur={this.cityVal}
                                  />
                                <br/>
                                <span 
                                  id="cityErrMsg"
                                  style={{color:"red"}}>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td 
                                className={classes.cell3} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="zip" 
                                  style={labelstyle}>
                                  Zip Code:
                                </label>
                              </td>
                              <td 
                                className={classes.cell4} 
                                style={{textAlign:"left"}}>
                                <input 
                                  style={textbxstyle2} 
                                  type="text" 
                                  id="zip" 
                                  name="zip"
                                  onBlur={this.zipVal}
                                  />
                                <br/>
                                <span 
                                  id="zipErrMsg"
                                  style={{color:"red"}}>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td 
                                className={classes.cell3} 
                                style={{textAlign:"right"}}>
                                <label 
                                htmlFor="country" 
                                style={labelstyle}>
                                  Country:
                                </label>
                              </td>
                              <td 
                                className={classes.cell4} 
                                style={{textAlign:"left"}}>
                                <select 
                                id="country" 
                                name="country" 
                                onChange={this.selectState} 
                                style={textbxstyle2} 
                                onBlur={this.countryVal}>
                                      <option value="">Select Country</option>
                                      <option value="AF">Afghanistan</option>
                                      <option value="AX">Aland Islands</option>
                                      <option value="AL">Albania</option>
                                      <option value="DZ">Algeria</option>
                                      <option value="AS">American Samoa</option>
                                      <option value="AD">Andorra</option>
                                      <option value="AO">Angola</option>
                                      <option value="AI">Anguilla</option>
                                      <option value="AQ">Antarctica</option>
                                      <option value="AG">Antigua and Barbuda</option>
                                      <option value="AR">Argentina</option>
                                      <option value="AM">Armenia</option>
                                      <option value="AW">Aruba</option>
                                      <option value="AU">Australia</option>
                                      <option value="AT">Austria</option>
                                      <option value="AZ">Azerbaijan</option>
                                      <option value="BS">Bahamas</option>
                                      <option value="BH">Bahrain</option>
                                      <option value="BD">Bangladesh</option>
                                      <option value="BB">Barbados</option>
                                      <option value="BY">Belarus</option>
                                      <option value="BE">Belgium</option>
                                      <option value="BZ">Belize</option>
                                      <option value="BJ">Benin</option>
                                      <option value="BM">Bermuda</option>
                                      <option value="BT">Bhutan</option>
                                      <option value="BO">Bolivia</option>
                                      <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                      <option value="BA">Bosnia and Herzegovina</option>
                                      <option value="BW">Botswana</option>
                                      <option value="BV">Bouvet Island</option>
                                      <option value="BR">Brazil</option>
                                      <option value="IO">British Indian Ocean Territory</option>
                                      <option value="BN">Brunei Darussalam</option>
                                      <option value="BG">Bulgaria</option>
                                      <option value="BF">Burkina Faso</option>
                                      <option value="BI">Burundi</option>
                                      <option value="KH">Cambodia</option>
                                      <option value="CM">Cameroon</option>
                                      <option value="CA">Canada</option>
                                      <option value="CV">Cape Verde</option>
                                      <option value="KY">Cayman Islands</option>
                                      <option value="CF">Central African Republic</option>
                                      <option value="TD">Chad</option>
                                      <option value="CL">Chile</option>
                                      <option value="CN">China</option>
                                      <option value="CX">Christmas Island</option>
                                      <option value="CC">Cocos (Keeling) Islands</option>
                                      <option value="CO">Colombia</option>
                                      <option value="KM">Comoros</option>
                                      <option value="CG">Congo</option>
                                      <option value="CD">Congo, the Democratic Republic of the</option>
                                      <option value="CK">Cook Islands</option>
                                      <option value="CR">Costa Rica</option>
                                      <option value="CI">Cote D'Ivoire</option>
                                      <option value="HR">Croatia</option>
                                      <option value="CU">Cuba</option>
                                      <option value="CW">Curacao</option>
                                      <option value="CY">Cyprus</option>
                                      <option value="CZ">Czech Republic</option>
                                      <option value="DK">Denmark</option>
                                      <option value="DJ">Djibouti</option>
                                      <option value="DM">Dominica</option>
                                      <option value="DO">Dominican Republic</option>
                                      <option value="EC">Ecuador</option>
                                      <option value="EG">Egypt</option>
                                      <option value="SV">El Salvador</option>
                                      <option value="GQ">Equatorial Guinea</option>
                                      <option value="ER">Eritrea</option>
                                      <option value="EE">Estonia</option>
                                      <option value="ET">Ethiopia</option>
                                      <option value="FK">Falkland Islands (Malvinas)</option>
                                      <option value="FO">Faroe Islands</option>
                                      <option value="FJ">Fiji</option>
                                      <option value="FI">Finland</option>
                                      <option value="FR">France</option>
                                      <option value="GF">French Guiana</option>
                                      <option value="PF">French Polynesia</option>
                                      <option value="TF">French Southern Territories</option>
                                      <option value="GA">Gabon</option>
                                      <option value="GM">Gambia</option>
                                      <option value="GE">Georgia</option>
                                      <option value="DE">Germany</option>
                                      <option value="GH">Ghana</option>
                                      <option value="GI">Gibraltar</option>
                                      <option value="GR">Greece</option>
                                      <option value="GL">Greenland</option>
                                      <option value="GD">Grenada</option>
                                      <option value="GP">Guadeloupe</option>
                                      <option value="GU">Guam</option>
                                      <option value="GT">Guatemala</option>
                                      <option value="GG">Guernsey</option>
                                      <option value="GN">Guinea</option>
                                      <option value="GW">Guinea-Bissau</option>
                                      <option value="GY">Guyana</option>
                                      <option value="HT">Haiti</option>
                                      <option value="HM">Heard Island and Mcdonald Islands</option>
                                      <option value="VA">Holy See (Vatican City State)</option>
                                      <option value="HN">Honduras</option>
                                      <option value="HK">Hong Kong</option>
                                      <option value="HU">Hungary</option>
                                      <option value="IS">Iceland</option>
                                      <option value="IN">India</option>
                                      <option value="ID">Indonesia</option>
                                      <option value="IR">Iran, Islamic Republic of</option>
                                      <option value="IQ">Iraq</option>
                                      <option value="IE">Ireland</option>
                                      <option value="IM">Isle of Man</option>
                                      <option value="IL">Israel</option>
                                      <option value="IT">Italy</option>
                                      <option value="JM">Jamaica</option>
                                      <option value="JP">Japan</option>
                                      <option value="JE">Jersey</option>
                                      <option value="JO">Jordan</option>
                                      <option value="KZ">Kazakhstan</option>
                                      <option value="KE">Kenya</option>
                                      <option value="KI">Kiribati</option>
                                      <option value="KP">Korea, Democratic People"s Republic of</option>
                                      <option value="KR">Korea, Republic of</option>
                                      <option value="XK">Kosovo</option>
                                      <option value="KW">Kuwait</option>
                                      <option value="KG">Kyrgyzstan</option>
                                      <option value="LA">Lao People's Democratic Republic</option>
                                      <option value="LV">Latvia</option>
                                      <option value="LB">Lebanon</option>
                                      <option value="LS">Lesotho</option>
                                      <option value="LR">Liberia</option>
                                      <option value="LY">Libyan Arab Jamahiriya</option>
                                      <option value="LI">Liechtenstein</option>
                                      <option value="LT">Lithuania</option>
                                      <option value="LU">Luxembourg</option>
                                      <option value="MO">Macao</option>
                                      <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                                      <option value="MG">Madagascar</option>
                                      <option value="MW">Malawi</option>
                                      <option value="MY">Malaysia</option>
                                      <option value="MV">Maldives</option>
                                      <option value="ML">Mali</option>
                                      <option value="MT">Malta</option>
                                      <option value="MH">Marshall Islands</option>
                                      <option value="MQ">Martinique</option>
                                      <option value="MR">Mauritania</option>
                                      <option value="MU">Mauritius</option>
                                      <option value="YT">Mayotte</option>
                                      <option value="MX">Mexico</option>
                                      <option value="FM">Micronesia, Federated States of</option>
                                      <option value="MD">Moldova, Republic of</option>
                                      <option value="MC">Monaco</option>
                                      <option value="MN">Mongolia</option>
                                      <option value="ME">Montenegro</option>
                                      <option value="MS">Montserrat</option>
                                      <option value="MA">Morocco</option>
                                      <option value="MZ">Mozambique</option>
                                      <option value="MM">Myanmar</option>
                                      <option value="NA">Namibia</option>
                                      <option value="NR">Nauru</option>
                                      <option value="NP">Nepal</option>
                                      <option value="NL">Netherlands</option>
                                      <option value="AN">Netherlands Antilles</option>
                                      <option value="NC">New Caledonia</option>
                                      <option value="NZ">New Zealand</option>
                                      <option value="NI">Nicaragua</option>
                                      <option value="NE">Niger</option>
                                      <option value="NG">Nigeria</option>
                                      <option value="NU">Niue</option>
                                      <option value="NF">Norfolk Island</option>
                                      <option value="MP">Northern Mariana Islands</option>
                                      <option value="NO">Norway</option>
                                      <option value="OM">Oman</option>
                                      <option value="PK">Pakistan</option>
                                      <option value="PW">Palau</option>
                                      <option value="PS">Palestinian Territory, Occupied</option>
                                      <option value="PA">Panama</option>
                                      <option value="PG">Papua New Guinea</option>
                                      <option value="PY">Paraguay</option>
                                      <option value="PE">Peru</option>
                                      <option value="PH">Philippines</option>
                                      <option value="PN">Pitcairn</option>
                                      <option value="PL">Poland</option>
                                      <option value="PT">Portugal</option>
                                      <option value="PR">Puerto Rico</option>
                                      <option value="QA">Qatar</option>
                                      <option value="RE">Reunion</option>
                                      <option value="RO">Romania</option>
                                      <option value="RU">Russian Federation</option>
                                      <option value="RW">Rwanda</option>
                                      <option value="BL">Saint Barthelemy</option>
                                      <option value="SH">Saint Helena</option>
                                      <option value="KN">Saint Kitts and Nevis</option>
                                      <option value="LC">Saint Lucia</option>
                                      <option value="MF">Saint Martin</option>
                                      <option value="PM">Saint Pierre and Miquelon</option>
                                      <option value="VC">Saint Vincent and the Grenadines</option>
                                      <option value="WS">Samoa</option>
                                      <option value="SM">San Marino</option>
                                      <option value="ST">Sao Tome and Principe</option>
                                      <option value="SA">Saudi Arabia</option>
                                      <option value="SN">Senegal</option>
                                      <option value="RS">Serbia</option>
                                      <option value="CS">Serbia and Montenegro</option>
                                      <option value="SC">Seychelles</option>
                                      <option value="SL">Sierra Leone</option>
                                      <option value="SG">Singapore</option>
                                      <option value="SX">Sint Maarten</option>
                                      <option value="SK">Slovakia</option>
                                      <option value="SI">Slovenia</option>
                                      <option value="SB">Solomon Islands</option>
                                      <option value="SO">Somalia</option>
                                      <option value="ZA">South Africa</option>
                                      <option value="GS">South Georgia and the South Sandwich Islands</option>
                                      <option value="SS">South Sudan</option>
                                      <option value="ES">Spain</option>
                                      <option value="LK">Sri Lanka</option>
                                      <option value="SD">Sudan</option>
                                      <option value="SR">Suriname</option>
                                      <option value="SJ">Svalbard and Jan Mayen</option>
                                      <option value="SZ">Swaziland</option>
                                      <option value="SE">Sweden</option>
                                      <option value="CH">Switzerland</option>
                                      <option value="SY">Syrian Arab Republic</option>
                                      <option value="TW">Taiwan, Province of China</option>
                                      <option value="TJ">Tajikistan</option>
                                      <option value="TZ">Tanzania, United Republic of</option>
                                      <option value="TH">Thailand</option>
                                      <option value="TL">Timor-Leste</option>
                                      <option value="TG">Togo</option>
                                      <option value="TK">Tokelau</option>
                                      <option value="TO">Tonga</option>
                                      <option value="TT">Trinidad and Tobago</option>
                                      <option value="TN">Tunisia</option>
                                      <option value="TR">Turkey</option>
                                      <option value="TM">Turkmenistan</option>
                                      <option value="TC">Turks and Caicos Islands</option>
                                      <option value="TV">Tuvalu</option>
                                      <option value="UG">Uganda</option>
                                      <option value="UA">Ukraine</option>
                                      <option value="AE">United Arab Emirates</option>
                                      <option value="GB">United Kingdom</option>
                                      <option value="US">United States</option>
                                      <option value="UM">United States Minor Outlying Islands</option>
                                      <option value="UY">Uruguay</option>
                                      <option value="UZ">Uzbekistan</option>
                                      <option value="VU">Vanuatu</option>
                                      <option value="VE">Venezuela</option>
                                      <option value="VN">Viet Nam</option>
                                      <option value="VG">Virgin Islands, British</option>
                                      <option value="VI">Virgin Islands, U.s.</option>
                                      <option value="WF">Wallis and Futuna</option>
                                      <option value="EH">Western Sahara</option>
                                      <option value="YE">Yemen</option>
                                      <option value="ZM">Zambia</option>
                                      <option value="ZW">Zimbabwe</option>
                                  </select>                                
                                <br/>
                                <span 
                                  id="countryErrMsg"
                                  style={{color:"red"}}>
                                </span>
                              </td>
                            </tr>
                            <tr> 
                              <td 
                                className={classes.cell3} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="state" 
                                  style={labelstyle}>
                                  State/Province:
                                </label>
                              </td>
                              <td 
                                className={classes.cell4} 
                                style={{textAlign:"left"}}>
                                <input
                                  className={classes.combobox} 
                                  style={textbxstyle2} 
                                  type="text" 
                                  id="state" 
                                  name="state"
                                  onBlur={this.stateVal}
                                  />
                                  <select
                                  style={textbxstyle2}  
                                  id="stateselectUS" 
                                  name="stateselectUS"
                                  onBlur={this.stateVal}>
                                    <option value="">Select State</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                  </select>
                                  <select
                                  className={classes.combobox} 
                                  id="stateselectCA" 
                                  name="stateselectCA"
                                  onBlur={this.stateVal}>
                                      <option value="">Select Province</option>
                                    	<option value="AB">Alberta</option>
                                      <option value="BC">British Columbia</option>
                                      <option value="MB">Manitoba</option>
                                      <option value="NB">New Brunswick</option>
                                      <option value="NL">Newfoundland and Labrador</option>
                                      <option value="NS">Nova Scotia</option>
                                      <option value="NT">Northwest Territories</option>
                                      <option value="NU">Nunavut</option>
                                      <option value="ON">Ontario</option>
                                      <option value="PE">Prince Edward Island</option>
                                      <option value="QC">Quebec</option>
                                      <option value="SK">Saskatchewan</option>
                                      <option value="YT">Yukon</option>
                                    </select>
                                    <br/>
                                <span 
                                  id="stateErrMsg"
                                  style={{color:"red"}}>
                                </span>
                              </td>
                            </tr>
                          </table>
                          </Accordion>
                        </div>
                        <div> 
                        <Accordion4 isOpen4={isOpen4} onChange={this.onChange4} label={"Add Additional Address"}>
                          <table>
                            <tr>
                              <td 
                                className={classes.cell3} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="addresstype2" 
                                  style={labelstyle}>
                                  Type of Address:
                                </label>
                              </td>
                              <td 
                                className={classes.cell4} 
                                style={{textAlign:"left"}}>
                                <select 
                                  style={textbxstyle2} 
                                  id="addresstype2" 
                                  name="addresstype2"
                                  >
                                    <option value="">Select Type</option>
                                    <option>Primary</option>
                                    <option>Billing</option>
                                    <option>Technical</option>
                                  </select>
                              </td>
                            </tr>
                            <tr>
                              <td 
                                className={classes.cell3} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="street2" 
                                  style={labelstyle}>
                                  Street:
                                </label>
                              </td>
                              <td 
                                className={classes.cell4} 
                                style={{textAlign:"left"}}>
                                <input 
                                  style={textbxstyle2} 
                                  type="text" 
                                  id="street2" 
                                  name="street2"
                                  />
                              </td>
                            </tr>
                            <tr>
                              <td 
                                className={classes.cell3} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="city2" 
                                  style={labelstyle}>
                                  City:
                                </label>
                              </td>
                              <td 
                                className={classes.cell4} 
                                style={{textAlign:"left"}}>
                                <input 
                                  style={textbxstyle2}  
                                  type="text" 
                                  id="city2" 
                                  name="city2"
                                  />
                              </td>
                            </tr>                           
                            <tr>
                              <td 
                                className={classes.cell3} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="zip2" 
                                  style={labelstyle}>
                                  Zip Code:
                                </label>
                              </td>
                              <td 
                                className={classes.cell4} 
                                style={{textAlign:"left"}}>
                                <input 
                                  style={textbxstyle2} 
                                  type="text" 
                                  id="zip2" 
                                  name="zip2"
                                  />
                              </td>
                            </tr>
                            <tr>
                              <td 
                                className={classes.cell3} 
                                style={{textAlign:"right"}}>
                                <label 
                                htmlFor="country" 
                                style={labelstyle}>
                                  Country:
                                </label>
                              </td>
                              <td 
                                className={classes.cell4} 
                                style={{textAlign:"left"}}>
                                <select id="country2" 
                                name="country2" 
                                onChange={this.selectState2} 
                                style={textbxstyle2}>
                                      <option value="">Select Country</option>
                                      <option value="AF">Afghanistan</option>
                                      <option value="AX">Aland Islands</option>
                                      <option value="AL">Albania</option>
                                      <option value="DZ">Algeria</option>
                                      <option value="AS">American Samoa</option>
                                      <option value="AD">Andorra</option>
                                      <option value="AO">Angola</option>
                                      <option value="AI">Anguilla</option>
                                      <option value="AQ">Antarctica</option>
                                      <option value="AG">Antigua and Barbuda</option>
                                      <option value="AR">Argentina</option>
                                      <option value="AM">Armenia</option>
                                      <option value="AW">Aruba</option>
                                      <option value="AU">Australia</option>
                                      <option value="AT">Austria</option>
                                      <option value="AZ">Azerbaijan</option>
                                      <option value="BS">Bahamas</option>
                                      <option value="BH">Bahrain</option>
                                      <option value="BD">Bangladesh</option>
                                      <option value="BB">Barbados</option>
                                      <option value="BY">Belarus</option>
                                      <option value="BE">Belgium</option>
                                      <option value="BZ">Belize</option>
                                      <option value="BJ">Benin</option>
                                      <option value="BM">Bermuda</option>
                                      <option value="BT">Bhutan</option>
                                      <option value="BO">Bolivia</option>
                                      <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                      <option value="BA">Bosnia and Herzegovina</option>
                                      <option value="BW">Botswana</option>
                                      <option value="BV">Bouvet Island</option>
                                      <option value="BR">Brazil</option>
                                      <option value="IO">British Indian Ocean Territory</option>
                                      <option value="BN">Brunei Darussalam</option>
                                      <option value="BG">Bulgaria</option>
                                      <option value="BF">Burkina Faso</option>
                                      <option value="BI">Burundi</option>
                                      <option value="KH">Cambodia</option>
                                      <option value="CM">Cameroon</option>
                                      <option value="CA">Canada</option>
                                      <option value="CV">Cape Verde</option>
                                      <option value="KY">Cayman Islands</option>
                                      <option value="CF">Central African Republic</option>
                                      <option value="TD">Chad</option>
                                      <option value="CL">Chile</option>
                                      <option value="CN">China</option>
                                      <option value="CX">Christmas Island</option>
                                      <option value="CC">Cocos (Keeling) Islands</option>
                                      <option value="CO">Colombia</option>
                                      <option value="KM">Comoros</option>
                                      <option value="CG">Congo</option>
                                      <option value="CD">Congo, the Democratic Republic of the</option>
                                      <option value="CK">Cook Islands</option>
                                      <option value="CR">Costa Rica</option>
                                      <option value="CI">Cote D'Ivoire</option>
                                      <option value="HR">Croatia</option>
                                      <option value="CU">Cuba</option>
                                      <option value="CW">Curacao</option>
                                      <option value="CY">Cyprus</option>
                                      <option value="CZ">Czech Republic</option>
                                      <option value="DK">Denmark</option>
                                      <option value="DJ">Djibouti</option>
                                      <option value="DM">Dominica</option>
                                      <option value="DO">Dominican Republic</option>
                                      <option value="EC">Ecuador</option>
                                      <option value="EG">Egypt</option>
                                      <option value="SV">El Salvador</option>
                                      <option value="GQ">Equatorial Guinea</option>
                                      <option value="ER">Eritrea</option>
                                      <option value="EE">Estonia</option>
                                      <option value="ET">Ethiopia</option>
                                      <option value="FK">Falkland Islands (Malvinas)</option>
                                      <option value="FO">Faroe Islands</option>
                                      <option value="FJ">Fiji</option>
                                      <option value="FI">Finland</option>
                                      <option value="FR">France</option>
                                      <option value="GF">French Guiana</option>
                                      <option value="PF">French Polynesia</option>
                                      <option value="TF">French Southern Territories</option>
                                      <option value="GA">Gabon</option>
                                      <option value="GM">Gambia</option>
                                      <option value="GE">Georgia</option>
                                      <option value="DE">Germany</option>
                                      <option value="GH">Ghana</option>
                                      <option value="GI">Gibraltar</option>
                                      <option value="GR">Greece</option>
                                      <option value="GL">Greenland</option>
                                      <option value="GD">Grenada</option>
                                      <option value="GP">Guadeloupe</option>
                                      <option value="GU">Guam</option>
                                      <option value="GT">Guatemala</option>
                                      <option value="GG">Guernsey</option>
                                      <option value="GN">Guinea</option>
                                      <option value="GW">Guinea-Bissau</option>
                                      <option value="GY">Guyana</option>
                                      <option value="HT">Haiti</option>
                                      <option value="HM">Heard Island and Mcdonald Islands</option>
                                      <option value="VA">Holy See (Vatican City State)</option>
                                      <option value="HN">Honduras</option>
                                      <option value="HK">Hong Kong</option>
                                      <option value="HU">Hungary</option>
                                      <option value="IS">Iceland</option>
                                      <option value="IN">India</option>
                                      <option value="ID">Indonesia</option>
                                      <option value="IR">Iran, Islamic Republic of</option>
                                      <option value="IQ">Iraq</option>
                                      <option value="IE">Ireland</option>
                                      <option value="IM">Isle of Man</option>
                                      <option value="IL">Israel</option>
                                      <option value="IT">Italy</option>
                                      <option value="JM">Jamaica</option>
                                      <option value="JP">Japan</option>
                                      <option value="JE">Jersey</option>
                                      <option value="JO">Jordan</option>
                                      <option value="KZ">Kazakhstan</option>
                                      <option value="KE">Kenya</option>
                                      <option value="KI">Kiribati</option>
                                      <option value="KP">Korea, Democratic People"s Republic of</option>
                                      <option value="KR">Korea, Republic of</option>
                                      <option value="XK">Kosovo</option>
                                      <option value="KW">Kuwait</option>
                                      <option value="KG">Kyrgyzstan</option>
                                      <option value="LA">Lao People's Democratic Republic</option>
                                      <option value="LV">Latvia</option>
                                      <option value="LB">Lebanon</option>
                                      <option value="LS">Lesotho</option>
                                      <option value="LR">Liberia</option>
                                      <option value="LY">Libyan Arab Jamahiriya</option>
                                      <option value="LI">Liechtenstein</option>
                                      <option value="LT">Lithuania</option>
                                      <option value="LU">Luxembourg</option>
                                      <option value="MO">Macao</option>
                                      <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                                      <option value="MG">Madagascar</option>
                                      <option value="MW">Malawi</option>
                                      <option value="MY">Malaysia</option>
                                      <option value="MV">Maldives</option>
                                      <option value="ML">Mali</option>
                                      <option value="MT">Malta</option>
                                      <option value="MH">Marshall Islands</option>
                                      <option value="MQ">Martinique</option>
                                      <option value="MR">Mauritania</option>
                                      <option value="MU">Mauritius</option>
                                      <option value="YT">Mayotte</option>
                                      <option value="MX">Mexico</option>
                                      <option value="FM">Micronesia, Federated States of</option>
                                      <option value="MD">Moldova, Republic of</option>
                                      <option value="MC">Monaco</option>
                                      <option value="MN">Mongolia</option>
                                      <option value="ME">Montenegro</option>
                                      <option value="MS">Montserrat</option>
                                      <option value="MA">Morocco</option>
                                      <option value="MZ">Mozambique</option>
                                      <option value="MM">Myanmar</option>
                                      <option value="NA">Namibia</option>
                                      <option value="NR">Nauru</option>
                                      <option value="NP">Nepal</option>
                                      <option value="NL">Netherlands</option>
                                      <option value="AN">Netherlands Antilles</option>
                                      <option value="NC">New Caledonia</option>
                                      <option value="NZ">New Zealand</option>
                                      <option value="NI">Nicaragua</option>
                                      <option value="NE">Niger</option>
                                      <option value="NG">Nigeria</option>
                                      <option value="NU">Niue</option>
                                      <option value="NF">Norfolk Island</option>
                                      <option value="MP">Northern Mariana Islands</option>
                                      <option value="NO">Norway</option>
                                      <option value="OM">Oman</option>
                                      <option value="PK">Pakistan</option>
                                      <option value="PW">Palau</option>
                                      <option value="PS">Palestinian Territory, Occupied</option>
                                      <option value="PA">Panama</option>
                                      <option value="PG">Papua New Guinea</option>
                                      <option value="PY">Paraguay</option>
                                      <option value="PE">Peru</option>
                                      <option value="PH">Philippines</option>
                                      <option value="PN">Pitcairn</option>
                                      <option value="PL">Poland</option>
                                      <option value="PT">Portugal</option>
                                      <option value="PR">Puerto Rico</option>
                                      <option value="QA">Qatar</option>
                                      <option value="RE">Reunion</option>
                                      <option value="RO">Romania</option>
                                      <option value="RU">Russian Federation</option>
                                      <option value="RW">Rwanda</option>
                                      <option value="BL">Saint Barthelemy</option>
                                      <option value="SH">Saint Helena</option>
                                      <option value="KN">Saint Kitts and Nevis</option>
                                      <option value="LC">Saint Lucia</option>
                                      <option value="MF">Saint Martin</option>
                                      <option value="PM">Saint Pierre and Miquelon</option>
                                      <option value="VC">Saint Vincent and the Grenadines</option>
                                      <option value="WS">Samoa</option>
                                      <option value="SM">San Marino</option>
                                      <option value="ST">Sao Tome and Principe</option>
                                      <option value="SA">Saudi Arabia</option>
                                      <option value="SN">Senegal</option>
                                      <option value="RS">Serbia</option>
                                      <option value="CS">Serbia and Montenegro</option>
                                      <option value="SC">Seychelles</option>
                                      <option value="SL">Sierra Leone</option>
                                      <option value="SG">Singapore</option>
                                      <option value="SX">Sint Maarten</option>
                                      <option value="SK">Slovakia</option>
                                      <option value="SI">Slovenia</option>
                                      <option value="SB">Solomon Islands</option>
                                      <option value="SO">Somalia</option>
                                      <option value="ZA">South Africa</option>
                                      <option value="GS">South Georgia and the South Sandwich Islands</option>
                                      <option value="SS">South Sudan</option>
                                      <option value="ES">Spain</option>
                                      <option value="LK">Sri Lanka</option>
                                      <option value="SD">Sudan</option>
                                      <option value="SR">Suriname</option>
                                      <option value="SJ">Svalbard and Jan Mayen</option>
                                      <option value="SZ">Swaziland</option>
                                      <option value="SE">Sweden</option>
                                      <option value="CH">Switzerland</option>
                                      <option value="SY">Syrian Arab Republic</option>
                                      <option value="TW">Taiwan, Province of China</option>
                                      <option value="TJ">Tajikistan</option>
                                      <option value="TZ">Tanzania, United Republic of</option>
                                      <option value="TH">Thailand</option>
                                      <option value="TL">Timor-Leste</option>
                                      <option value="TG">Togo</option>
                                      <option value="TK">Tokelau</option>
                                      <option value="TO">Tonga</option>
                                      <option value="TT">Trinidad and Tobago</option>
                                      <option value="TN">Tunisia</option>
                                      <option value="TR">Turkey</option>
                                      <option value="TM">Turkmenistan</option>
                                      <option value="TC">Turks and Caicos Islands</option>
                                      <option value="TV">Tuvalu</option>
                                      <option value="UG">Uganda</option>
                                      <option value="UA">Ukraine</option>
                                      <option value="AE">United Arab Emirates</option>
                                      <option value="GB">United Kingdom</option>
                                      <option value="US">United States</option>
                                      <option value="UM">United States Minor Outlying Islands</option>
                                      <option value="UY">Uruguay</option>
                                      <option value="UZ">Uzbekistan</option>
                                      <option value="VU">Vanuatu</option>
                                      <option value="VE">Venezuela</option>
                                      <option value="VN">Viet Nam</option>
                                      <option value="VG">Virgin Islands, British</option>
                                      <option value="VI">Virgin Islands, U.s.</option>
                                      <option value="WF">Wallis and Futuna</option>
                                      <option value="EH">Western Sahara</option>
                                      <option value="YE">Yemen</option>
                                      <option value="ZM">Zambia</option>
                                      <option value="ZW">Zimbabwe</option>
                                  </select>                                
                              </td>
                            </tr>
                            <tr> 
                              <td 
                                className={classes.cell3} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="state2" 
                                  style={labelstyle}>
                                  State/Province:
                                </label>
                              </td>
                              <td 
                                className={classes.cell4} 
                                style={{textAlign:"left"}}>
                                <input
                                  className={classes.combobox} 
                                  style={textbxstyle2} 
                                  type="text" 
                                  id="state2" 
                                  name="state2"
                                  />
                                  <select
                                  style={textbxstyle2}  
                                  id="stateselectUS2" 
                                  name="stateselectUS2"
                                  >
                                    <option value="">Select State</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                  </select>	
                                  <select
                                  className={classes.combobox} 
                                  id="stateselectCA2" 
                                  name="stateselectCA2"
                                  >
                                      <option value="">Select Province</option>
                                    	<option value="AB">Alberta</option>
                                      <option value="BC">British Columbia</option>
                                      <option value="MB">Manitoba</option>
                                      <option value="NB">New Brunswick</option>
                                      <option value="NL">Newfoundland and Labrador</option>
                                      <option value="NS">Nova Scotia</option>
                                      <option value="NT">Northwest Territories</option>
                                      <option value="NU">Nunavut</option>
                                      <option value="ON">Ontario</option>
                                      <option value="PE">Prince Edward Island</option>
                                      <option value="QC">Quebec</option>
                                      <option value="SK">Saskatchewan</option>
                                      <option value="YT">Yukon</option>
                                    </select>
                              </td>
                            </tr>
                          </table>
                      </Accordion4>
                      </div>                     
                      <div>
                      <Accordion2 isOpen2={isOpen2} onChange={this.onChange2} label={"Contact"}>
                          <br/>
                            <table>
                              <tr>
                                <td 
                                  id={classes.cell1}  
                                  style={{textAlign:"right"}}>
                                  <label 
                                    htmlFor="contacttype" 
                                    style={labelstyle}>
                                    Type of Contact:
                                  </label>
                                </td>
                                <td 
                                  className={classes.cell2} 
                                  style={{textAlign:"left", width:"30%"}}>
                                  <select 
                                    style={textbxstyle} 
                                    type="text" 
                                    id="contacttype" 
                                    name="contacttype"
                                    onBlur={this.contacttypeVal}
                                    >
                                    <option>Primary</option>
                                    <option>Billing</option>
                                    <option>Technical</option>
                                  </select>
                                    <br/>
                                    <span 
                                      id="contacttypeErrMsg"
                                      style={{color:"red"}}>
                                    </span>
                                </td>
                              </tr>           
                              <tr>
                                <td 
                                  id={classes.cell1}  
                                  style={{textAlign:"right"}}>
                                  <label 
                                    htmlFor="fname" 
                                    style={labelstyle}>
                                    First Name:
                                  </label>
                                </td>
                                <td 
                                  className={classes.cell2} 
                                  style={{textAlign:"left", width:"30%"}}>
                                  <input 
                                    style={textbxstyle}
                                    type="text" 
                                    id="fname" 
                                    name="fname"
                                    onBlur={this.fnameVal}
                                   />
                                  <br/>
                                  <span 
                                    id="fnameErrMsg"
                                    style={{color:"red"}}>
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td 
                                  className={classes.cell1} 
                                  style={{textAlign:"right"}}>
                                  <label 
                                    htmlFor="lname" 
                                    style={labelstyle}>
                                    Last Name:
                                  </label>
                                </td>
                                <td 
                                  className={classes.cell2} 
                                  style={{textAlign:"left"}}>
                                  <input 
                                    style={textbxstyle} 
                                    type="text" 
                                    id="lname" 
                                    name="lname"
                                    onBlur={this.lnameVal}
                                    />
                                  <br/>
                                  <span 
                                    id="lnameErrMsg"
                                    style={{color:"red"}}>
                                  </span>
                                </td>
                              </tr>               
                              <tr>
                                <td 
                                  className={classes.cell1} 
                                  style={{textAlign:"right"}}>
                                    <label 
                                      htmlFor="email" 
                                      style={labelstyle}>
                                      Email:
                                    </label>
                                </td>
                                <td 
                                  className={classes.cell2} 
                                  style={{textAlign:"left"}}>
                                  <input 
                                    style={textbxstyle} 
                                    type="text" 
                                    id="email" 
                                    name="email"
                                    onBlur={this.emailVal}                                   
                                    />
                                  <br/>
                                  <span 
                                    id="emailErrMsg"
                                    style={{color:"red"}}>
                                </span>
                                </td>
                              </tr>                
                              <tr>
                                <td 
                                  className={classes.cell1} 
                                  style={{textAlign:"right"}}>
                                  <label 
                                    htmlFor="phone" 
                                    style={labelstyle}>
                                    Phone:
                                  </label>
                                </td>
                                <td 
                                  className={classes.cell2} 
                                  style={{textAlign:"left"}}>
                                  <input 
                                    style={textbxstyle} 
                                    type="text" 
                                    id="phone" 
                                    name="phone"
                                    onBlur={this.phoneVal}
                                    />
                                  <br/>
                                  <span 
                                    id="phoneErrMsg"
                                    style={{color:"red"}}>
                                  </span>
                                </td>
                              </tr>
                            </table>
                            </Accordion2>
                          </div>
                          <div>
                        <Accordion5 isOpen5={isOpen5} onChange={this.onChange5} label={"Add Additional Contact"}>
                          <table>
                            <tr>
                              <td 
                                id={classes.cell1} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="contacttype2" 
                                  style={labelstyle}>
                                  Type of Contact:
                                </label>
                              </td>
                              <td 
                                className={classes.cell2} 
                                style={{textAlign:"left", width:"30%"}}>
                                <select 
                                  style={textbxstyle} 
                                  type="text" 
                                  id="contacttype2" 
                                  name="contacttype2"
                                  >
                                  <option value="">Select Type</option>
                                  <option>Primary</option>
                                  <option>Billing</option>
                                  <option>Technical</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <td 
                                id={classes.cell1} 
                                style={{textAlign:"right"}}>
                                <label 
                                  for="fname2" 
                                  style={labelstyle}>
                                  First Name:
                                </label>
                              </td>
                              <td 
                                className={classes.cell2} 
                                style={{textAlign:"left", width:"30%"}}>
                                <input 
                                  style={textbxstyle} 
                                  type="text" 
                                  id="fname2" 
                                  name="fname2"
                                  />
                              </td>
                            </tr>            
                            <tr>
                              <td 
                                className={classes.cell1} 
                                style={{textAlign:"right"}}>
                                <label 
                                  for="lname2" 
                                  style={labelstyle}>
                                  Last Name:
                                </label>
                              </td>
                              <td 
                                className={classes.cell2} 
                                style={{textAlign:"left"}}>
                                <input 
                                  style={textbxstyle} 
                                  type="text" 
                                  id="lname2" 
                                  name="lname2"
                                  />
                              </td>
                            </tr>
                            <tr>
                              <td 
                                className={classes.cell1} 
                                style={{textAlign:"right"}}>
                                <label htmlFor="email2" 
                                  style={labelstyle}>
                                  Email:
                                </label>
                              </td>
                              <td 
                                className={classes.cell2} 
                                style={{textAlign:"left"}}>
                                <input 
                                  style={textbxstyle} 
                                  type="text" 
                                  id="email2" 
                                  name="email2"
                                  onBlur={this.emailVal2}
                                  />
                                  <br/>
                                  <span 
                                    id="emailErrMsg2"
                                    style={{color:"red"}}>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td 
                                className={classes.cell1} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="phone2" 
                                  style={labelstyle}>
                                  Phone:
                                </label>
                              </td>
                              <td 
                                className={classes.cell2} 
                                style={{textAlign:"left"}}>
                                <input 
                                  style={textbxstyle} 
                                  type="text" 
                                  id="phone2" 
                                  name="phone2"
                                  />
                              </td>
                            </tr>
                          </table>
                      </Accordion5>
                      </div>
                      <Accordion3 isOpen3={isOpen3} onChange={this.onChange3} label={"Configuration Settings"}>
                        <div>  
                          <table>
                            <tr>
                              <td 
                                className={classes.cell14} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="ImgCapture" 
                                  style={labelstyle}>
                                  Image Capture Setting:
                                </label>
                              </td>
                              <td 
                                className={classes.cell15} 
                                style={{textAlign: "right"}}>
                                <label 
                                  style={labelstyle} 
                                  style={{paddingBottom: "0", color: "#3cB650"}}>
                                  No
                                </label>
                                  <br/>
                                <label 
                                  style={labelstyle} 
                                  style={{paddingBottom:"0", color: "#3cB650"}}>
                                  Yes
                                </label>
                                <br/>                               
                              </td>
                              <td 
                                className={classes.cell16} 
                                style={{textAlign:"center"}}>
                                <div>
                                  <label
                                    id="labelr" 
                                    className={classes.RadioButton}>
                                    <input type="radio" 
                                      name="imgCapture" 
                                      id="imgCaptureNo"
                                      value= "false"
                                      onChange={this.handleimgCapture} 
                                       />
                                    <span 
                                      className={classes.checkmark}>
                                    </span>
                                  </label>
                                    <label
                                      id="labelr" 
                                      className={classes.RadioButton}>
                                    <input 
                                      type="radio" 
                                      name="imgCapture" 
                                      id="imgCaptureYes" 
                                      value="true"
                                      onChange={this.handleimgCapture}
                                      />                                  
                                    <span 
                                      className={classes.checkmark}>  
                                    </span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <span 
                              id="imgCaptureErrMsg"
                              style={{color:"red"}}>
                            </span>
                          </table>
                          <table>
                            <tr>
                              <td 
                                className={classes.cell14} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="idCapture" 
                                  style={labelstyle}>
                                  ID Capture Setting:
                                </label>
                              </td>
                              <td 
                                className={classes.cell15} 
                                style={{textAlign: "right"}}>
                                <label 
                                  style={labelstyle} 
                                  style={{paddingBottom: "0", color: "#3cB650"}}>
                                  No
                                </label>
                                  <br/>
                                <label 
                                  style={labelstyle} 
                                  style={{paddingBottom:"0", color: "#3cB650"}}>
                                  Yes
                                </label>
                              </td>
                              <td 
                                className={classes.cell16} 
                                style={{textAlign:"center"}}>
                                <div>
                                  <label 
                                    id="labelr" 
                                    className={classes.RadioButton}>
                                    <input type="radio" 
                                      name="idCapture" 
                                      id="idCaptureNo"
                                      value="false"
                                      onChange={this.handleidCapture}  
                                       />
                                    <span 
                                      className={classes.checkmark}>
                                    </span>
                                  </label>
                                    <label
                                      id="labelr" 
                                      className={classes.RadioButton}>
                                    <input 
                                      type="radio" 
                                      name="idCapture" 
                                      id="idCaptureYes" 
                                      value="true"
                                      onChange={this.handleidCapture}
                                      />                                  
                                    <span 
                                      className={classes.checkmark}>  
                                    </span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <span 
                                id="idCaptureErrMsg"
                                style={{color:"red"}}>
                              </span>
                          </table>
                          <table>
                          <tr>
                            <td 
                              id={classes.cell1}  
                              style={{textAlign:"right"}}>
                              <label 
                                htmlFor="frameInterval" 
                                style={labelstyle}>
                                Frame Interval:
                              </label>
                            </td>
                            <td 
                              className={classes.cell2} 
                              style={{textAlign:"left", width:"30%"}}>
                              <input 
                                style={textbxstyle} 
                                type="text" 
                                id="frameinterval" 
                                name="frameinterval"
                                onBlur={this.frameintervalVal}                                
                                />
                              <br/>
                              <span 
                                id="frameintervalErrMsg"
                                style={{color:"red"}}>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td 
                              className={classes.cell1} 
                              style={{textAlign:"right"}}>
                              <label 
                                htmlFor="anomalyDuration" 
                                style={labelstyle}>
                                Anomaly Duration:
                              </label>
                            </td>
                            <td 
                              className={classes.cell2} 
                              style={{textAlign:"left"}}>
                              <input 
                                style={textbxstyle} 
                                type="text" 
                                id="anomalyduration" 
                                name="anomalyduration"
                                onBlur={this.anomalydurationVal}
                                />
                              <br/>
                              <span 
                                id="anomalydurationErrMsg"
                                style={{color:"red"}}>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td 
                              className={classes.cell1} 
                              style={{textAlign:"right"}}>
                              <label 
                                htmlFor="smoothingFrame" 
                                style={labelstyle}>
                                Smoothing Frame:
                              </label>
                            </td>
                            <td 
                              className={classes.cell2} 
                              style={{textAlign:"left"}}>
                              <input 
                                style={textbxstyle} 
                                type="text" 
                                id="smoothingframe" 
                                name="smoothingframe"
                                onBlur={this.smoothingframeVal}
                                />
                              <br/>
                              <span 
                                id="smoothingframeErrMsg"
                                style={{color:"red"}}>
                              </span>
                            </td>
                          </tr>
                          </table>
                          <table>
                          <tr>
                            <td 
                              className={classes.cell14} 
                              style={{textAlign:"right"}}>
                              <label 
                                htmlFor="geolocation" 
                                style={labelstyle}>
                                Geo-location(on/off):
                              </label>
                            </td>
                            <td className={classes.cell15}>
                            </td>
                            <td 
                              className={classes.cell16} 
                              style={{textAlign:"left"}}>
                              <label className={classes.switch}>
                                <input type="checkbox" id="geolocation" name="geolocation"/>
                                <span className={classes.slider}></span>
                              </label>
                              <br/>
                              <span 
                                id="geolocationErrMsg"
                                style={{color:"red"}}>
                              </span>
                            </td>
                          </tr>
                          </table>
                          <table>
                            <tr>
                              <td 
                                className={classes.cell14} 
                                style={{textAlign:"right"}}>
                                <label 
                                  htmlFor="geolocationreq" 
                                  style={labelstyle}>
                                  Geo-Location Required:
                                </label>
                              </td>
                              <td 
                                className={classes.cell15} 
                                style={{textAlign: "right"}}>
                                <label 
                                  style={labelstyle} 
                                  style={{paddingBottom: "0", color: "#3cB650"}}>
                                  No
                                </label>
                                  <br/>
                                <label 
                                  style={labelstyle} 
                                  style={{paddingBottom:"0", color: "#3cB650"}}>
                                  Yes
                                </label>
                              </td>
                              <td 
                                className={classes.cell16} 
                                style={{textAlign:"center"}}>
                                <div>
                                  <label 
                                    id="labelr" 
                                    className={classes.RadioButton}>
                                    <input type="radio" 
                                      name="geolocationreq" 
                                      id="geolocationNo"
                                      value="false"
                                       />
                                    <span 
                                      className={classes.checkmark}>
                                    </span>
                                  </label>
                                    <label
                                      id="labelr" 
                                      className={classes.RadioButton}>
                                    <input 
                                      type="radio" 
                                      name="geolocationreq" 
                                      id="geolocationYes" 
                                      value="true"
                                      />                                  
                                    <span 
                                      className={classes.checkmark}>  
                                    </span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            </table>
                            <table>
                            <tr>
                            <td 
                              className={classes.cell14} 
                              style={{textAlign:"right"}}>
                              <label 
                                htmlFor="testtakerscreen" 
                                style={labelstyle}>
                                Test-Taker Screen(on/off):
                              </label>
                            </td>
                            <td className={classes.cell15}>
                            </td>
                            <td 
                              className={classes.cell16} 
                              style={{textAlign:"left"}}>
                              <label className={classes.switch}>
                                <input type="checkbox" id="testtakerscreen" name="testtakerscreen"/>
                                <span className={classes.slider}></span>
                              </label>
                              <br/>
                              <span 
                                id="testtakerscreenErrMsg"
                                style={{color:"red"}}>
                              </span>
                            </td>
                          </tr>
                        </table>
                        </div>
                      </Accordion3>
                        <div className={classes.flexChild}>
                          <table>
                            <tr>
                              <td 
                                className={classes.cell7} 
                                style={{textAlign:"center", paddingRight: "2%", paddingTop:"2%"}}>
                                <input
                                  onClick={this.stateUpdate}
                                  type="submit" value="Submit" 
                                  style={buttonstyle}/>
                              </td>
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

export default withRouter(OrgForm);
