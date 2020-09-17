import React from "react";

export default function (args) {
  return (
    <div className="page">
      <div className="banner">
        <h1>Welcome to Compare.</h1>
      </div>
      <div className="search_area">
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
