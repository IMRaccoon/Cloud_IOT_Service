const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const client = mqtt.connect(`mqtt://${process.env.AWS_IP}`);

client.on('connect', () => {
  console.log('Sender: Connection Success');

  const fileName = 'test.txt';
  const file = path.join('dummy/send', fileName);

  let data;

  try {
    data = fs.readFileSync(file);
    console.log('Sender: File Read Success');
  } catch (err) {
    console.error('Sender: File Read Error');
    console.error(err);
    return client.end();
  }

  client.publish('IMRaccoon', JSON.stringify({ data, fileName }), (err) => {
    if (err) {
      console.error('Sender: Publish Error');
      console.error(err);
    } else {
      console.log('Sender: Publish Success');
    }

    return client.end();
  });
});

client.on('error', (err) => {
  if (err) {
    console.error('Sender: Connection Failed');
    console.error(err);
    return client.end();
  }
});
