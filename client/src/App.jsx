import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./assets/components/Login";
import Home from "./assets/components/Home";
import Profile from "./assets/components/Profile";
import Register from "./assets/components/Register";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLogged } = React.useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route index element={isLogged ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={isLogged ? <Profile /> : <Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
export default App;
