const express = require("express");
const Model = require("../models/model");
const router = express.Router();

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// // Google OAuth2 credentials
// const CLIENT_ID = "your_client_id";
// const CLIENT_SECRET = "your_client_secret";
// const REDIRECT_URI = "your_redirect_uri";
// const REFRESH_TOKEN = "your_refresh_token";

// // Create an OAuth2 client
// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );

// // Set the refresh token
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// // Create a transporter using OAuth2
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: "your_email@gmail.com",
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     refreshToken: REFRESH_TOKEN,
//     accessToken: oAuth2Client.getAccessToken(),
//   },
// });

//Post Method
router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = await data.save();

//    // // Email content
//     const mailOptions = {
//       from: "your_email@gmail.com",
//       to: "recipient_email@example.com",
//       subject: "Subject of the Email",
//       text: "This is the body of the email.",
//     };

//     // // Send email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error:", error);
//       } else {
//         console.log("Email sent:", info.response);
//       }
//     });
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
