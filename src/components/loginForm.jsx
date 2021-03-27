import React, { Component } from "react";
import joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" }, //always initialise the values of form to empty sting or value from server // react will give error if it null or undefined
    errors: {},
  };

  //full schema of our form
  schema = {
    username: joi.string().required().label("Username"),
    passoword: joi.string().required().label("Password"),
  };

  //full form validation
  validate = () => {
    const options = { abortEarly: false };
    //look for the object schema returned by joi library on error and non error so to use what we need
    const result = joi.validate(this.state.account, this.schema, options); //here either we can use result or {error} which is key in result object  //here i used result //used {error} in validateProperty()
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  //handle one property //so fetch only that property dynamically from that full form and schema
  validateProperty({ name, value }) {
    //e>currentTarget>attributes if we use e. or currentTarget it will fetch all attributes of tag, or like in here we only fetched what we needed
    const property = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(property, schema);
    return error ? error.details[0].message : null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //const username = document.getElementById('username').value;   //vanilla javascript // here we are using document. #DOM //but we dont want to use DOM in react because
    //const username = this.username.current.value;  //access DOM from react using reference like username = React.createRef(); outside render and <input ref={this.password} inside form  // but we should refrain from using ref
    const errors = this.validate();
    this.setState({ errors: errors || {} }); //if there are no errors than setState will be called for null/undefined and thus code will fail to prevent it we need to set state to empty object so there is no fail
  };

  handleChange = ({ currentTarget }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(currentTarget);
    if (errorMessage) errors[currentTarget.name] = errorMessage;
    else delete errors[currentTarget.name]; //if recent name was not valid but now it edited correctly the error should disappear

    const account = { ...this.state.account };
    account[currentTarget.name] = currentTarget.value;
    this.setState({ account, errors: errors || {} });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        {/*in react we will be overriding almost all the default fumctionality of form like we prevented default submit to server instead we will give our own logic to call server*/}
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
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
