import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" }, //always initialise the values of form to empty sting or value from server // react will give error if it null or undefined
    errors: {},
  };

  //validate full form
  validate = () => {
    const errors = {};
    if (this.state.account.username.trim() === "")
      errors.username = "Username is required";
    if (this.state.account.password.trim() === "")
      errors.password = "Password is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //const username = document.getElementById('username').value;   //vanilla javascript // here we are using document. #DOM //but we dont want to use DOM in react because
    //const username = this.username.current.value;  //access DOM from react using reference like username = React.createRef(); outside render and <input ref={this.password} inside form  // but we should refrain from using ref
    const errors = this.validate();
    this.setState({ errors: errors || {} }); //if there are no errors than setState will be called for null/undefined and thus code will fail to prevent it we need to set state to empty object so there is no fail
  };

  // cumbersome implementation
  // validateProperty=currentTarget => {
  //   if(currentTarget.name==='username')
  //     if(currentTarget.value.trim()==='') return 'Username is req';
  // }

  //handle one property
  //shorter implementation
  validateProperty({ value, name }) {
    if (name === "username") if (value.trim === "") return "username req";
    if (name === "pass") if (value.trim === "") return "pass req";
  }

  handleChange = ({ currentTarget }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(currentTarget);
    if (errorMessage) errors[currentTarget.name] = errorMessage;
    else delete errors[currentTarget.name]; //if recent name was not valid but now it edited correctly the error should disappear

    const account = { ...this.state.account };
    account[currentTarget.name] = currentTarget.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        {/*in react we will be overriding almost all the default fumctionality of form*/}
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
