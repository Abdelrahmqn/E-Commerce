

import nodemailer from "nodemailer"
import { emailTemplate } from "./emailTemplate.js";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
 service:"gmail",

  secure: false, // true for 465, false for other ports
  auth: {
    user: "path2polymath@gmail.com",
    pass: "zkck srwq yvqt dndj"
  },
  tls:{
    rejectUnauthorized:false
  }
});

// Wrap in an async IIFE so we can use await.
export const sendMail = async (email) => {
  const info = await transporter.sendMail({
    from: '"NTIG7" <path2polymath@gmail.com>',

    to: email,

    subject: "Hello ✔",
    text: "Hello world?", 
    html: emailTemplate(email),
  });

  console.log("Message sent:", info.messageId);
};