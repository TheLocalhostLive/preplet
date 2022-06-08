const { response } = require('express');
const fs = require('fs')
const {google} = require('googleapis')
require('dotenv').config();

async function uploadFiles(){
    try {
        console.log('googing')
        const auth = new google.auth.GoogleAuth({
            keyFile:'./drivePreplet.json',
            scopes:['https://www.googleapis.com/auth/drive']
        })

        const driveService = google.drive({
            version:'v3',
            auth
        })
        const fileMetaData ={
            'name':'example.jpg',
            'parent':[process.env.GOOGLE_API_FOLDER_ID ]
        }

        const media ={
            mimeType: 'image/jpg',
            body: fs.createReadStream('./spaceman.jpg')
        }
        const response = await driveService.files.create({
            resource: fileMetaData ,
            media: media,
            field :'id'

        })
        console.log(response.status)
        return response.data.id
    } catch (error) {
        console.log(error)
    }
}

uploadFiles().then(data =>{
    console.log(data)
})