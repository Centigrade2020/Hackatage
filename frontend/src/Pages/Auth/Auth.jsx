import { useState } from "react";
import React from "react";
import "./Auth.css";

function Auth() {
  const [newUser, setNewUser] = useState(false);
  return (
    <div className="Auth">
      {newUser ? (
        <>
          <form>
            <input placeholder="Email" name="email"></input>
            <input placeholder="First Name" name="fname"></input>
            <input placeholder="Last Name" name="lname"></input>
            <input placeholder="Password" name="password"></input>
            <input placeholder="Confirm password" name="cpassword"></input>
            <button type="submit">Login</button>
          </form>

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
        </>
      ) : (
        <>
          <form>
            <input placeholder="Email" name="email"></input>
            <input placeholder="Password" name="password"></input>
            <button type="submit">Sign up</button>
          </form>

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
