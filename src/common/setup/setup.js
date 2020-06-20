import { AuthController } from '../../app/auth';
import { databaseService } from '../database';

const registerControllers = app => {
    AuthController(app);
};

export const setupApp = async app => {
    await databaseService();

    registerControllers(app);
}
