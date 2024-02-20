const errorsDict = [
  {
    Description: "Unknown error occured, contact support team",
    ErrorType: "INVALID",
    Expected: null,
    code: 1000,
  },
  ,{
    Description: "Bad Input. Please check input JSON.",
    ErrorType: "INVALID_JSON",
    Expected: "Valid JSON",
    code: 1001,
  },
  {
    Description: "Input values contains invalid field data",
    ErrorType: "INVALID_DATA",
    Expected: "Valid DATA",
    code: 1002,
  },
  {
    Description: "Duplicate entry",
    ErrorType: "DATA",
    Expected: "Valid DATA",
    code: 1003,
  },
  {
    Description: "User not found",
    ErrorType: "NOT_FOUND",
    Expected: "Valid User",
    code: 1004,
  },
];

/**
 * Defines the error properties for objects in errors array.
 * 
 * @param {Array} errors - Array of objects having errors
 * @returns {Array} The final array of objects having all errors.
 */

function collect_errors(errors) {
  let resultArray = [];
  if(!Array.isArray(errors)){
    resultArray.push({code:1000}) 
  }
  resultArray = errors.map((e) => {
    if(!e.code){
      e.code = 1000;
    }
    const errorMatch = errorsDict.find(error =>error && error.code === e.code);

    if (errorMatch) {
      return { ...errorMatch, ...e };
    } else {
      return e;
    }
  });
  return resultArray;
}

module.exports = collect_errors;
