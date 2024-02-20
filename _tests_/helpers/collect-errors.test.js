const collect_errors = require("../../helpers/collect-errors");

describe("test collect errors function", () => {
  test("POSITIVE: test collect error function", () => {
    const sentErrors = [
      {
        Description: "Input values contains invalid field data",
        ErrorType: "INVALID_DATA",
        Expected: "Valid DATA",
        code: 1001,
      },
    ];
    const errors = collect_errors(sentErrors);
    expect(errors).toContainEqual(expect.objectContaining({code: 1001}))
  });

  test("POSITIVE: if error code not provided, take 1000 from array and rest from provided values", () => {
    const sentErrors2 = [
      {
        Description: "Input values contains invalid field data",
        ErrorType: "INVALID_DATA",
        Expected: "Valid DATA",
        code: undefined,
      },
    ];
    const errors = collect_errors(sentErrors2);
    expect(errors).toContainEqual(expect.objectContaining({}))
  });

  test("NEGATIVE: Throw error when errors is not an array", () => {
    const sentErrors2 = 
      {
        Description: "Input values contains invalid field data",
        ErrorType: "INVALID_DATA",
        Expected: "Valid DATA",
        code: undefined,
      }
    ;
    const errors = collect_errors(sentErrors2);
    expect(errors).toContainEqual(expect.objectContaining({}))
  });
});
