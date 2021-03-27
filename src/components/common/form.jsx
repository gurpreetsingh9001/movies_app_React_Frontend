import { Component } from "react";
import joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    //look for the object schema returned by joi library on error and non error so to use what we need
    const result = joi.validate(this.state.data, this.schema, options); //here either we can use result or {error} which is key in result object  //here i used result //used {error} in validateProperty()
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  //so fetch only that property dynamically from that full form and schema
  validateProperty({ name, value }) {
    //e>currentTarget>attributes if we use e. or currentTarget it will fetch all attributes of tag, or like in here we only fetched what we needed
    const property = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(property, schema);
    return error ? error.details[0].message : null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} }); //if there are no errors than setState will be called for null/undefined and thus code will fail to prevent it we need to set state to empty object so there is no fail
    this.doSubmit();
  };

  handleChange = ({ currentTarget }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(currentTarget);
    if (errorMessage) errors[currentTarget.name] = errorMessage;
    else delete errors[currentTarget.name]; //if recent name was not valid but now it edited correctly the error should disappear

    const data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    this.setState({ data, errors: errors || {} });
  };

  renderInput(name, label, type = "text") {
    //used default argument for type because most of types are text
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
