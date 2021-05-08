const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.update({ region: 'ap-northeast-2' });
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

try {
  const file = 'test.jpeg';
  const fileStream = fs.createReadStream(path.join('./dummy', file));
  const uploadParams = {
    Bucket: 'dohyeonbucket',
    Key: file,
    Body: fileStream,
  };

  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.Location);
    }
  });
} catch (err) {
  console.error('Error Occur', err);
}
