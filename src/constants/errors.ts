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
  sendOtpfailed: {
    code: 'sendOtpfailed',
    message: 'something went wrong when sendign otp',
    statusCode: 500,
  },
  otpAlredySent: {
    code: 'otpAlredySent',
    message: 'otp Alredy Sent or mobile number has active otp.please wait.',
    statusCode: 400,
  },
};
