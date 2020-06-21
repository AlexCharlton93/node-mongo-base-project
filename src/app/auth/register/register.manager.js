import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError, errorTypes } from '../../../common/errors';
import { UserFindByEmail, Register } from '../../../common/services/user';
import { authErrorMessages } from '../shared';
import { config } from '../../../common/config';

export const createAccount = async(request) => {
    _validateRequest(request);

    const { body: { emailAddress, password, confirmPassword } } = request;

    // eslint-disable-next-line security/detect-possible-timing-attacks
    if (password !== confirmPassword) {
        throw new HttpError(authErrorMessages.passwordsDoNotMatch, authErrorMessages.passwordsDoNotMatch, errorTypes.INVALID_PARAMETERS);
    }

    await _checkIfAlreadyRegistered(emailAddress);

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const user = await Register(emailAddress, encryptedPassword);

    if (!user) {
        throw new HttpError(authErrorMessages.unableToRegister, authErrorMessages.unableToRegister, errorTypes.INVALID_OPERATION);
    }

    const token = jwt.sign({ userId: user._id, userEmail: user.emailAddress }, config.secretKey, {
        expiresIn: config.JwtExpiryTime,
    });

    // TODO: Send Registered/Welcome Email

    return {
        token,
    };
};

const _checkIfAlreadyRegistered = async(emailAddress) => {
    const user = await UserFindByEmail(emailAddress);

    if (user) {
        throw new HttpError(authErrorMessages.alreadyRegistered, authErrorMessages.alreadyRegistered, errorTypes.INVALID_OPERATION);
    }
}


const _validateRequest = (request) => {
    if (!request.body) {
        throw new HttpError(authErrorMessages.body, authErrorMessages.body, errorTypes.INVALID_PARAMETERS);
    }

    if (!request.body.emailAddress) {
        throw new HttpError(authErrorMessages.emailAddressPassword, authErrorMessages.emailAddressPassword, errorTypes.INVALID_PARAMETERS);
    }

    if (typeof request.body.emailAddress !== 'string') {
        throw new HttpError(authErrorMessages.emailAddressPassword, authErrorMessages.emailAddressPassword, errorTypes.INVALID_PARAMETERS);
    }

    if (!request.body.password) {
        throw new HttpError(authErrorMessages.emailAddressPassword, authErrorMessages.emailAddressPassword, errorTypes.INVALID_PARAMETERS);
    }

    if (typeof request.body.password !== 'string') {
        throw new HttpError(authErrorMessages.emailAddressPassword, authErrorMessages.emailAddressPassword, errorTypes.INVALID_PARAMETERS);
    }

    if (!request.body.confirmPassword) {
        throw new HttpError(authErrorMessages.confirmPassword, authErrorMessages.confirmPassword, errorTypes.INVALID_PARAMETERS);
    }

    if (typeof request.body.confirmPassword !== 'string') {
        throw new HttpError(authErrorMessages.confirmPassword, authErrorMessages.confirmPassword, errorTypes.INVALID_PARAMETERS);
    }
}
