const AWS = require('aws-sdk');

exports.handler = async (event) => {
  AWS.config.update({ region: 'ap-northeast-2' });
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

  try {
    const uploadParams = {
      Bucket: 'dohyeonbucket',
      Key: 'event.json',
      Body: JSON.stringify(event),
      ContentType: 'application/json',
    };

    const result = await s3.upload(uploadParams).promise();
    console.log('Success', result.Location);
  } catch (err) {
    console.error('Error Occur', err);
  }
};
