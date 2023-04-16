import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [profileData, setProfileData] = useState({});

  const [bookingData, setBookingData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/auth");
    }
  }, [localStorage.getItem("isAuthenticated")]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setProfileData({
        fname: JSON.parse(localStorage.getItem("user"))["fname"],
        lname: JSON.parse(localStorage.getItem("user"))["lname"],
        email: JSON.parse(localStorage.getItem("user"))["email"],
        month: "Mar",
      });
    }
  }, [localStorage.getItem("user")]);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/get_book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("user"))["email"],
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBookings(res["message"]);
      });
  }, []);
  // const [bookings, setBookings] = useState([
  //   {
  //     _id: "6424d2b113185d8420fdb6fc",
  //     name: "London trip",
  //     plan: [
  //       {
  //         day: 1,
  //         activities: [
  //           {
  //             time: "9:00 AM",
  //             description: "Arrive in London and check-in to hotel",
  //           },
  //           {
  //             time: "11:00 AM",
  //             description: "Visit the British Museum",
  //           },
  //           {
  //             time: "2:00 PM",
  //             description: "Take a tour of the Tower of London",
  //           },
  //           {
  //             time: "6:00 PM",
  //             description: "Take a stroll through Hyde Park",
  //           },
  //         ],
  //       },
  //       {
  //         day: 2,
  //         activities: [
  //           {
  //             time: "9:00 AM",
  //             description: "Visit Buckingham Palace",
  //           },
  //           {
  //             time: "11:00 AM",
  //             description: "Explore the famous Trafalgar Square",
  //           },
  //           {
  //             time: "2:00 PM",
  //             description: "Have lunch at Covent Garden Market",
  //           },
  //           {
  //             time: "4:00 PM",
  //             description: "Visit the London Eye",
  //           },
  //           {
  //             time: "6:00 PM",
  //             description: "Take a walk along the River Thames",
  //           },
  //         ],
  //       },
  //       {
  //         day: 3,
  //         activities: [
  //           {
  //             time: "9:00 AM",
  //             description: "Visit the Houses of Parliament",
  //           },
  //           {
  //             time: "11:00 AM",
  //             description: "Take a tour of Westminster Abbey",
  //           },
  //           {
  //             time: "2:00 PM",
  //             description: "Visit the Tate Modern art museum",
  //           },
  //           {
  //             time: "5:00 PM",
  //             description: "Enjoy a traditional English afternoon tea",
  //           },
  //           {
  //             time: "7:00 PM",
  //             description: "Watch a musical performance at the West End",
  //           },
  //         ],
  //       },
  //     ],
  //     key: "3-london,uk",
  //   },
  //   {
  //     _id: "6424d2b113185d8420fdb6fc",
  //     name: "London trip",
  //     plan: [
  //       {
  //         day: 1,
  //         activities: [
  //           {
  //             time: "9:00 AM",
  //             description: "Arrive in London and check-in to hotel",
  //           },
  //           {
  //             time: "11:00 AM",
  //             description: "Visit the British Museum",
  //           },
  //           {
  //             time: "2:00 PM",
  //             description: "Take a tour of the Tower of London",
  //           },
  //           {
  //             time: "6:00 PM",
  //             description: "Take a stroll through Hyde Park",
  //           },
  //         ],
  //       },
  //       {
  //         day: 2,
  //         activities: [
  //           {
  //             time: "9:00 AM",
  //             description: "Visit Buckingham Palace",
  //           },
  //           {
  //             time: "11:00 AM",
  //             description: "Explore the famous Trafalgar Square",
  //           },
  //           {
  //             time: "2:00 PM",
  //             description: "Have lunch at Covent Garden Market",
  //           },
  //           {
  //             time: "4:00 PM",
  //             description: "Visit the London Eye",
  //           },
  //           {
  //             time: "6:00 PM",
  //             description: "Take a walk along the River Thames",
  //           },
  //         ],
  //       },
  //       {
  //         day: 3,
  //         activities: [
  //           {
  //             time: "9:00 AM",
  //             description: "Visit the Houses of Parliament",
  //           },
  //           {
  //             time: "11:00 AM",
  //             description: "Take a tour of Westminster Abbey",
  //           },
  //           {
  //             time: "2:00 PM",
  //             description: "Visit the Tate Modern art museum",
  //           },
  //           {
  //             time: "5:00 PM",
  //             description: "Enjoy a traditional English afternoon tea",
  //           },
  //           {
  //             time: "7:00 PM",
  //             description: "Watch a musical performance at the West End",
  //           },
  //         ],
  //       },
  //     ],
  //     key: "3-london,uk",
  //   },
  // ]);

  const TabProfile = () => {
    const [disabled, setDisabled] = useState(true);

    const [fname, setFname] = useState(profileData.fname);
    const [lname, setLname] = useState(profileData.lname);
    const [email, setEmail] = useState(profileData.email);
    const [phone, setPhone] = useState(profileData.phone);
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
      fetch("http://localhost:8000/get_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((res) => {
          setPhone(res.message.phone);
          setDay(res.message.day);
          setMonth(res.message.month);
          setYear(res.message.year);
          setCity(res.message.city);
          setState(res.message.state);
          setCountry(res.message.country);
        });
    }, []);

    const updateProfile = () => {
      let content = {
        email: JSON.parse(localStorage.getItem("user"))["email"],
        phone,
        day,
        month,
        year,
        city,
        state,
        country,
      };
      fetch("http://localhost:8000/update_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      })
        .then((res) => res.json())
        .then((res) => {
          setPhone(res.message.phone);
          setDay(res.message.day);
          setMonth(res.message.month);
          setYear(res.message.year);
          setCity(res.message.city);
          setState(res.message.state);
          setCountry(res.message.country);
        });
    };

    return (
      <div className="TabProfile">
        <h1>
          Profile
          <button
            onClick={() => {
              if (!disabled) {
                updateProfile();
              }
              setDisabled(!disabled);
            }}
          >
            {disabled ? (
              <>
                <span class="material-symbols-outlined">edit</span> Edit
              </>
            ) : (
              <>
                <span class="material-symbols-outlined">save</span> Save
              </>
            )}
          </button>
        </h1>

        {/* <h2>Personal Information </h2> */}
        <form>
          <div>
            <label>
              <p>First name</p>{" "}
              <input
                type="text"
                placeholder="First name"
                name="fname"
                disabled={disabled}
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                }}
              />
            </label>
            <label>
              <p>Last name</p>{" "}
              <input
                type="text"
                placeholder="Last name"
                name="lname"
                disabled={disabled}
                value={lname}
                onChange={(e) => {
                  setLname(e.target.value);
                }}
              />
            </label>
          </div>

          <div>
            <label>
              <p>Email</p>{" "}
              <input
                type="text"
                placeholder="Email"
                name="email"
                disabled={true}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>

            <label>
              <p>Phone number</p>{" "}
              <input
                type="number"
                placeholder="Phone number"
                name="phone"
                disabled={disabled}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </label>
          </div>

          <div>
            <label>
              <p>Date of birth</p>
              <div>
                {/* <input
                  type="text"
                  name="day"
                  placeholder="Day"
                  disabled={disabled}
                  value={day}
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                /> */}
                <select
                  name="day"
                  id="day"
                  disabled={disabled}
                  value={day}
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                >
                  <option value="Day" selected>
                    Day
                  </option>
                  {[...Array(31)].map((i, k) => (
                    <option value={k + 1} key={k}>
                      {k + 1}
                    </option>
                  ))}
                </select>
                <select
                  name="month"
                  id="month"
                  disabled={disabled}
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                  }}
                >
                  <option value="month" selected>
                    Month
                  </option>
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                  <option value="Apr">Apr</option>
                  <option value="May">May</option>
                  <option value="Jun">Jun</option>
                  <option value="Jul">Jul</option>
                  <option value="Aug">Aug</option>
                  <option value="Sep">Sep</option>
                  <option value="Oct">Oct</option>
                  <option value="Nov">Nov</option>
                  <option value="Dec">Dec</option>
                </select>
                <input
                  type="text"
                  name="year"
                  placeholder="Year"
                  disabled={disabled}
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
              </div>
            </label>
          </div>

          <div>
            <label>
              <p>Location</p>
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  disabled={disabled}
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  disabled={disabled}
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  disabled={disabled}
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
              </div>
            </label>
          </div>
        </form>
      </div>
    );
  };

  const TabBookings = () => {
    return (
      <div className="TabBookings">
        <h1>My bookings</h1>

        <div className="bookings">
          {bookings.map((obj, i) => (
            <Booking obj={obj} key={i} />
          ))}
        </div>
      </div>
    );
  };

  const Booking = ({ obj }) => {
    console.log(obj);
    const [showPlan, setShowPlan] = useState(false);
    return (
      <div className="Booking">
        <div className="bheader">
          <label>
            <h3>Trip Name</h3>
            <p>{obj.key}</p>
          </label>
          <label>
            <h3>Booking ID</h3>
            <p>{obj._id}</p>
          </label>
          <div className="bbuttons">
            <button
              onClick={() => {
                setShowPlan(!showPlan);
              }}
            >
              {!showPlan ? (
                <>
                  <span class="material-symbols-outlined">visibility</span>
                  Show plan
                </>
              ) : (
                <>
                  <span class="material-symbols-outlined">visibility_off</span>
                  Hide plan
                </>
              )}
            </button>
            <button>
              <span class="material-symbols-outlined">share</span> Share
            </button>
          </div>
        </div>
        <div className="dayRows">
          {showPlan &&
            obj.plan.map((day, i) => (
              <div className="dayRow" key={i}>
                <p>
                  <p>Day</p> <p>{day.day}</p>
                </p>
                <div className="activities">
                  {day.activities.map((activity, k) => (
                    <div className="activity">
                      <p>{activity.time}</p>
                      <h3>{activity.description}</h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const [tab, setTab] = useState("bookings");

  return (
    <div className="Dashboard">
      <div className="left">
        <ul>
          <li
            onClick={() => {
              setTab("bookings");
            }}
            className={tab == "bookings" ? "dtabActive" : "dtab"}
          >
            <span className="material-symbols-outlined">description</span>{" "}
            Bookings{" "}
            {tab == "bookings" && (
              <span className="material-symbols-outlined sendRight">
                arrow_left
              </span>
            )}
          </li>
          <li
            onClick={() => {
              setTab("profile");
            }}
            className={tab == "profile" ? "dtabActive" : "dtab"}
          >
            <span className="material-symbols-outlined">person</span> Profile{" "}
            {tab == "profile" && (
              <span className="material-symbols-outlined sendRight">
                arrow_left
              </span>
            )}
          </li>
        </ul>
      </div>
      <div className="right">
        {tab == "bookings" ? (
          <TabBookings />
        ) : tab == "profile" ? (
          <TabProfile />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
