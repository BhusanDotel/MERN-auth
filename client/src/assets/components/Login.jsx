import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

function Page1() {
  const [info, setInfo] = React.useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = React.useState(null);

  function handleChange(e) {
    const _info = { ...info };
    _info[e.target.name] = e.target.value;
    setInfo(_info);
  }
  const navigate = useNavigate();
  async function handleClick(e) {
    e.preventDefault();
    const { username, password } = info;
    if (username !== "" && password !== "") {
      try {
        await axios
          .post("http://localhost:5000/login", { username, password })
          .then((res) => {
            if (res.data !== "not exists") {
              localStorage.setItem("authToken", res.data.authToken);
              navigate("/");
              location.reload();
            } else {
              console.log(res.data);
              setMessage(res.data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Do not leave fields empty");
    }
  }
  return (
    <div className="root">
      {message !== null && (
        <div className="message">
          {message === "not exists" ? "Incorrect credentials" : "whatever"}
        </div>
      )}
      <form className="login-form" method="POST">
        <input
          type="text"
          onChange={handleChange}
          placeholder="name"
          name="username"
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="password"
          name="password"
        />
        <button onClick={handleClick}>Login</button>
      </form>
      <p className="to-reg">
        New User? <a href="/register">Register</a> here
      </p>
    </div>
  );
}

export default Page1;
