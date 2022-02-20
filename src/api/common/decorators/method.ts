import 'reflect-metadata';
import { MetadataKeys } from "../metadata.keys";

export enum Method {
  GET = 'get',
  POST = 'post',
}

export interface Route {
  method: Method,
  path: string,
  handler: string | symbol;
}

const methodDecoratorFactory = (method: Method) => {
  return (path: string): MethodDecorator => {
    return (target, propertyKey) => {
      const controllerClass = target.constructor;

      const routes: Route[] = Reflect.hasMetadata(MetadataKeys.ROUTES, 
                                                  controllerClass) ?
        Reflect.getMetadata(MetadataKeys.ROUTES, controllerClass) : [];
        
      routes.push({
        method,
        path,
        handler: propertyKey,
      });

      Reflect.defineMetadata(MetadataKeys.ROUTES, routes, controllerClass);
    }
  }
}

export const Get = methodDecoratorFactory(Method.GET);
export const Post = methodDecoratorFactory(Method.POST);