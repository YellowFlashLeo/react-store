import React, { Component } from "react";

const Input = ({ type, name, label, value, onChange, error }) => {
  // we make reusable compoenent so that we dont need to deal with every signle filed in loginforms,
  // we can simply pass all params to the Input component and it will assign values depending on the params
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
