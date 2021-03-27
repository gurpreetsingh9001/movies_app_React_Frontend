import React from "react";

const Input = ({ type, name, label, value, onChange, error }) => {
  return (
    <React.Fragment>
      {/* dynamic method for multiple inputs */}
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          type={type}
          className="form-control"
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>

      {/*
      simple method for single input
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          value={account.password}
          onChange={this.handleChange}
          name="password"
          id="password"
          type="text"
          className="form-control"
        />
      </div> */}
    </React.Fragment>
  );
};

export default Input;
