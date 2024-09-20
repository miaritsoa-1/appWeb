const isEmpty = require('./isEmpty');

exports.validateRegistration = (data) => {
    let errors = {};

    if (isEmpty(data.name)) errors.name = 'Name is required';
    if (isEmpty(data.email)) errors.email = 'Email is required';
    if (isEmpty(data.password)) errors.password = 'Password is required';

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
