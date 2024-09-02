const { response } = require("express");
const fs = require("fs");
const { google } = require("googleapis");
require("dotenv").config();



const auth = new google.auth.GoogleAuth({
  keyFile: '../preplet-434413-4810fefeb1cc.json',
  scopes: ['https://www.googleapis.com/auth/drive'], // Add other scopes as needed
});

async function uploadFiles() {
  try {
    console.log("googing");

    const driveService = google.drive({
      version: "v3",
      auth,
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
