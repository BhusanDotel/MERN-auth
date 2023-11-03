import React from "react";
import "../style/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [detail, setDetail] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  let status = "";
  const [statusMsg, setStatusMsg] = React.useState("");

  function handleChange(e) {
    const _detail = { ...detail };
    _detail[e.target.name] = e.target.value;
    setDetail(_detail);
  }

  const navigate = useNavigate();
  async function submit(e) {
    e.preventDefault();
    const { username, email, password } = detail;
    if (username !== "" && email !== "" && password !== "") {
      try {
        await axios
          .post("http://localhost:5000/register", {
            username,
            email,
            password,
          })
          .then((res) => {
            status = res.data;
            setStatusMsg(res.data);
          });
      } catch (error) {
        console.log(error);
      }
      status === "Rgistered successfully !!"
        ? navigate("/")
        : navigate("/register");
    } else {
      alert("Do not leave fields empty");
    }
  }

  let divStyle;
  if (statusMsg === "") {
    divStyle = { visibility: "hidden" };
  } else {
    divStyle = { visibility: "visible" };
  }

  return (
    <>
      <div style={divStyle} className="status">
        {statusMsg}
      </div>

      <form className="reg-form" method="POST">
        <input
          type="text"
          onChange={handleChange}
          name="username"
          value={detail.username}
          placeholder="Username"
        />
        <input
          type="text"
          onChange={handleChange}
          name="email"
          value={detail.email}
          placeholder="email"
        />
        <input
          type="text"
          onChange={handleChange}
          name="password"
          value={detail.password}
          placeholder="password"
        />
        <button onClick={submit}>Register</button>
      </form>
      <p className="to-login">
        Already User? <a href="/">Login</a> here
      </p>
    </>
  );
}

export default Register;
