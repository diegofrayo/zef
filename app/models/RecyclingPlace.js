import validator from 'utils/Validator';

const schema = {
  id: validator.string().required(),
  name: validator.string().required(),
  description: validator.string().required(),
  address: validator.number().required(),
  city: validator.string().required(),
  location: validator.string().required(),
  phone: validator.string(),
  email: validator.string().email().required(),
  website: validator.string().url().required(),
  fb_page: validator.string().required(),
  elementsForRecycling: validator.array().required(),
};

export default object => validator.validate(object, schema);
