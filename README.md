'koa-body' 与 'koa-bodyparser' 两者都主要依赖 'co-body'，主要区别是：后者没有引用 'formidable'，不能解析文件。

项目中使用 'koa-bodyparser' 解析请求，对于文件的解析自行引用 'formidable' 编写中间件 'upload-parser'。

'mysql' 与 'mysql2'都是 nodejs 环境下的 mysql 数据库的驱动程序，区别在于 'mysql' 是 js 编写，'mysql2' 是 ts 编写，两者的 API 的语法不同，性能上或许有一定差异。

'ajv' JSON校验器
