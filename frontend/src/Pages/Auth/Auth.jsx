import { useState } from "react";
import React from "react";
import "./Auth.css";

function Auth() {
  const [newUser, setNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [lname, setLname] = useState("");
  const [fname, setFname] = useState("");
  const [passwd, setPasswd] = useState("");
  const [cnfPass, setCnfPass] = useState("");

  const handleRegister = () => {
    const content = {
      fname,
      lname,
      email,
      passwd,
    };

    fetch("http://localhost:8000/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const handleLogin = () => {
    const content = {
      email,
      passwd,
    };

    fetch("http://localhost:8000/login_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <div className="Auth">
      {newUser ? (
        <>
          <form>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            ></input>
            <input
              placeholder="First Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              name="fname"
            ></input>
            <input
              placeholder="Last Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              name="lname"
            ></input>
            <input
              placeholder="Password"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
              name="password"
            ></input>
            <input
              placeholder="Confirm password"
              value={cnfPass}
              onChange={(e) => setCnfPass(e.target.value)}
              name="cpassword"
            ></input>
          </form>
          <button
            onClick={() => {
              handleRegister();
            }}
          >
            Login
          </button>

          <p>
            Already signed up?{" "}
            <a
              onClick={() => {
                setNewUser(false);
              }}
            >
              Sign Up
            </a>
          </p>
        </>
      ) : (
        <>
          <form>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            ></input>
            <input
              placeholder="Password"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
              name="password"
            ></input>
          </form>
          <button onClick={handleLogin}>Log in</button>

          <p>
            Not signed up?{" "}
            <a
              onClick={() => {
                setNewUser(true);
              }}
            >
              Signup
            </a>
          </p>
        </>
      )}
      <button>Login with Google</button>
    </div>
  );
}

export default Auth;
