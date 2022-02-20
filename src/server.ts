import Express, { Application, Handler } from 'express';
import morgan from 'morgan';

import { Controllers } from './api/controllers';
import { MetadataKeys, Route } from './api/common';

class Server {
  private _instance: Application;

  constructor() {
    this._instance = Express();
    this._instance.use(Express.json());
    //this._instance.use(morgan('tiny'));
    this.registerRoutes();
  }

  get instance(): Application {
    return this._instance;
  }

  private registerRoutes() {
    this._instance.get('/', (req, res) =>{
      const port = process.env.SERVER_PORT;
      res.status(200).send(`Server listening at http://localhost:${port}`);
    });
    
    const info: Array<{api:string, handler:string}> = [];

    Controllers.forEach((controllerClass) => {
      const constrollerInstance: {[handler: string]: Handler} = new controllerClass() as any;
      const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
      const routes: Route[] = Reflect.getMetadata(MetadataKeys.ROUTES, controllerClass);

      const router = Express.Router();

      routes.forEach(({ method, path, handler }) => {
        router[method](path, constrollerInstance[String(handler)]).bind(constrollerInstance);

        info.push({
          api: `${method.toLocaleUpperCase()} ${basePath + path}`,
          handler: `${controllerClass.name}.${String(handler)}`,
        });
      });

      this._instance.use(basePath, router);
    });

    console.table(info);
  }
}

export default new Server();
