const { response } = require('express');
const fs = require('fs')
const {google} = require('googleapis')
require('dotenv').config();

async function uploadFiles(){
    try {
        console.log('googing')
        const auth = new google.auth.GoogleAuth({
            keyFile:'./prepletKey.json',
            scopes:['https://www.googleapis.com/auth/drive']
        })
        console.log('Still going')

        const driveService = google.drive({
            version:'v3',
            auth
        })
        console.log('Still going')
        const fileMetaData ={
            'name':'example',
            'parents':[process.env.GOOGLE_API_FOLDER_ID]
        }
        console.log('Still going')
        const media ={
            mimeType: 'image/jpg',
            body: fs.createReadStream('./spaceman.jpg')
        }
        console.log('Still going')
        const response = await driveService.files.create({
            resource: fileMetaData ,
            media: media,
            field :'id'

        })
        console.log('Still going')
        return response.data.id
        console.log('Still going')
    } catch (error) {
        console.log(error)
    }
}

uploadFiles().then(data =>{
    console.log(data)
})