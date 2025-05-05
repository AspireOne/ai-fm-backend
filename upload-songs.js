#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios'); // Using axios instead of fetch

// Configuration
const SERVER_URL = 'http://localhost:5000';
const UPLOAD_ENDPOINT = '/radios/upload-songs';

async function uploadSong(filePath, blockId, radioId) {
  try {
    // Validate inputs
    if (!filePath || !blockId || !radioId) {
      console.error('Error: Missing required parameters');
      console.error('Usage: node upload-songs.js <filePath> <blockId> <radioId>');
      process.exit(1);
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File '${filePath}' does not exist`);
      process.exit(1);
    }

    // Create form data
    const form = new FormData();
    form.append('blockId', blockId);
    form.append('radioId', radioId);
    // Important: The field name must be exactly what Fastify multipart expects
    form.append('file', fs.createReadStream(filePath), {
      filename: path.basename(filePath),
      contentType: 'audio/mpeg'
    });

    console.log(`Uploading '${filePath}' to blockId: ${blockId}, radioId: ${radioId}...`);

    // Send request using axios instead of fetch
    const response = await axios.post(`${SERVER_URL}${UPLOAD_ENDPOINT}`, form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    const result = response.data;

    if (response.status >= 200 && response.status < 300) {
      console.log('Upload successful!');
      console.log(result);
    } else {
      console.error('Upload failed');
      console.error(result);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error uploading file:', error.message);
    process.exit(1);
  }
}

// Allow bulk upload with a JSON file
async function uploadBulk(jsonFilePath) {
  try {
    if (!fs.existsSync(jsonFilePath)) {
      console.error(`Error: JSON file '${jsonFilePath}' does not exist`);
      process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    
    if (!Array.isArray(data.songs)) {
      console.error('Error: JSON file should contain a "songs" array');
      process.exit(1);
    }
    
    console.log(`Found ${data.songs.length} songs to upload`);
    
    for (const song of data.songs) {
      if (!song.filePath || !song.blockId || !song.radioId) {
        console.error('Error: Each song must have filePath, blockId, and radioId properties');
        continue;
      }
      
      console.log(`Processing ${song.filePath}...`);
      await uploadSong(song.filePath, song.blockId, song.radioId);
    }
    
    console.log('Bulk upload completed');
  } catch (error) {
    console.error('Error in bulk upload:', error.message);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Error: Missing required parameters');
  console.error('Usage: node upload-songs.js <filePath> <blockId> <radioId>');
  console.error('   or: node upload-songs.js --bulk <jsonFilePath>');
  process.exit(1);
}

if (args[0] === '--bulk' && args[1]) {
  uploadBulk(args[1]);
} else if (args.length >= 3) {
  uploadSong(args[0], args[1], args[2]);
} else {
  console.error('Error: Invalid arguments');
  console.error('Usage: node upload-songs.js <filePath> <blockId> <radioId>');
  console.error('   or: node upload-songs.js --bulk <jsonFilePath>');
  process.exit(1);
}
