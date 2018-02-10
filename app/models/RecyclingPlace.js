import validator from 'utils/Validator';

const schema = validator
  .object({
    NODE_ENV: validator
      .string()
      .valid(['development', 'production', 'test', 'provision'])
      .required(),
    PORT: validator.number().required(),
    LOGGER_LEVEL: validator
      .string()
      .valid(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
      .default('info'),
    LOGGER_ENABLED: validator
      .boolean()
      .truthy('TRUE')
      .truthy('true')
      .falsy('FALSE')
      .falsy('false')
      .default(true),
  })
  .unknown()
  .required();

// id
// name
// description
// address
// city
// location
// phone
// email
// website
// tags
// fb_page

const validate = object => validator.validate(object, schema);

export default validate;
