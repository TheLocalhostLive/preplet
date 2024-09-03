const nodemailer = require("nodemailer");

async function main(to, subject, html) {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    port: 587,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Preplet" <127.0.0.1.aws@gmail.com>',
    subject,
    to,
    text: "",
    bcc: "",
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
}
async function send_email(to, subject, html) {
  try {
    await main(to, subject, html);
    console.log("Email send!");
  } catch (err) {
    console.log("Failed to send Email!");
    console.log(err);
  }
}

module.exports = send_email;
