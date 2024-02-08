const errors1 = [{
    Description: "Bad Input. Please check input JSON.",
    ErrorType: 'INVALID_JSON',
    Expected: "Valid JSON",
}]

const e1 = 'INVALID_JSON';

function collect_errors(errors){
    // const error = errors.find(e=>e.ErrorType === e1)
    // return error;
    return errors1[0];

}

module.exports = collect_errors;