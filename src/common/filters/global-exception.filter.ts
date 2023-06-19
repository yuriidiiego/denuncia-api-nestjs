import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private logger = new Logger('GlobalExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = 500;
    const message =
      'Erro interno do servidor. Por favor, tente novamente mais tarde.';

    response.status(status).json({
      statusCode: status,
      message: message,
    });
    this.logger.error(`[${status}] ${message}`, exception);
  }
}
