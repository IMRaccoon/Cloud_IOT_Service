const AWS_IOT = require('aws-iot-device-sdk');
const path = require('path');

const credential_path = 'credentials/door_lock';
const lock = new AWS_IOT.device({
  keyPath: path.join(credential_path, 'cde704cbd9-private.pem.key'),
  certPath: path.join(credential_path, 'cde704cbd9-certificate.pem.crt'),
  caPath: 'credentials/AmazonRootCA1.pem',
  clientId: 'door_lock',
  host: 'a40f1ao67snid-ats.iot.ap-northeast-2.amazonaws.com',
});

lock.on('connect', () => {
  console.log('Door Lock Connected');
  lock.subscribe('faceRecog/notify/door1', (err) => {
    if (err) {
      console.log('Subscribe Door Failed');
    } else {
      console.log('Subscribe Door Notification');
    }
  });
});

lock.on('message', (topic, payload) => {
  const { image, command } = JSON.parse(payload);
  if (command === 'unlock') {
    console.log(`Hello ${image}! Welcome!!`);
  } else if (command === 'reject') {
    console.log(`${image}, You aren't allowed`);
  }
});
