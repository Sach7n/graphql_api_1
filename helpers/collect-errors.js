const errors = [{
    Description: "Bad Input. Please check input JSON.",
    ErrorType: 'INVALID_JSON',
    Expected: "Valid JSON",
}]

const e1 = 'INVALID_JSON';

function collect_errors(errors){
    const error = errors.find(e=>e.ErrorType === e1)
    return error;

}

module.exports = collect_errors;