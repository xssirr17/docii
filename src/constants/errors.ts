export default {
  duplicateUser: {
    code: 'duplicateUser',
    message: 'user registered before',
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
  wrongOtp: {
    code: 'wrongOtp',
    message: 'otp not verified',
    statusCode: 401,
  },
  internalError: {
    code: 'internalError',
    message: 'internal server error',
    statusCode: 500,
  },
  otpExpired: {
    code: 'otpExpired',
    message: 'otp expired try to send another',
    statusCode: 404,
  },
  unauthorized: {
    code: 'unauthorized',
    message: 'unauthorized',
    statusCode: 401,
  },
  wrongUserOrPass: {
    code: 'wrongUserOrPass',
    message: 'wrong id (mobileNumber , nationalId) or password',
    statusCode: 401,
  },
  alreadyLoggedIn: {
    code: 'alreadyLoggedIn',
    message: 'user already logged in',
    statusCode: 400,
  },
  alreadyExist: {
    code: 'alreadyExist',
    statusCode: 400,
  },
  notFound: {
    code: 'notFound',
    statusCode: 404,
  },
  categoryNotFound: {
    code: 'categoryNotFound',
    message: 'category not found',
    statusCode: 404,
  },
  invalidTime: {
    code: 'invalidTime',
    message: 'invalid time',
    statusCode: 400,
  },
  alreadyReserved: {
    code: 'alreadyReserved',
    message: 'already reserved',
    statusCode: 400,
  },
};
