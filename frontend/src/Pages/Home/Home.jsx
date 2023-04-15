import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [state, setState] = useState(false);
  const Tab = () => {
    return <div>Tab</div>;
  };
  return (
    <div className="Home">
      <div className="left">
        <h1>Popular packages</h1>
      </div>
      <div className="right">
        <button
          onClick={() => {
            setState(true);
          }}
        >
          Plan your trip now
        </button>
      </div>

      {state && (
        <div className="HrithikTab">
          <button
            onClick={() => {
              setState(false);
            }}
          >
            close
          </button>
          <div className="content">
            <p>---</p>
            <p>---</p>
            <p>---</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
