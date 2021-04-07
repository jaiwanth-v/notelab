import React, { useState } from "react";

interface Props {
  toggleNew: () => void;
}

const NameForm: React.FC<Props> = ({ toggleNew }) => {
  const [name, setName] = useState("");
  const handleNameForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    window.localStorage.setItem("joplin-name", name);
    toggleNew();
  };
  return (
    <div className="sync-form">
      <form>
        <img src="https://joplinapp.org/images/Icon512.png" alt="Joplin Logo" />
        <h2 className="sr-only">Login Form</h2>
        <div className="form-group">
          <h6> Enter your name to start collaboration</h6>{" "}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            type="text"
            name="token"
          />
        </div>
        <div className="form-group">
          <button
            onClick={handleNameForm}
            className="btn btn-primary btn-block"
            type="submit"
          >
            Start Collaboration
          </button>
        </div>
      </form>
    </div>
  );
};

export default NameForm;
