import React, { Component } from "react";
import auth from "../services/auth";
import http from "../services/httpService";
import { Link } from "react-router-dom";
class Manager extends Component {
  state = {
    data: {
      devs: [],
    },
  };

  async componentDidMount() {
    const apiEndpoint = "http://localhost:5000/api/users/devs";
    const { data: devs } = await http.get(apiEndpoint);
    const viewData = this.mapToView(devs);
    const data = { ...this.state.data };
    data.devs = viewData;
    this.setState({ data });
  }

  mapToView = (data) => {
    const returnData = [];
    for (let dev of data) {
      let element = {
        _id: dev._id,
        name: dev.name,
        email: dev.email,
        roleId: dev.roleId,
      };
      returnData.push(element);
    }
    return returnData;
  };

  render() {
    const user = auth.getCurrentUser();
    const { devs } = this.state.data;
    return (
      <>
        <div>
          <h2>{`Hi ${user.name} , you may view your employees timesheet below`}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {devs.map((dev) => {
                return (
                  <tr>
                    <Link to={`/viewDev/${dev._id}`}>
                      <td>{dev.name}</td>
                    </Link>
                    <td>{dev.email}</td>
                    <td>{dev.roleId}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link to="/logout">
            <button className="btn-primary m-2">Logout</button>
          </Link>
        </div>
      </>
    );
  }
}

export default Manager;
