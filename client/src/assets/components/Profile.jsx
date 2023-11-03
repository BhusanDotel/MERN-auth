import React from "react";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const { user } = React.useContext(AuthContext);
  const username = user.username;
  function logout() {
    localStorage.clear();
    location.reload();
  }

  return (
    <>
      <h1>welcome {username}</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Profile;
