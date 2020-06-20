import {
    HttpError,
    errorTypes,
    internalMessages,
    controllerCatch,
} from "../../common/errors";
import { auth } from "../../common/routes";
import { generateToken } from "./login";

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
    console.log("Hit");
    try {
        const jwt = await generateToken(request);

        response.send(jwt);
    } catch (e) {
        controllerCatch(e, request, response);
    }
};

const registerRoutes = (app) => {
  app.get(auth, authenticate);
}
