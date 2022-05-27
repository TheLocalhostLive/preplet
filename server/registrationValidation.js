const Joi = require('joi')

const registerValidation = (data)=>{
    const schema =Joi.object({
        name : Joi.string().min(6).required(),
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(8).required()
    });

    return schema.validate(data)
};

module.exports.registerValidation = registerValidation;

