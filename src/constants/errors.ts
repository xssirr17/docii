export default {
  duplicateUser: {
    code: 'duplicateUser',
    message: 'mobileNumber registered before',
    statusCode: 409,
  },
  registerError: {
    code: 'registerError',
    message: 'something went wrong when registering user',
    statusCode: 500,
  },
  sendSmsError: {
    code: 'sendSmsError',
    message: 'something went wrong when sendign sms',
    statusCode: 500,
  },
};
