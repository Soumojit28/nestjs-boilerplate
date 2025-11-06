import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    private readonly logger = new Logger(ResponseInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
        const now = Date.now();
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;

        return next.handle().pipe(
            tap(() => {
                const elapsed = Date.now() - now;
                this.logger.log(`${ method } ${ url } - ${ elapsed }ms`);
            }),
            map((data) => {
                let message = 'Request successful';
                let responseData = data;
                if (data && typeof data === 'object' && 'message' in data && 'data' in data) {
                    // If data has both 'message' and 'data' properties
                    message = (data as any).message || message;
                    responseData = (data as any).data;
                }
                return {
                    success: true,
                    message,
                    data: responseData
                };
            })
        );
    }
}
