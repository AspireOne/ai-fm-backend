#!/usr/bin/env node

const axios = require('axios');

// Get the radioId from command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Error: Missing radioId parameter');
  console.error('Usage: node forward-radio.js <radioId>');
  process.exit(1);
}

const radioId = args[0];
const sourceUrl = 'http://localhost:5000';
const targetUrl = 'https://fm-api.matejpesl.cz';

console.log(`Starting to download and forward radio ${radioId} from ${sourceUrl} to ${targetUrl}`);

async function forwardRadio(radioId) {
  try {
    console.log('Initiating download and forward process...');
    const response = await axios.get(`${sourceUrl}/radios/${radioId}/forward-to-server`, {
      params: {
        serverUrl: targetUrl
      },
      timeout: 3600000 // 1 hour timeout for long operations
    });

    console.log('Operation completed successfully!');
    console.log('Results:');
    console.log(`- Total songs: ${response.data.totalSongs || 0}`);
    console.log(`- Downloaded: ${response.data.downloaded || 0}`);
    console.log(`- Uploaded: ${response.data.uploaded || 0}`);
    
    if (response.data.failed && response.data.failed.length > 0) {
      console.log(`- Failed: ${response.data.failed.length}`);
      console.log('\nFailed items:');
      response.data.failed.forEach(item => {
        console.log(`  - ${item.blockId}: ${item.error}`);
      });
    } else {
      console.log('- No failed items');
    }
    
    console.log('\nComplete!');
  } catch (error) {
    console.error('Error forwarding radio:');
    if (error.response) {
      // The request was made and the server responded with a status code outside of 2xx
      console.error(`Server responded with status ${error.response.status}`);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server');
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

forwardRadio(radioId);
