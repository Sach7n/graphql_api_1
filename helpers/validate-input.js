const {alphaNumericSpace} = require('../constants/constants') 

/**
 * validates input field that comes from end point.
 * 
 * 
 * @returns {Array}  returns array of errors or empty array
 */

const validateEventInput = (eventInput) => {
    const errors = [];
  
    if (!eventInput) {
      errors.push({code: 1000});
    } else {
      const fields = Object.keys(eventInput);
  
      for (const field of fields) {
        if (!alphaNumericSpace.test(eventInput[field])) {
          errors.push({code:1001,Description: `Invalid value for field '${field}'.`});
        }
      }
    }
  
    return errors;
};

module.exports = {validateEventInput};