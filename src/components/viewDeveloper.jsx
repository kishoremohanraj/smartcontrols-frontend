import React, { Component } from "react";
import { getDeveloperData } from "../services/developerService";
import { Link } from "react-router-dom";

class ViewDeveloper extends Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    const { data } = await getDeveloperData(this.props.match.params.id);
    this.setState({ data });
  }
  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Date:</th>
                <th>In Time:</th>
                <th>Out Time:</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((dev) => {
                  return (
                    <tr>
                      <td>{dev.date}</td>
                      <td>{dev.time1}</td>
                      <td>{dev.time2}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Link to="/manager">
          <button className="btn-primary m-2">Go Back</button>
        </Link>
      </>
    );
  }
}

export default ViewDeveloper;
