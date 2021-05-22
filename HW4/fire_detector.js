// Local Detector

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

  setInterval(() => {
    const location = Math.ceil(Math.random() * 10);
    console.log('Fire Detected Location:', location);
    detector.publish('fire/alarm', JSON.stringify({ location }));
    // 3초로 바꿀것
  }, 3000);
});
