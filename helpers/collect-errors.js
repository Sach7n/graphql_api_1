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
];


function collect_errors(errors) {
  let resultArray = [];

  resultArray = errors.map((e) => {
    if(!e.code){
      e.code = 1000;
    }
    const errorMatch = errorsDict.find((error) => error.code === e.code);

    if (errorMatch) {
      return { ...errorMatch, ...e };
    } else {
      return e;
    }
  });
  return resultArray;
}

module.exports = collect_errors;
