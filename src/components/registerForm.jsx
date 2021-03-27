import React from "react";
import joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" }, //always initialise the values of form to empty sting or value from server // react will give error if it null or undefined
    errors: {},
  };

  schema = {
    username: joi.string().required().email().label("Username"),
    password: joi.string().required().label("Password").min(5),
    name: joi.string().required().label("Name"),
  };

  doSubmit = () => {
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        {/*in react we will be overriding almost all the default fumctionality of form like we prevented default submit to server instead we will give our own logic to call server
               const username = document.getElementById('username').value;   //vanilla javascript // here we are using document. #DOM //but we dont want to use DOM in react because
               const username = this.username.current.value;  //access DOM from react using reference like username = React.createRef(); outside render and <input ref={this.password} inside form  // but we should refrain from using ref*/}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
