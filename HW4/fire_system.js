// SubScribe Fire Alarm & Publish to Fire Sprinkler & Fire Alert

const AWS_IOT = require('aws-iot-device-sdk');
const path = require('path');

const credential_path = 'credentials/fire_system';

const fireSystem = new AWS_IOT.device({
  keyPath: path.join(credential_path, '9280d44cda-private.pem.key'),
  certPath: path.join(credential_path, '9280d44cda-certificate.pem.crt'),
  caPath: 'credentials/AmazonRootCA1.pem',
  clientId: 'fire_system',
  host: 'a40f1ao67snid-ats.iot.ap-northeast-2.amazonaws.com',
});

fireSystem.on('connect', () => {
  console.log('Fire System Connected');

  fireSystem.subscribe('fire/alarm', () => {
    console.log('SubScribe alarm');
  });

  fireSystem.on('message', (topic, message) => {
    const { location } = JSON.parse(message.toString());
    console.log('Fire Location:', location);
    if (location % 2 == 0) {
      fireSystem.publish('fire/sprinkler', JSON.stringify({ activate: true }));
      fireSystem.publish('fire/alert', JSON.stringify({ alert: 'FIRE!!' }));
    } else {
      fireSystem.publish('fire/sprinkler', JSON.stringify({ activate: false }));
    }
  });
});
