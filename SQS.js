const AWS = require('aws-sdk');

const ses = new AWS.SES({ region: '' }); 

exports.handler = async (event) => {
  const message = JSON.parse(event.Records[0].body);

  const params = {
    Destination: {
      ToAddresses: [message.email]
    },
    Message: {
      Body: {
        Text: {
          Data: `Thank you for your request! Download link ${message.pdfLink}`
        }
      },
      Subject: {
        Data: ''
      }
    },
    Source: '',
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log('Email sent:', result.MessageId);
    return { statusCode: 200, body: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { statusCode: 500, body: 'Error sending email' };
  }
};
