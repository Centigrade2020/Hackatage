import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const TabProfile = () => {
    const [disabled, setDisabled] = useState(true);
    return (
      <div className="TabProfile">
        <h1>Profile</h1>

        <div>
          <h2>
            Personal Information{" "}
            <button
              onClick={() => {
                setDisabled(!disabled);
              }}
            >
              Edit Profile
            </button>
          </h2>
          <form>
            <label>
              <p>First name</p>{" "}
              <input
                type="text"
                placeholder="First name"
                name="fname"
                disabled={disabled}
              />
            </label>
            <label>
              <p>Last name</p>{" "}
              <input
                type="text"
                placeholder="Last name"
                name="lname"
                disabled={disabled}
              />
            </label>

            <label>
              <p>Email</p>{" "}
              <input
                type="text"
                placeholder="Email"
                name="email"
                disabled={true}
              />
            </label>

            <label>
              <p>Phone number</p>{" "}
              <input
                type="number"
                placeholder="Phone number"
                name="phone"
                disabled={disabled}
              />
            </label>

            <label>
              <p>Date of birth</p>
              <div>
                <input
                  type="text"
                  name="day"
                  placeholder="Day"
                  disabled={disabled}
                />
                <select name="month" id="month" disabled={disabled}>
                  <option value="month" selected>
                    Month
                  </option>
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                </select>
                <input
                  type="text"
                  name="year"
                  placeholder="Year"
                  disabled={disabled}
                />
              </div>
            </label>

            <label>
              <p>Location</p>
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  disabled={disabled}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  disabled={disabled}
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  disabled={disabled}
                />
              </div>
            </label>
          </form>
        </div>
      </div>
    );
  };
  const TabBookings = () => {
    return <div className="TabBookings">Bookings</div>;
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
