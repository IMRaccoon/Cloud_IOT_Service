var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://3.35.83.31');
var fs = require('fs');

client.on('connect', () => {
  console.log('Sender: Connection Success');

  const file = './dummy/sender.txt';
  let data;

  try {
    data = fs.readFileSync(file);
    console.log('Sender: File Read Success');
  } catch (err) {
    console.error('Sender: File Read Error');
    console.error(err);
    return client.end();
  }

  client.publish('IMRaccoon', data, (err) => {
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
