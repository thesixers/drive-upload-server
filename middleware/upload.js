import drive from './service.js';
import fs from 'fs';


export default async function uploadFile(file) {
  try {
    const fileMetadata = {
        name: file.name,
        parents: ['1Ba0Bn8GITNABReUJdiMHiwYR2bWsvXZg'], // Replace with the ID of the folder you shared with the service account
      };
      const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.tempFilePath), // Directly use file.data which is a Buffer
      };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });


    // console.log('File Id:', response.data.id);
    makeFilePublic(response.data.id);
    let url = getShareableLink(response.data.id)
    return url;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}
  

async function makeFilePublic(fileId) {

    try {
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
    //   console.log(`File is now publicly accessible. File ID: ${fileId}`);
    } catch (error) {
      console.error('Error making file public:', error);
    }
  }

  function getShareableLink(fileId) {
    const shareableLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
    return shareableLink;
  }