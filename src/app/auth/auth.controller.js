import {
    HttpError,
    errorTypes,
    internalMessages,
    controllerCatch,
} from "../../common/errors";
import { statusCodes } from '../../common/status-codes';
import { loginRoute, registerRoute, resetPasswordRoute } from "../../common/routes";
import { generateToken } from "./login";
import { createAccount } from "./register";
import { updatePassword } from "./reset-password";

export const AuthController = (app) => {
    if (!app) {
        throw new HttpError(
            null,
            internalMessages.appNotDefined,
            errorTypes.INVALID_DEPENDENCIES
        );
    }

    registerRoutes(app);
};

const registerRoutes = (app) => {
    app.post(loginRoute, authenticate());
    app.post(registerRoute, register());
    app.post(resetPasswordRoute, resetPassword());
}

export const authenticate = () => async (request, response) => {
    try {
        const jwt = await generateToken(request);

        response.send(jwt);
    } catch (e) {
        controllerCatch(e, request, response);
    }
};

export const register = () => async (request, response) => {
    try {
        const user = await createAccount(request);

        response.send(user);
    } catch (e) {
        controllerCatch(e, request, response);
    }
};

export const resetPassword = () => async (request, response) => {
    try {
        await updatePassword(request);

        response.sendStatus(statusCodes.OK);
    } catch (e) {
        controllerCatch(e, request, response);
    }
};
