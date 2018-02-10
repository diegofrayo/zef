class Validation {

  data = {};

  static array() {
    this.data.type = 'array';
    return this;
  }

  static boolean() {
    this.data.type = 'boolean';
    return this;
  }

  static number() {
    this.data.type = 'number';
    return this;
  }

  static string() {
    this.data.type = 'string';
    return this;
  }

  static default(value) {
    this.data.default = value;
    return this;
  }

  static required() {
    this.data.required = true;
    return this;
  }

  static truthy(values = []) {
    this.data.truthy = values;
    return this;
  }

  static falsy(values = []) {
    this.data.falsy = values;
    return this;
  }

  static valid(valid = []) {
    this.data.valid = valid;
    return this;
  }

  static validate(object) {
    return new Promise((resolve, reject) => {
      const errors = [];
      if (errors.length) {
        reject(errors);
      } else {
        resolve(object);
      }
    });
  }

}

export default Validation;
