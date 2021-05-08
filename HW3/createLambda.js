const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-northeast-2' });
const lambda = new AWS.Lambda({ apiVersion: '2015-03-31' });

const param = {
  Code: {
    S3Bucket: 'dohyeonbucket',
    S3Key: 'sendToS3.zip',
  },
  FunctionName: 'sendToS3',
  Handler: 'index.handler',
  Role: 'arn:aws:iam::184870683298:role/service-role/sendToS3-role-z6865heg',
  Runtime: 'nodejs12.x',
};

lambda.createFunction(param, (err, data) => {
  if (err) console.error('Error Occur ', err);
  else console.log(data);
});
