import {
    HttpError,
    errorTypes,
    internalMessages,
    controllerCatch,
} from "../../common/errors";
import { loginRoute, registerRoute } from "../../common/routes";
import { generateToken } from "./login";
import { createAccount } from "./register";

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

const registerRoutes = (app) => {
  app.post(loginRoute, authenticate());
  app.post(registerRoute, register());
}
