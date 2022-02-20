import winston from 'winston';
import { logOptions } from '../../../log.config'

import { LoggingService } from '../../core/mail/service/logging-service';


export class SimpleLogger implements LoggingService{
  private _logger;
  
  constructor() {
    this._logger = createLogger();
  }

  public info(entry: string) {
    this._logger.info(entry);
  }

  public warn(entry: string) {
    this._logger.warn(entry);  
  }

  public error(entry: string) {
    this._logger.error(entry);  
  }

  public debug(entry: string) {
    this._logger.debug(entry);  
  }
}

function createLogger () {
  return winston.createLogger({
            format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          ),  
         // defaultMeta: meta,
          transports: [
            //new winston.transports.Console({level: "info"})
            new winston.transports.File(logOptions.file),
            new winston.transports.Console(logOptions.console)         
          ]
  })
}