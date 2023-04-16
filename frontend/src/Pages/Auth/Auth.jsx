import { useEffect, useState } from "react";
import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import authbg from "../../Assets/authbg.jpg";

import "./Auth.css";

function Auth() {
  const [newUser, setNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [lname, setLname] = useState("");
  const [fname, setFname] = useState("");
  const [passwd, setPasswd] = useState("");
  const [cnfPass, setCnfPass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/");
      window.location.reload();
    }
  }, []);
  Notification.requestPermission();
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
      .then((res) => {
        console.log(res);
        if (res.status_code === 403) {
          window.alert(res.message);
        } else if (res.status_code === 500) {
          window.alert(res.message);
        } else {
          new Notification("User created successfully!");
          setNewUser(false);
        }
      });
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
      .then((res) => {
        console.log(res);
        if (res.status_code === 403) {
          window.alert(res.message);
        } else if (res.status_code === 500) {
          window.alert(res.message);
        } else {
          localStorage.setItem("userId", res.message._id["$oid"]);
          localStorage.setItem("isAuthenticated", res.message.is_authenticated);
          localStorage.setItem("user", JSON.stringify(res.message));
          console.log(res.message);
          console.log(JSON.parse(localStorage.getItem("user")));
          navigate("/");
        }
      });
  };
  // client_id=304531247476-58f940f3b0dgrupg95cdo8b51fspupdv.apps.googleusercontent.com

  return (
    <div className="Auth">
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
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    name="email"
                  />
                </label>

                <div>
                  <label>
                    <p>First name</p>{" "}
                    <input
                      type="text"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      placeholder="First name"
                      name="fname"
                    />
                  </label>
                  <label>
                    <p>Last name</p>{" "}
                    <input
                      type="text"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      placeholder="Last name"
                      name="lname"
                    />
                  </label>
                </div>

                <label>
                  <p>Password</p>{" "}
                  <input
                    type="password"
                    value={passwd}
                    onChange={(e) => setPasswd(e.target.value)}
                    placeholder="Password"
                    name="password"
                  />
                </label>

                <label>
                  <p>Confirm password</p>{" "}
                  <input
                    type="password"
                    value={cnfPass}
                    onChange={(e) => setCnfPass(e.target.value)}
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
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    name="email"
                  />
                </label>
                <label>
                  <p>Enter your password</p>{" "}
                  <input
                    type="password"
                    value={passwd}
                    onChange={(e) => setPasswd(e.target.value)}
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
      {/* <GoogleOAuthProvider clientId="983222062492-hg2nks96hdo66l7roqsgtltglblv0138.apps.googleusercontent.com">

              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                width="400px"
              />
      </GoogleOAuthProvider> */}

            </div>
          )}
        </div>
    </div>
  );
}

export default Auth;
