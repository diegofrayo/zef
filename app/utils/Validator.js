class Validator {

  config = {};

  static array() {
    this.config.type = 'array';
    return this;
  }

  static boolean() {
    this.config.type = 'boolean';
    return this;
  }

  static number() {
    this.config.type = 'number';
    return this;
  }

  static string() {
    this.config.type = 'string';
    return this;
  }

  static default (value) {
    this.config.default = value;
    return this;
  }

  static required() {
    this.config.required = true;
    return this;
  }

  static falsy(values = []) {
    this.config.falsy = values;
    return this;
  }

  static truthy(values = []) {
    this.config.truthy = values;
    return this;
  }

  static valid(valid = []) {
    this.config.valid = valid;
    return this;
  }

  static createSchema(schema){
    this.schema = schema;
    return this;
  }

  static validate(object) {
    return new Promise((resolve, reject) => {

      const errors = [];
      const { config } = this;

      Object
        .keys(object)
        .forEach(key => {

          const value = object[key] === undefined && config.default !== undefined ? config.default : object[key];

          if (typeof value !== config.type || (Array.isArray(value) && config.type === 'array')) {
            errors.push({
              type: 'Type',
              message: `${key} type is different to ${config.type}`,
            });
          } else if (config.valid && config.valid.length) {
            const isValid = config.valid.find(item => item === value);
            if (!isValid) {
              errors.push({
                type: 'PossibleValue',
                message: `${key} must be any of these values ${config.valid.join(',')}`,
              });
            }
          } else if (config.required && config.default === undefined) {
            if (config.truthy && config.truthy.length) {
              const isValid = config.truthy.find(item => item === value);
              if (!isValid) {
                errors.push({
                  type: 'PossibleValue',
                  message: `${key} must be any of these values ${config.truthy.join(',')}`,
                });
              }
            }
            if (config.falsy && config.falsy.length) {
              const isNotValid = config.falsy.find(item => item === value);
              if (isNotValid) {
                errors.push({
                  type: 'PossibleValue',
                  message: `${key} must be any of these values ${config.falsy.join(',')}`,
                });
              }
            }
          }
        });

      if (errors.length) {
        reject(errors);
      } else {
        resolve(object);
      }
    });
  }
}

export default Validator;
