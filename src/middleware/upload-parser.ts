import formidable from 'formidable';
import Koa from 'koa';

export default (options: formidable.Options = {}): Koa.Middleware => {
  let form = new formidable.IncomingForm(options);

  return async (ctx, next) => {
    await new Promise<void>((resolve, reject) => {
      if (ctx.is('multipart')) {
        form.parse(
          (ctx.req),
          (err, fields, files) => {
            if (err) {
              return reject(err);
            }

            Object.assign(ctx.req, {fields});
            Object.assign(ctx.req, {files});

            resolve();
          });
      } else {
        resolve();
      }
    });
    await next();
  };
}
