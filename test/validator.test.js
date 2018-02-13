import validator from './../../app/utils/validator';

const schema = {
  id: validator
    .string()
    .required(),
  name: validator
    .string()
    .required(),
};

validator
  .validate({ id: 'id', name: 'name' }, schema)
  .then(() => {
    console.log('Success');
  })
  .catch((error) => {
    console.log('Error');
    console.log(error);
  });
