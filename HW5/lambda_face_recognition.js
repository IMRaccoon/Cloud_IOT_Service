const AWS = require('aws-sdk');
const Bucket = 'dohyeonbucket';
AWS.config.update({ region: 'ap-northeast-2' });

const ImageKeys = [
  'verified/face_1.png',
  'verified/face_2.png',
  'verified/face_3.png',
  'verified/face_4.png',
  'verified/face_5.png',
];

exports.handler = async (event) => {
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
  const iot = new AWS.IotData({
    endpoint: 'a40f1ao67snid-ats.iot.ap-northeast-2.amazonaws.com',
  });
  const { targetID, notify } = event;

  try {
    await s3.waitFor('objectExists', { Bucket, Key: targetID }).promise();
  } catch (err) {
    return {
      statusCode: 404,
      result: 'ID is wrong',
      body: JSON.stringify(err),
    };
  }

  const rekognition = new AWS.Rekognition({ apiVersion: '2016-06-27' });
  let iotParams = { topic: notify, payload: null };

  for (const originKey of ImageKeys) {
    const compareParams = {
      SourceImage: {
        S3Object: { Bucket, Name: targetID },
      },
      TargetImage: {
        S3Object: { Bucket, Name: originKey },
      },
      SimilarityThreshold: 70,
    };
    try {
      const data = await rekognition.compareFaces(compareParams).promise();
      if (data.FaceMatches.length == 1) {
        iotParams.payload = JSON.stringify({
          image: originKey,
          command: 'unlock',
        });
        try {
          await iot.publish(iotParams).promise();
        } catch (err) {
          console.log('IOT Publish Error');
          console.log(err);
        }
        return { statusCode: 200 };
      }
    } catch (err) {}
  }

  iotParams.payload = JSON.stringify({ image: targetID, command: 'reject' });
  await iot.publish(iotParams).promise();
  return { statusCode: 400 };
};
