const MESSAGES = {
  SUCCESS: 'success',
  ALREADY_EXIST: 'Already exists',
  INVALID_CRED: 'invalid credentials',
  INVALID_NONCE: 'invalid nonce',
  UNAUTHORIZED_ERROR: 'Unauthorized',
  VALIDATION_ERROR: 'Joi Validation Error',
  NOT_FOUND_ERROR: 'Not Found',
  USERNAME_ALREADY_TAKEN: 'Username Already Exists'
};
const STATUS_CODES = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  ALREADY_EXIST: 409
};
const ENVIRONMENTS = {
  LOCAL: 'local',
  TEST: 'test'
};
const JWT = { JWT_EXPIRES_IN: 2592000 };

module.exports = { MESSAGES, STATUS_CODES, JWT, ENVIRONMENTS };
