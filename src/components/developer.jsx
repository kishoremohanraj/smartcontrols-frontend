import React, { Component } from "react";
import Joi from "joi-browser";
import auth from "../services/auth";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";
import Input from "../components/input";
import { addDeveloperData } from "./../services/developerService";

class Developer extends Component {
  state = {
    data: {
      userId: auth.getCurrentUser()._id,
      time1: "09:00am",
      time2: "10:00am",
      date: "20-10-2020",
    },
    errors: {},
  };

  schema = {
    userId: Joi.string(),
    time1: Joi.string().required(),
    time2: Joi.string().required(),
    date: Joi.string().required(),
  };

  validate = () => {
    const options = { abortEarly: false };

    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path] = item.message;
    console.log(errors);
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    const user = auth.getCurrentUser();
    console.log(user);
    const data = { ...this.state.data };
    data.userId = user._id;
    await addDeveloperData(this.state.data);
    console.log("Submitted");
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
      />
    );
  }
  render() {
    const user = auth.getCurrentUser();
    return (
      <div>
        <h2>{`Hi ${user.name} , please enter your work timings below`}</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="container m-2">
            {this.renderInput("date", "Date :")}
            {this.renderInput("time1", "From: ")}
            {this.renderInput("time2", "To: ")}
          </div>
          <button type="submit" className="btn btn-primary m-2">
            Submit
          </button>
        </form>
        <Link to="/logout">
          <button className="btn-primary m-2">Logout</button>
        </Link>
      </div>
    );
  }
}

export default Developer;
