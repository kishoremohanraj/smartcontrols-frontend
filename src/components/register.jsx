import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import { registerUser } from "./../services/user";
import auth from "../services/auth";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      roleId: "",
    },
    errors: {},
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

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const response = await registerUser(this.state.data);
    auth.loginWithJwt(response.headers["x-auth-token"]);
    const userId = response.data._id;
    if (this.state.data.roleId === "manager") {
      window.location = "/manager";
    } else {
      window.location = "/developer";
    }
  };
  render() {
    const roles = [
      { _id: "developer", name: "Developer" },
      { _id: "manager", name: "Manager" },
    ];
    return (
      <div className="reg-form">
        <form onSubmit={this.handleSubmit}>
          <h1>Registration</h1>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSelect("roleId", "Role", roles)}
          <button type="submit" className="btn btn-primary m-2">
            {"Submit"}
          </button>
        </form>
        <h3 className="m-2">Already registered ? Click below to login.</h3>
        <Link to="/login">
          <button className="btn-primary m-2">Login</button>
        </Link>
      </div>
    );
  }
}

export default Register;
