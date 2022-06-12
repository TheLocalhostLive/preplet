const { response } = require("express");
const fs = require("fs");
const { google } = require("googleapis");
require("dotenv").config();

const client_id = process.env.G_DRIVE_CLIENT_ID;
const client_secret = process.env.G_DRIVE_SECRET;
const redirect_uri = "https://developers.google.com/oauthplayground";
const refresh_token = process.env.G_DRIVE_REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uri
);
oauth2Client.setCredentials({
  refresh_token: refresh_token,
});
async function uploadFiles() {
  try {
    console.log("googing");

    const driveService = google.drive({
      version: "v3",
      auth: oauth2Client,
    });
    const fileMetaData = {
      name: "spaceman.jpg",
      mimeType: "image/jpg",
      parent: [
        "https://drive.google.com/drive/folders/1Indo194izElZDSSNQmeX_gxHjLwzaerk?usp=sharing",
      ],
    };

    const media = {
      mimeType: "image/jpg",
      body: fs.createReadStream("./spaceman.jpg"),
    };
    const response = await driveService.files.create({
      requestBody: fileMetaData,
      media: media,
    });
    console.log(response.status);
    return response.data.id;
  } catch (error) {
    console.log(error);
  }
}

uploadFiles().then(data => {
  console.log(data);
});
