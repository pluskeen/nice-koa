搭建 ts 版 koa 项目，并学习如何开发后台代码。

因为安全问题，redis 和 mysql 的服务器地址和账号密码没有上传到 git。

'koa-body' 与 'koa-bodyparser' 两者都主要依赖 'co-body'，主要区别是：后者没有引用 'formidable'，不能解析文件。

本项目中使用 'koa-bodyparser' 解析请求，对于文件的解析自行引用 'formidable' 编写中间件 'file-parser'。

'mysql' 与 'mysql2'都是 nodejs 环境下的 mysql 数据库的驱动程序，区别在于 'mysql' 是 js 编写，'mysql2' 是 ts 编写，两者的 API 的语法不同，性能上或许有一定差异。

'ajv' JSON校验器[https://ajv.js.org/]。

同步数据库，需要先执行 `npm run build` 后，再执行 `npm run sync` 即可。

