import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [budget, setBudget] = useState(1);
  const [recommendedData, setRecommendedData] = useState([
    {
      _id: "6424d2b113185d8420fdb6fc",
      plan: [
        {
          day: 1,
          activities: [
            {
              time: "9:00 AM",
              description: "Arrive in London and check-in to hotel",
            },
            {
              time: "11:00 AM",
              description: "Visit the British Museum",
            },
            {
              time: "2:00 PM",
              description: "Take a tour of the Tower of London",
            },
            {
              time: "6:00 PM",
              description: "Take a stroll through Hyde Park",
            },
          ],
        },
        {
          day: 2,
          activities: [
            {
              time: "9:00 AM",
              description: "Visit Buckingham Palace",
            },
            {
              time: "11:00 AM",
              description: "Explore the famous Trafalgar Square",
            },
            {
              time: "2:00 PM",
              description: "Have lunch at Covent Garden Market",
            },
            {
              time: "4:00 PM",
              description: "Visit the London Eye",
            },
            {
              time: "6:00 PM",
              description: "Take a walk along the River Thames",
            },
          ],
        },
        {
          day: 3,
          activities: [
            {
              time: "9:00 AM",
              description: "Visit the Houses of Parliament",
            },
            {
              time: "11:00 AM",
              description: "Take a tour of Westminster Abbey",
            },
            {
              time: "2:00 PM",
              description: "Visit the Tate Modern art museum",
            },
            {
              time: "5:00 PM",
              description: "Enjoy a traditional English afternoon tea",
            },
            {
              time: "7:00 PM",
              description: "Watch a musical performance at the West End",
            },
          ],
        },
      ],
      key: "3-london,uk",
    },
    {
      _id: "643a77f253614f54582430e4",
      plan: [
        {
          day: 1,
          activities: [
            {
              time: "9:00 AM",
              description: "Arrive in Chennai and check-in to hotel",
            },
            {
              time: "11:00 AM",
              description: "Visit Kapaleeswarar Temple",
            },
            {
              time: "1:00 PM",
              description: "Lunch at Saravana Bhavan",
            },
            {
              time: "3:00 PM",
              description: "Explore Fort St George",
            },
            {
              time: "7:00 PM",
              description: "Dinner at Raintree",
            },
          ],
        },
        {
          day: 2,
          activities: [
            {
              time: "9:00 AM",
              description: "Visit Marina Beach",
            },
            {
              time: "12:00 PM",
              description: "Lunch at Murugan Idli Shop",
            },
            {
              time: "2:00 PM",
              description: "Explore Government Museum",
            },
            {
              time: "6:00 PM",
              description: "Shopping at T Nagar",
            },
            {
              time: "8:00 PM",
              description: "Dinner at Annalakshmi",
            },
          ],
        },
        {
          day: 3,
          activities: [
            {
              time: "9:00 AM",
              description: "Visit Mahabalipuram",
            },
            {
              time: "1:00 PM",
              description: "Lunch at Moonrakers",
            },
            {
              time: "3:00 PM",
              description: "Explore Dakshina Chitra",
            },
            {
              time: "7:00 PM",
              description: "Dinner at Madras Pavilion",
            },
          ],
        },
        {
          day: 4,
          activities: [
            {
              time: "9:00 AM",
              description: "Visit Vadapalani Murugan Temple",
            },
            {
              time: "11:00 AM",
              description: "Shopping at Phoenix Marketcity",
            },
            {
              time: "1:00 PM",
              description: "Lunch at Pind Balluchi",
            },
            {
              time: "3:00 PM",
              description: "Explore Guindy National Park",
            },
            {
              time: "7:00 PM",
              description: "Dinner at Hamsa",
            },
          ],
        },
        {
          day: 5,
          activities: [
            {
              time: "9:00 AM",
              description: "Visit San Thome Basilica",
            },
            {
              time: "11:00 AM",
              description: "Shopping at Mylapore",
            },
            {
              time: "1:00 PM",
              description: "Lunch at Hotel Paragon",
            },
            {
              time: "3:00 PM",
              description: "Explore Birla Planetarium",
            },
            {
              time: "7:00 PM",
              description: "Dinner at Peshawri",
            },
          ],
        },
      ],
      key: "5-chennai,in",
    },
  ]);

  //   const options = {
  //     method: "GET",
  //     url: "https://ai-trip-planner.p.rapidapi.com/",
  //     params: { days: "3", destination: "Delhi,IN" },
  //     headers: {
  //       "X-RapidAPI-Key": "54fb866cd8mshb99f4f47ec1655ap117b34jsnd2baed40b395",
  //       "X-RapidAPI-Host": "ai-trip-planner.p.rapidapi.com",
  //     },
  //   };
  // useEffect (()=>{
  //   axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
  // },[])

  // useEffect(() => {
  //   fetch(
  //     "https://test.api.amadeus.com/v1/reference-data/recommended-locations?cityCodes=DEL&travelerCountryCode=FR",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": " application/vnd.amadeus+json ",
  //         Authorization: "Bearer UongRGzEZh1bbpTIPNepApHW7rNp",
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res.data);
  //       setRecommendedData(res.data);
  //     });
  // }, []);
  return (
    <div className="Home">
      <div className="columns">
        <div className="left">
          <h1>Popular packages</h1>
          {recommendedData.map((i, k) => (
            <></>
          ))}
          <div></div>
        </div>
        <div className="right">
          <div className="HrithikTab">
            <div className="content">
              <form action="">
                <label>
                  IATA code<input placeholder="IATA code"></input>
                </label>
                <label>
                  Destination Country
                  <input placeholder="Destination Country"></input>
                </label>
                <label>
                  1000{" "}
                  <input
                    placeholder="Budget"
                    type="range"
                    onChange={(e) => {
                      setBudget(e.target.value);
                      console.log(budget);
                    }}
                    title={budget * 1000}
                    min="1"
                    max="10"
                  ></input>
                  10000
                </label>
                <p>{budget * 1000}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
