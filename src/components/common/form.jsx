import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = { data: {}, errors: {} };
  validate = () => {
    const option = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, option); // we are comparing our schema with all properties of data object
    if (!result.error) return null; // if no errors return empty object

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message; // for each item of details array we have 2 properties path and message
    return errors;
  };

  validatePoperty = ({ name, value }) => {
    const obj = { [name]: value }; // at run time name of the property(username,password or something else) will be set
    // depending on which field user is typing to and assign value to it of what he typed
    const schema = { [name]: this.schema[name] }; // we take only one property from our schema since we are comparing it with one input
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = (e) => {
    e.preventDefault(); // this prevents submitting from to the server since it causes full page reload

    const errors = this.validate(); // will return object with propertis=usersinput which are wrong
    console.log(errors);
    this.setState({ errors: errors || {} }); // if errors object which we got from validate method is empty than we set errors in state to emty object, otherwise we get null error
    if (errors) return; // if there are errors then retun immediatly without calling the server
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    // we renamed currentTraget to input so that it is easier to understand
    const errors = { ...this.state.errors };
    const errorMessage = this.validatePoperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    // if name is usernamme then we sent it to errorMessage
    // shows error under input filed to the user
    else delete errors[input.name]; // if not error was found simply dont show anything

    const data = { ...this.state.data }; // we clone current data object
    data[input.name] = input.value; // change its username and password( []refers to all properties of the data) to what user has typed
    this.setState({ data, errors }); // and reset state
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    return (
      <Input
        type={type}
        name={name}
        value={this.state.data[name]}
        label={label}
        onChange={this.handleChange}
        error={this.state.errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    return (
      <Select
        name={name}
        value={this.state.data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={this.state.errors[name]}
      />
    );
  }
}

export default Form;
