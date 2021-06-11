const AWS_IOT = require('aws-iot-device-sdk');
const AWS = require('aws-sdk');
const path = require('path');
const file = require('fs');

const credential_path = 'credentials/door_camera';
const camera = new AWS_IOT.device({
  keyPath: path.join(credential_path, '8709978bc9-private.pem.key'),
  certPath: path.join(credential_path, '8709978bc9-certificate.pem.crt'),
  caPath: 'credentials/AmazonRootCA1.pem',
  clientId: 'door_camera',
  host: 'a40f1ao67snid-ats.iot.ap-northeast-2.amazonaws.com',
});
const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: 'ap-northeast-2' });
const Bucket = 'dohyeonbucket';

const random = Math.ceil(Math.random() * 10);
const visitor = file.readFileSync(`./dummy/face_${random}.png`);

camera.on('connect', async () => {
  console.log('Door Camera Connected');
  const Key = `visitor/face_${random}.png`;

  try {
    data = await s3.putObject({ Bucket, Key, Body: visitor }).promise();
    console.log('Publish Success');
  } catch (err) {
    console.log('S3 Upload Image Error');
    camera.end();
    return;
  }
  camera.publish(
    'faceRecog/request',
    JSON.stringify({ image: Key, notify: 'faceRecog/notify/door1' }),
    (err) => {
      if (err) {
        console.log('Face Recognition Request Error');
      } else {
        console.log('Face Recognition Request Success', Key);
      }
      camera.end();
    },
  );
});
