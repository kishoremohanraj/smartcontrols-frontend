import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import auth from "../services/auth";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        errors={errors}
        type={type}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  handleSubmit = async (e) => {
    console.log("Submitted");
    e.preventDefault();
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      console.log(auth.getCurrentUser());
      let currentUser = auth.getCurrentUser();
      if (currentUser.roleId === "manager") {
        window.location = "/manager";
      } else {
        window.location = "/developer";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          <button type="submit" className="btn btn-primary m-2">
            {"Login"}
          </button>
        </form>
        <h3 className="m-2">New user ? Click below to register.</h3>
        <Link to="/register">
          <button className="btn-primary m-2">Register</button>
        </Link>
      </div>
    );
  }
}

export default Login;
