/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./LoginForm.scss";
interface Props {
  toggleNew: () => void;
}

const LoginForm: React.FC<Props> = ({ toggleNew }) => {
  const [port, setPort] = useState(41184);
  const [token, setToken] = useState("");
  const setLocal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.localStorage.setItem("Notelia-sync", "on");
    window.localStorage.setItem("Notelia-token", token);
    window.localStorage.setItem("Notelia-url", "http://localhost:" + port);
    toggleNew();
  };
  const setDemo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.localStorage.setItem("Notelia-sync", "off");
    toggleNew();
  };
  const handlePort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPort(Number(e.target.value));
  };
  const handleToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };
  return (
    <div className="sync-form">
      <form>
        <img src="https://Noteliaapp.org/images/Icon512.png" alt="Notelia Logo" />
        <h2 className="sr-only">Login Form</h2>
        <div className="form-group">
          <h6> Authorization Token: </h6>{" "}
          <input
            value={token}
            onChange={handleToken}
            className="form-control"
            type="text"
            name="token"
          />
        </div>
        <div className="form-group">
          <h6> Service Port: </h6>
          <input
            className="form-control"
            onChange={handlePort}
            value={port}
            type="number"
            name="port"
          />
        </div>
        <div className="form-group">
          <button
            onClick={setLocal}
            className="btn btn-primary btn-block"
            type="submit"
          >
            Fetch Notebooks
          </button>
        </div>
        <a onClick={setDemo} className="demo-option">
          Test the demo version
        </a>
      </form>
    </div>
  );
};

export default LoginForm;
