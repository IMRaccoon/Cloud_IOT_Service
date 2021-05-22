const AWS_IOT = require('aws-iot-device-sdk');
const path = require('path');

const credential_path = 'credentials/fire_detector';
const detector = new AWS_IOT.device({
  keyPath: path.join(credential_path, '940e4edae6-private.pem.key'),
  certPath: path.join(credential_path, '940e4edae6-certificate.pem.crt'),
  caPath: 'credentials/AmazonRootCA1.pem',
  clientId: 'fire_detector',
  host: 'a40f1ao67snid-ats.iot.ap-northeast-2.amazonaws.com',
});

detector.on('connect', () => {
  console.log('Fire Dector Connected');

  detector.subscribe('fire/alert', () => {
    console.log('Subscribe Alert');
  });

  detector.on('message', () => {
    console.log('ALERT!!!');
  });

  setInterval(() => {
    const isFire = Boolean(Math.ceil(Math.random() * 10) % 2 == 0);
    console.log('Is Fire:', isFire);
    detector.publish('fire/alarm', JSON.stringify({ isFire }));
  }, 3000);
});
