const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-northeast-2' });
const lambda = new AWS.Lambda({ apiVersion: '2015-03-31' });
const data = { name: 'DoHyeon', age: '26', studentNumber: '201511292' };

try {
  const params = {
    FunctionName: 'sendToS3',
    InvocationType: 'Event',
    Payload: JSON.stringify(data),
  };

  lambda.invoke(params, (err, data) => {
    if (err) console.error('Error Occur', err.stack);
    else console.log(data);
  });
} catch (err) {
  console.error('Error Occur', err);
}
