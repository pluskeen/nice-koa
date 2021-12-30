'koa-body' 与 'koa-bodyparser' 两者都主要依赖 'co-body'，主要区别是：后者没有引用 'formidable'，不能解析文件。
项目中使用 'koa-bodyparser' 解析请求，对于文件的解析自行引用 'formidable' 编写中间件 'upload-parser'。
