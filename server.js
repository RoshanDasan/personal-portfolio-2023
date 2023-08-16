const bodyParser = require("body-parser");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

require("dotenv").config()
const app = express();


app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL ,
    pass: process.env.PASSWORD ,
  },
});

app.post("/send-mail", (req, res) => {
  const { name, email, subject, message } = req.body;
  const mailOptions = {
    from: email,
    to: "edroshan2001@gmail.com",
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(`error generating email ${error}`);
    } else {
      res.status(200).send(`email sending success ${info}`);
    }
  });
});

app.listen(5000, () => console.log("server started")); 
