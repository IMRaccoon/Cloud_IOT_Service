var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://3.35.83.31');
var fs = require('fs');

client.on('connect', () => {
  console.log('Receiver: Connection Success');
  client.subscribe('IMRaccoon', (err) => {
    if (err) {
      console.error('Receive: Subscribe Failed');
    } else {
      console.log('Receive: Subscribe Success');
    }
  });
});

client.on('message', (topic, message) => {
  try {
    fs.writeFileSync('./dummy/receiver.txt', message);
  } catch (err) {
    console.error('Receiver: File Write Error');
    console.error(err);
  } finally {
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
