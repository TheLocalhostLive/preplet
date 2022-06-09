const { response } = require("express");
const fs = require("fs");
const { google } = require("googleapis");
require("dotenv").config();

const client_id =
  "231333435044-ir0747la9sl3me3rppi71eeme5kvopb8.apps.googleusercontent.com";
const client_secret = "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";
const redirect_uri = "https://developers.google.com/oauthplayground";
const refresh_token =
  "1//0494cR9oWq6PtCgYIARAAGAQSNwF-L9IrCPe9PYmlVKaom4xQq6x4-TP4JbbXLLqBAfUO1-rU9gOnP9tIn_gIpEOvRqPf5gT_IAw";

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
