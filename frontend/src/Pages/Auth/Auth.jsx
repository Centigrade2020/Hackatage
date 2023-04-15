import { useState } from "react";
import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import authbg from "../../Assets/authbg.jpg";

import "./Auth.css";

function Auth() {
  const [newUser, setNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [lname, setLname] = useState("");
  const [fname, setFname] = useState("");
  const [passwd, setPasswd] = useState("");
  const [cnfPass, setCnfPass] = useState("");
  // const credentialResponse = {
  //   client_id:
  //     "983222062492-hg2nks96hdo66l7roqsgtltglblv0138.apps.googleusercontent.com",
  //   credential: "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",
  //   select_by: "btn",
  //   // redirect_uris: ["http://localhost:3000/auth/google/callback"],
  // };

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
  // client_id=304531247476-58f940f3b0dgrupg95cdo8b51fspupdv.apps.googleusercontent.com

  return (
    <div className="Auth">
      <GoogleOAuthProvider clientId="983222062492-hg2nks96hdo66l7roqsgtltglblv0138.apps.googleusercontent.com">
        <div className="authHeader">
          <img src={authbg} alt="authbg" />
          <div className="overlay"></div>
          <div className="content">
            <h1>
              Not all those who wander <br /> are lost
            </h1>
            <p>Login to get full access to our application</p>
          </div>

          {newUser ? (
            <div className="authCard">
              <h1>Signup</h1>
              <form>
                <label>
                  <p>Enter your email</p>{" "}
                  <input type="email" placeholder="Email" name="email" />
                </label>

                <div>
                  <label>
                    <p>First name</p>{" "}
                    <input type="text" placeholder="First name" name="fname" />
                  </label>
                  <label>
                    <p>Last name</p>{" "}
                    <input type="text" placeholder="Last name" name="lname" />
                  </label>
                </div>

                <label>
                  <p>Password</p>{" "}
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </label>

                <label>
                  <p>Confirm password</p>{" "}
                  <input
                    type="password"
                    placeholder="Confirm password"
                    name="cpassword"
                  />
                </label>
              </form>
              <button
                onClick={() => {
                  handleRegister();
                }}
              >
                Sign up
              </button>

              <p>
                Already signed up?{" "}
                <a
                  onClick={() => {
                    setNewUser(false);
                  }}
                >
                  Login
                </a>
              </p>

              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                width="500px"
              />
            </div>
          ) : (
            <div className="authCard">
              <h1>Login</h1>

              <form>
                <label>
                  <p>Enter your email</p>{" "}
                  <input type="email" placeholder="Email" name="email" />
                </label>
                <label>
                  <p>Enter your password</p>{" "}
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </label>
              </form>
              <button
                onClick={() => {
                  handleLogin();
                }}
              >
                Log in
              </button>

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
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                width="1000px"
              />
            </div>
          )}
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Auth;
