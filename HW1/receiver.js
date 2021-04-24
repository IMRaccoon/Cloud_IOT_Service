const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const client = mqtt.connect(`mqtt://${process.env.AWS_IP}`);

const dir = 'dummy/receive';

client.on('connect', () => {
  console.log('Receiver: Connection Success');
  client.subscribe('IMRaccoon', (err) => {
    if (err) {
      console.error('Receiver: Subscribe Failed');
    } else {
      console.log('Receiver: Subscribe Success');
    }
  });
});

client.on('message', (topic, message) => {
  try {
    const origin = JSON.parse(message);
    fs.writeFileSync(
      path.join(dir, origin.fileName),
      Buffer.from(origin.data.data),
    );
  } catch (err) {
    console.error('Receiver: File Write Error');
    console.error(err);
  } finally {
    console.log('Receiver: Receiver: File Write Success');
    client.end();
  }
});

client.on('error', (err) => {
  if (err) {
    console.error('Receiver: Connection Failed');
    console.error(err);
    return client.end();
  }
});
