import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = new Date();
    const [req] = context.getArgs();
    console.log(
      `\n\n---------------------------------------${req.method}::${req.url}---------------------------------------`
    );
    console.log(new Date().toLocaleString());
    console.log("req.query:\n", req.query);
    console.log("req.params:\n", req.params);
    console.log("req.body:\n", req.body);
    return next.handle().pipe(
      tap(() => {
        console.log(
          `---------------------------------------Done: ${
            Date.now() - now.getTime()
          }ms---------------------------------------\n\n\n\n`
        );
      })
    );
  }
}
