import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class GraphQLExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();
    const request = ctx.req;
    const response = ctx.res;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    if (!response?.headersSent) {
      response?.status(status)
        .json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: message || 'Unexpected error occurred',
        });
    }
  }
}







// import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
// import { GqlArgumentsHost } from '@nestjs/graphql';

// @Catch(HttpException)
// export class GraphQLExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const gqlHost = GqlArgumentsHost.create(host);
//     const ctx = gqlHost.getContext();
//     const request = ctx.req;
//     const response = ctx.res;
//     const status = exception.getStatus();

//     if (!response.headersSent) {
//     response
//       .status(status)
//       .json({
//         statusCode: status,
//         timestamp: new Date().toISOString(),
//         path: request.url,
//         message:"error handler ;P"
//       });
//   }
// }
// }