let Validator = require('validatorjs');

//-----------------------------------------
// Example input and rule for validation
//
// let data = {
//     name: 'John',
//     email: 'johndoe@gmail.com',
//     age: 28
// };
// let rules = {
//     name: 'required',
//     email: 'required|email',
//     age: 'min:18'
// };
//-----------------------------------------

function validateUserInputWithRule(input, rules) {
    let validator = new Validator(input, rules);
    return validator.passes();
}

function validateUserInput(input_str) {
    typeof input_str === 'string' || (() => { throw new Error('Input must be a string'); })();
    let rule = {
        name: 'required',
        email: 'required|email',
        age: 'min:18'
    };
    let input = JSON.parse(input_str);
    return validateUserInputWithRule(input, rule);
}

module.exports = {
    validateUserInput,
    validateUserInputWithRule
}