import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const error = exception.getResponse();

    response.status(status).json({
      errorDetails: error,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });

    this.logger.error(
      `Exceção HTTP: ${status} - ${request.method} ${request.url}`,
      error,
    );
  }
}
