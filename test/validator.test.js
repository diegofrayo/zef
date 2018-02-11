import validator from './app/utils/validator';

const schema = validator
  .createSchema({
    id: validator
      .string()
      .required(),
    name: validator
      .string()
      .required(),
  });

validator.validate(object, schema);
