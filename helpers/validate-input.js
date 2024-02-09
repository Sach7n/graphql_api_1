const validateEventInput = (eventInput) => {
    const errors = [];
  
    if (!eventInput) {
      errors.push({code: 1000});
    } else {
      const fields = Object.keys(eventInput);
  
      for (const field of fields) {
        if (!(/^[a-zA-Z0-9 .-]+$/).test(eventInput[field])) {
          errors.push({code:1001,Description: `Invalid value for field '${field}'.`});
        }
      }
    }
  
    return errors;
};

module.exports = {validateEventInput};