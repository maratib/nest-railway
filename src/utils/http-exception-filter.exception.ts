import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number;
    let data: any;

    switch (true) {
      case exception instanceof EntityNotFoundError:
        status = HttpStatus.NOT_FOUND;
        data = {
          message: 'The data are you looking for not available. Please try again.',
        };
        break;

      default:
        status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        data = exception instanceof HttpException ? exception.getResponse() : { message: 'Sorry, something went wrong. Try again.' };
        break;
    }

    response.status(status).json({
      statusCode: status,
      ...data,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
