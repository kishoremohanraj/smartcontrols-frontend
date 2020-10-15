import React from "react";
import auth from "../services/auth";
import { Link } from "react-router-dom";

console.log(auth.getCurrentUser());
const Manager = () => {
  const user = auth.getCurrentUser();
  return (
    <>
      <div>
        <h2>{`Hi ${user.name} , you may view your employees timesheet below`}</h2>
        <Link to="/logout">
          <button className="btn-primary m-2">Logout</button>
        </Link>
      </div>
    </>
  );
};

export default Manager;
