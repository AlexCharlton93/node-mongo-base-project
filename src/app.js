import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import { databaseService } from './common/database';
import { config } from './common/config';
import { controllerCatch } from './common/errors';

// Controllers
import { AuthController } from './app/auth';

async function initApp() {
    const app = express();
	
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(logger('dev'));
    app.use(express.json());
    app.use(cookieParser());

    // remove security risk headers
	app.disable('x-powered-by');
	app.disable('etag');
	app.disable('Server');
	app.use(
		helmet({
			hsts: {
				maxAge: 31536000,
				includeSubDomains: true,
			},
		}),
    );
    
    app.use(compression());

    // eslint-disable-next-line no-unused-vars
	app.use((err, request, response, next) => controllerCatch(err, request, response));

	app.listen(config.environment.port, () => {
		console.log(`up and running on port: ${config.environment.port}`);
		console.log(`enviroment: ${process.env.NODE_ENV}`);
	});

    await databaseService();
	// app.use('/', authController);
	AuthController(app);

}

initApp();
