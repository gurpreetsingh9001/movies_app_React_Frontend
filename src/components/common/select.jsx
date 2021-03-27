import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  //here we have used ...rest which is similar to 'props' but used to avoid confusion for full props to partial props
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {/* 'Select' dont work somehow so i used 'select' */}
      <select {...rest} name={name} id={name} className="form-control">
        <option value="dfg" /> {/* first empty option */}
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
