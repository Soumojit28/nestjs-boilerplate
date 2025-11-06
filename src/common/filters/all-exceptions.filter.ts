import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode = 'INTERNAL_ERROR';

    // Handle 413 errors specifically
    if (exception instanceof HttpException && exception.getStatus() === 413) {
      status = HttpStatus.PAYLOAD_TOO_LARGE;
      message = 'File size exceeds the maximum limit of 5MB';
      errorCode = 'FILE_TOO_LARGE';
    } else if (exception instanceof HttpException) {
      const res: any = exception.getResponse();
      status = exception.getStatus();
      message = res.message || exception.message;
      errorCode = res.error || exception.name;
    } else if (typeof exception === 'object' && exception !== null) {
      // Handle non-HttpException 413 errors (from nginx, etc.)
      if ('statusCode' in exception && exception.statusCode === 413) {
        status = HttpStatus.PAYLOAD_TOO_LARGE;
        message = 'File size exceeds the maximum limit of 5MB';
        errorCode = 'FILE_TOO_LARGE';
      } else if ('status' in exception && exception.status === 413) {
        status = HttpStatus.PAYLOAD_TOO_LARGE;
        message = 'File size exceeds the maximum limit of 5MB';
        errorCode = 'FILE_TOO_LARGE';
      }
    }

    this.logger.error(
      `[${errorCode}] ${message} - ${request.method} ${request.url}`,
    );

    response.status(status).json({
      success: false,
      message,
      error: {
        code: errorCode,
        statusCode: status,
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
