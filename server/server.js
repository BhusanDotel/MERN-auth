const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("./mongo");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//register logics
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const emailExists = await user.findOne({ email: email });
    if (emailExists) {
      res.json("Email already exists !!");
    } else {
      user.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      res.json("Rgistered successfully !!");
    }
  } catch (error) {
    res.json(error);
  }
});

//login logics
const secretKey = "my secret key muji";
let userDetail;
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const emailExists = await user.findOne({ username: username });
    if (emailExists) {
      const passwordMath = await bcrypt.compare(password, emailExists.password);
      if (passwordMath) {
        const uId = {
          id: emailExists._id,
        };
        userDetail = emailExists;
        const token = jwt.sign(uId, secretKey);
        return res.json({ authToken: token });
      } else {
        res.send("not exists");
      }
    } else {
      res.send("not exists");
    }
  } catch (error) {
    res.send(error);
  }
});

// to send user details when loggedin
app.get("/user", (req, res) => {
  res.json(userDetail);
});

app.listen(5000, () => {
  console.log("server is ready");
});
