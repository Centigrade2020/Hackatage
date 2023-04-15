import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const TabProfile = () => {
    return <div>Profile</div>;
  };
  const TabBookings = () => {
    return <div>Bookings</div>;
  };

  const [tab, setTab] = useState(<TabBookings />);

  return (
    <div className="Dashboard">
      <div className="left">
        <ul>
          <li
            onClick={() => {
              setTab(<TabBookings />);
            }}
          >
            Bookings
          </li>
          <li
            onClick={() => {
              setTab(<TabProfile />);
            }}
          >
            Profile
          </li>
        </ul>
      </div>
      <div className="right">{tab}</div>
    </div>
  );
}

export default Dashboard;
