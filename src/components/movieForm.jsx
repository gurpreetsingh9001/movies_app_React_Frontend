import React from "react";

const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>MovieForm {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onCLick={() => history.push("/movies")} //not going back to movies as of now
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
