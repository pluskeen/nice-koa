/**
 * CORS middleware
 */

import Koa from 'koa';

interface IOptions {
  /** origin `Access-Control-Allow-Origin`, default is request Origin header */
  origin?: string | ((ctx: Koa.ParameterizedContext) => boolean | string) | undefined;
  /** exposeHeaders `Access-Control-Expose-Headers` */
  exposeHeaders?: string[] | undefined;
  /** maxAge `Access-Control-Max-Age` in seconds */
  maxAge?: number | undefined;
  /** credentials `Access-Control-Allow-Credentials` */
  credentials?: boolean | undefined;
  /** allowMethods `Access-Control-Allow-Methods`, default is ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] */
  allowMethods?: string[] | undefined;
  /** allowHeaders `Access-Control-Allow-Headers` */
  allowHeaders?: string[] | undefined;
}

export default (options: IOptions = {}): Koa.Middleware => {
  const defaultOptions = {
    allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
  };

  // set defaultOptions to options
  options = Object.assign({}, defaultOptions, options);

  return async function cors(ctx, next) {
    // always set vary Origin Header
    ctx.vary('Origin');

    let origin;
    if (typeof options.origin === 'function') {
      const res = options.origin(ctx);
      // can't assign boolean
      if (res === true) {
        origin = ctx.get('Origin');
      }
      if (res === false) {
        origin = void 0;
      }
      if (typeof res === 'string') {
        origin = res;
      }
    } else {
      origin = options.origin || ctx.get('Origin') || '*';
    }
    if (!origin) {
      return await next();
    }

    // Access-Control-Allow-Origin
    ctx.set('Access-Control-Allow-Origin', origin);

    if (ctx.method === 'OPTIONS') {
      // Preflight Request
      if (!ctx.get('Access-Control-Request-Method')) {
        return await next();
      }

      // Access-Control-Max-Age
      if (options.maxAge) {
        ctx.set('Access-Control-Max-Age', String(options.maxAge));
      }

      // Access-Control-Allow-Credentials
      if (options.credentials === true) {
        // When used as part of a response to a preflight request,
        // this indicates whether or not the actual request can be made using credentials.
        ctx.set('Access-Control-Allow-Credentials', 'true');
      }

      // Access-Control-Allow-Methods
      if (options.allowMethods) {
        ctx.set('Access-Control-Allow-Methods', options.allowMethods.join(','));
      }

      // Access-Control-Allow-Headers
      if (options.allowHeaders) {
        ctx.set('Access-Control-Allow-Headers', options.allowHeaders.join(','));
      } else {
        ctx.set('Access-Control-Allow-Headers', ctx.get('Access-Control-Request-Headers'));
      }

      ctx.status = 204; // No Content
    } else {
      // Request
      // Access-Control-Allow-Credentials
      if (options.credentials === true) {
        if (origin === '*') {
          // `credentials` can't be true when the `origin` is set to `*`
          ctx.remove('Access-Control-Allow-Credentials');
        } else {
          ctx.set('Access-Control-Allow-Credentials', 'true');
        }
      }

      // Access-Control-Expose-Headers
      if (options.exposeHeaders) {
        ctx.set('Access-Control-Expose-Headers', options.exposeHeaders.join(','));
      }

      try {
        await next();
      } catch (err) {
        throw err;
      }
    }
  };
};
