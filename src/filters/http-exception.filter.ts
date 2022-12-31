import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptions extends BaseExceptionFilter {
  private readonly Logger = new Logger();

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    this.Logger.error(`HttpStatus ${status} Error: ${JSON.stringify(message)}`);

    res.statusCode = status;
    res.json({
      timestamp: new Date().toISOString(),
      path: req.url,
      error: message,
    });
  }
}
