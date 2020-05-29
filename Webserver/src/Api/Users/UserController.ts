import UserService from '../../Services/UserService';
import JSONResponse from '../../Helpers/api/response/JSONResponse';
import InvalidInput from '../../Helpers/api/response/InvalidInput';
import SchemaValidator from '../../Helpers/Validators/validator';
import {UserCreateSchema, UserLoginSchema} from '../../Helpers/Schemas/UsersSchema';
import jwt from 'jsonwebtoken';

/**
 * @swagger
 *
 * "/login":
 *   post:
 *     tags:
 *      - User
 *     description: Login a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: username
 *         type: string
 *         required: true
 *       - in: body
 *         name: password
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User Object
 */
exports.login = async (req, res) => {
    const UserHandler = new UserService();
    const UserPayload = req.body;
    const isValid = SchemaValidator(UserPayload, UserLoginSchema);
    if(isValid) {
        const validUser = await UserHandler.find(UserPayload.username);
        if(!validUser) {
            InvalidInput(res, 'Invalid User Credentials');
        } else {
            const finalUser = await UserHandler.validateUser(validUser, UserPayload);
            if(finalUser) {
                const theJWT = jwt.sign({...finalUser}, process.env.JWT_SECRET);
                JSONResponse(res, {jwt: theJWT});
            } else {
                InvalidInput(res, 'Invalid Password');
            }
        }
    } else {
        InvalidInput(res, 'Invalid User Data');
    }
}

/**
 * @swagger
 *
 * "/user":
 *   post:
 *     tags:
 *      - User
 *     description: Create a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: username
 *         type: string
 *         required: true
 *       - in: body
 *         name: password
 *         type: string
 *         required: true
 *       - in: body
 *         name: email
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User Object
 */
exports.createUser = async (req, res) => {
    const UserHandler = new UserService();
    const UserPayload = req.body;
    const isValid = SchemaValidator(UserPayload, UserCreateSchema);
    if(isValid) {
        try {
            const UserData = await UserHandler.insert(UserPayload);
            JSONResponse(res, UserData);
        } catch(err) {
            let errMessage = 'Error, something went wrong';
            if(err.code === '23505') {
                errMessage = 'That account already exists';
            }
            InvalidInput(res, errMessage);
        }

    } else {
        InvalidInput(res, 'Invalid User Data');
    }
}