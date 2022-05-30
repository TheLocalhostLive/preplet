const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity");

const registerValidation = (data )=>{

    const schema =Joi.object({
        name: Joi.required(),
        email : Joi.string().min(6).required().email(),
        password : new passwordComplexity({
            min: 8,
            max: 25,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
            requirementCount: 4,
          }).required()
    });

    return schema.validate(data)
};

module.exports.registerValidation = registerValidation;

