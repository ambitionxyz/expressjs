"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (requestFeild) => {
    return (req, res, next) => {
        console.log("middleware validation");
        next();
    };
};
exports.validate = validate;
//# sourceMappingURL=FieldValidate.js.map