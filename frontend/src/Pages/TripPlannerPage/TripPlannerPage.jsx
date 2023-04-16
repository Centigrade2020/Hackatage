import React, { useState } from "react";
import "./TripPlannerPage.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import XMLParser from "react-xml-parser";

function TripPlannerPage(props) {
  const location = useLocation();
  const [obj, setObj] = useState(location.state.data);
  const [flight, setFlight] = useState([]);
  const [hotel, setHotel] = useState({
    name: "RR Mount Elite Suites",
    link: "https://www.booking.com/hotel/in/rr-mount-elite-suites.de.html?aid=1938431",
    rating: 9,
  });
  // const [hotel, setHotel] = useState(undefined);
  const [showFlight, setShowFlight] = useState(true);
  // const [showHotel, setShowHotel] = useState(true);

  const [selectedFlight, setSelectedFlight] = useState(undefined);

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [apCodeF, setApCodeF] = useState("");
  const [apCodeT, setApCodeT] = useState("");

  const options1 = {
    method: "GET",
    url: "https://best-booking-com-hotel.p.rapidapi.com/booking/best-accommodation",
    params: { cityName: city, countryName: country },
    headers: {
      "X-RapidAPI-Key": "ce1ae727ccmshd78f2330d2840b5p1e148cjsn4d64fcc67e18",
      "X-RapidAPI-Host": "best-booking-com-hotel.p.rapidapi.com",
    },
  };
  const hotelData = () => {
    axios
      .request(options1)
      .then(function (response) {
        console.log(response.data);
        setHotel(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const options = {
    method: "GET",
    url: `https://timetable-lookup.p.rapidapi.com/TimeTable/${apCodeF}/${apCodeT}/20230420/`,
    params: { Results: "3", Max_Results: "3" },
    headers: {
      "X-RapidAPI-Key": "54fb866cd8mshb99f4f47ec1655ap117b34jsnd2baed40b395",
      "X-RapidAPI-Host": "timetable-lookup.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };
  const flightData = () => {
    axios
      .request(options)

      .then(function (response) {
        var xml = new XMLParser().parseFromString(response.data);
        console.log(xml["children"].slice(2));
        setFlight(xml["children"].slice(2));
      })
      .then((res) => {
        setShowFlight(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleFixPlan = () => {
    if (selectedFlight != undefined && hotel != undefined) {
      const data = obj;
      data["flight"] = selectedFlight;
      data["hotel"] = hotel;
      data["email"] = JSON.parse(localStorage.getItem("user"))["email"];
      // axios.post(f)
      fetch("http://localhost:8000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => new Notification("Booked Plan Succesfully !"));
    }
  };

  return (
    <div className="TripPlannerPage">
      {/* {travelData.plan.map((i, k) => (
        <>
          <h1>{i.day}</h1>
          {i.activities.map((i1, k1) => (
            <>
              <h1>{i1.time}</h1>
              <h1>{i1.description}</h1>
            </>
          ))}
        </>
      ))} */}
      <div className="Plan">
        <div className="bheader">
          <label>
            <h3>Trip Name</h3>
            <p>{obj.key}</p>
          </label>
          <label>
            <h3>Booking ID</h3>
            <p>{obj._id}</p>
          </label>
        </div>
        <div className="dayRows">
          {obj.plan.map((day, i) => (
            <div className="dayRow" key={i}>
              <p>
                <p>Day</p> <p>{day.day}</p>
              </p>
              <div className="activities">
                {day.activities.map((activity, k) => (
                  <div className="activity" key={k}>
                    <p>{activity.time}</p>
                    <h3>{activity.description}</h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="searchTab">
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          placeholder="City"
        />
        <input
          type="text"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          placeholder="Country"
        />
        <input
          type="text"
          value={apCodeF}
          onChange={(e) => {
            setApCodeF(e.target.value);
          }}
          placeholder="Airport code (From)"
        />

        <input
          type="text"
          value={apCodeT}
          onChange={(e) => {
            setApCodeT(e.target.value);
          }}
          placeholder="Airport code (To)"
        />

        <div className="tab">
          <p>{}</p>
          <button
            onClick={() => {
              showFlight && flightData();
            }}
          >
            <span className="material-symbols-outlined">flight</span> Search
            Flight
          </button>
        </div>
        <div className="tab">
          <p>{}</p>
          <button
            onClick={() => {
              hotelData();
            }}
          >
            <span className="material-symbols-outlined">hotel</span> Search
            Hotel
          </button>
        </div>
      </div>
      <div className="searchDisplay">
        <div className="sdTabF">
          {flight.map((index, key) => (
            <div className="flight" key={key}>
              {index.children.map((val, ke) => (
                <div className="Fheader" key={ke}>
                  <label>
                    <h3>UUID</h3>
                    <p>{val.attributes.FLSUUID}</p>
                  </label>
                  <label>
                    <h3>Company</h3>
                    <p>{val.children[2].attributes.CompanyShortName}</p>
                  </label>
                </div>
              ))}
              {/* <p>{index.attributes.TotalFlightTime}</p> */}
              {/* <p>{index.attributes.FLSDepartureCode}</p> */}
              <div className="FdetailRow">
                <label>
                  <h3>Departure DateTime</h3>
                  <p>{index.attributes.FLSDepartureDateTime}</p>
                </label>
                <label>
                  <h3>FLSDeparture Name</h3>
                  <p>{index.attributes.FLSDepartureName}</p>
                </label>
              </div>
              <div className="FdetailRow">
                <label>
                  <h3>Arrival DateTime</h3>
                  <p>{index.attributes.FLSArrivalDateTime}</p>
                </label>
                <label>
                  <h3>Arrival Name</h3>
                  <p>{index.attributes.FLSArrivalName}</p>
                </label>
              </div>
              <div className="FdetailRow">
                <label>
                  <h3>Flight Type</h3>
                  <p>{index.attributes.FLSFlightType}</p>
                </label>
                <label>
                  <h3>Flight Legs</h3>
                  <p>{index.attributes.FLSFlightLegs}</p>
                </label>
              </div>

              {/* <p>{index.attributes.FLSArrivalCode}</p> */}

              <br></br>
              <button
                className={selectedFlight == index ? "fbSelected" : "fb"}
                onClick={() => {
                  setSelectedFlight(index);
                }}
              >
                Fix this plane
              </button>
            </div>
          ))}
        </div>
        <div className="sdTabH">
          {hotel != undefined && (
            <>
              <label>
                <h3>Name</h3>
                <p>{hotel.name}</p>
              </label>
              <label>
                <h3>Rating</h3>
                <p>{hotel.rating}</p>
              </label>
              <label>
                <h3></h3>
                <p>
                  <a href={hotel.link}>Click to book</a>
                </p>
              </label>
            </>
          )}
        </div>
      </div>

      <div className="FixButton">
        <button
          onClick={() => {
            handleFixPlan();
          }}
        >
          Fix this plan
        </button>
      </div>
    </div>
  );
}

export default TripPlannerPage;
