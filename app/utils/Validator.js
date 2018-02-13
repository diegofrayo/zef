class Validator {

  constructor() {
    this.config = {};
  }

  default(value) {
    this.config.default = value;
    return this;
  }

  required() {
    this.config.required = true;
    return this;
  }

  email() {
    this.config.email = true;
    return this;
  }

  url() {
    this.config.url = true;
    return this;
  }

  falsy(values = []) {
    this.config.falsy = values;
    return this;
  }

  truthy(values = []) {
    this.config.truthy = values;
    return this;
  }

  valid(valid = []) {
    this.config.valid = valid;
    return this;
  }

}

export default {

  array() {
    const validator = new Validator();
    validator.config.type = 'array';
    return validator;
  },

  boolean() {
    const validator = new Validator();
    validator.config.type = 'boolean';
    return validator;
  },

  number() {
    const validator = new Validator();
    validator.config.type = 'number';
    return validator;
  },

  string() {
    const validator = new Validator();
    validator.config.type = 'string';
    return validator;
  },

  validate(object, schema) {

    const errors = [];

    Object
      .keys(schema)
      .forEach(key => {

        const config = schema[key].config;
        const value = object[key] === undefined && config.default !== undefined ? config.default : object[key];

        if (config.required && (typeof value !== config.type || (Array.isArray(value) && config.type !== 'array'))) {

          errors.push({
            type: 'Type',
            message: `[${key}] type is different to ${config.type}`,
          });

        } else if (config.valid && config.valid.length) {

          const isValid = config.valid.find(item => item === value);

          if (!isValid) {
            errors.push({
              type: 'PossibleValue',
              message: `[${key}] must be any of these values (${config.valid.join(',')})`,
            });
          }

        } else if (config.required && config.default === undefined) {

          if (config.truthy && config.truthy.length) {

            const isValid = config.truthy.find(item => item === value);

            if (!isValid) {
              errors.push({
                type: 'PossibleValue',
                message: `[${key}] must be any of these values ${config.truthy.join(',')}`,
              });
              return;
            }
          }

          if (config.falsy && config.falsy.length) {

            const isNotValid = config.falsy.find(item => item === value);

            if (isNotValid) {
              errors.push({
                type: 'PossibleValue',
                message: `[${key}] must be any of these values (${config.falsy.join(',')})`,
              });
              return;
            }
          }

          if (!value) {
            errors.push({
              type: 'InvalidValue',
              message: `[${key}] is required`,
            });
          }
        }
      });

    return { values: object, errors: errors.length ? errors : undefined };
  }

};
