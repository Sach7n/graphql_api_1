const errorsDict = [
  {
    Description: "Bad Input. Please check input JSON.",
    ErrorType: "INVALID_JSON",
    Expected: "Valid JSON",
    code: 1000,
  },
  {
    Description: "Input values contains invalid field data",
    ErrorType: "INVALID_DATA",
    Expected: "Valid DATA",
    code: 1001,
  },
];


function collect_errors(errors) {
  let resultArray = [];

  resultArray = errors.map((e) => {
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
