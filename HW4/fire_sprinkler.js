const AWS_IOT = require('aws-iot-device-sdk');
const path = require('path');

const credential_path = 'credentials/fire_sprinkler';

const sprinkler = new AWS_IOT.device({
  keyPath: path.join(credential_path, 'bdb1f89277-private.pem.key'),
  certPath: path.join(credential_path, 'bdb1f89277-certificate.pem.crt'),
  caPath: 'credentials/AmazonRootCA1.pem',
  clientId: 'fire_sprinkler',
  host: 'a40f1ao67snid-ats.iot.ap-northeast-2.amazonaws.com',
});

sprinkler.on('connect', () => {
  console.log('Sprinkler Connected');

  sprinkler.subscribe('fire/sprinkler', () => {
    console.log('Subscribe Sprinkler');
  });

  sprinkler.on('message', (topic, message) => {
    const { activate } = JSON.parse(message.toString());
    if (activate) {
      console.log('Sprinkler Run');
    } else {
      console.log('Sprinkler Stop');
    }
  });
});
