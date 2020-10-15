import React from "react";
import auth from "../services/auth";
import { Link } from "react-router-dom";

const Developer = () => {
  const user = auth.getCurrentUser();
  return (
    <>
      <div>
        <h2>{`Hi ${user.name} , please enter your work timings below`}</h2>
        <Link to="/logout">
          <button className="btn-primary m-2">Logout</button>
        </Link>
      </div>
    </>
  );
};

export default Developer;
