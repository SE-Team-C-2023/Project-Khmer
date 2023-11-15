const {check, validationResult} = require('express-validator');

exports.validateUserSignUp = [
    check('fullname').trim().not().isEmpty().withMessage('name is required').isString().withMessage('Must be a valid name').isLength({min: 3, max: 20}).withMessage('Name must be within 3-20 character'),
    check('phoneNumber').isMobilePhone().isLength({min: 9, max: 10}).withMessage('Phone must be 9-10 numbers'),
    check('password').trim().not().isEmpty().withMessage('Password is empty').isLength({min: 8, max: 20}).withMessage('Password must be within 8-20 characters'),
    check('confirmPassword').trim().not().isEmpty().custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Both password must be the same');
        }
        return true;
    })
]

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();
    if(!result.length) return next();

    const error = result[0].msg;
    res.json({success: false, message: error});
};

exports.validateUserSignIn = [
    check('phoneNumber').trim().isMobilePhone().withMessage('Phone number / password is required'),
    check('password').trim().not().isEmpty().withMessage('phone number / password is required')
];