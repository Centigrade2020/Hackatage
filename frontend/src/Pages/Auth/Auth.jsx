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
            <input placeholder="Username" name="username"></input>
            <input placeholder="Phone" name="phone"></input>
            <input placeholder="Password" name="password"></input>
            <button type="submit">Submit</button>
          </form>
          <button
            onClick={() => {
              setNewUser(false);
            }}
          >
            signup
          </button>
        </>
      ) : (
        <>
          <form>
            <input placeholder="Email" name="email"></input>

            <input placeholder="Password" name="password"></input>
            <button type="submit">Submit</button>
          </form>
          <button
            onClick={() => {
              setNewUser(true);
            }}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default Auth;
