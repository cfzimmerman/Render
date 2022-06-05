const AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  //Create a random number for otp
  const challengeAnswer = Math.random().toString(10).substr(2, 6);
  const email = event.request.userAttributes.email;
  const ses = new AWS.SES();
  const originemail = 'admin@render.game';

  try {
    await ses
      .sendEmail({
        Destination: {
          ToAddresses: [email]
        },
        Source: originemail,
        Message: {
          Subject: { Data: `🗝️ Your login code is ${challengeAnswer}` },
          Body: {
            Text: { Data: `Hey! Your Render login code is ${challengeAnswer}.` }
          }
        }
      })
      .promise();
  } catch (err) {
    return err;
  }

  //set return params
  event.response.privateChallengeParameters = {};
  event.response.privateChallengeParameters.answer = challengeAnswer;
  event.response.challengeMetadata = 'CUSTOM_CHALLENGE';
  return event;
};
