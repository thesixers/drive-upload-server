


import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';



// Path to your service account JSON key file
const keyPath = "../omega-moonlight-450515-u0-d522766304a0.json"

// Load the service account credentials
const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({
    version: 'v3',
    auth
  });

export default drive;