import express from "express"
import type { Express } from "express"
import bodyParser from "body-parser"
import { expressjwt } from "express-jwt"
import { Constants } from "../util"
import R from "../util/R"
import { ActionToExpress } from "./handlers"

export class Server {
  private app: Express = express()
  static PORT: number = 4001
  private controllers: any[]

  constructor() {
    this.initPlugin()
    ActionToExpress.actionToExpress(this.app)
  }

  private initPlugin() {
    // 获取支持 表单 提交数据   request.body 就可以获取
    this.app.use(bodyParser.urlencoded({ extended: false }))
    //获取支持application/json 数据
    this.app.use(bodyParser.json({ strict: false }))

    // 注册将JWT字符串解析还原成JSON对象的中间件
    // .unless()指定不需要访问权限的接口
    this.app.use(
      expressjwt({
        secret: Constants.SECRET_KEY,
        algorithms: ["HS256"],
      }).unless({
        // path: ["/api/login", "/api/user","/api/rolelist", /^\/api\/dept\//],
        path: [/^\/api\//],
      }),
    )

    this.cacheJWTError()
  }

  private cacheJWTError() {
    // 编写错误中间件，用于捕获解析JWT失败后产生的错误
    this.app.use((err, req, res, next) => {
      // 这次失败是由token解析失败导致的
      if (err.name === "UnauthorizedError") {
        // code 401
        return res.status(401).send(R.error(401, "未授权的操作"))
      }
      res.status(500).send(R.error(500, "未知的错误"))
    })
  }

  registerControllers(controllers) {
    this.controllers = controllers
    return this
  }

  cross(isCross: boolean = true) {
    if (isCross) {
      this.app.all("*", (req, res, next) => {
        // google需要配置，否则报错cors error
        res.setHeader("Access-Control-Allow-Credentials", "true")
        // 允许的地址,http://127.0.0.1:9000这样的格式
        if (req.get("Origin"))
          res.setHeader("Access-Control-Allow-Origin", req.get("Origin"))
        // 允许跨域请求的方法
        res.setHeader(
          "Access-Control-Allow-Methods",
          "POST, GET, OPTIONS, DELETE, PUT",
        )
        // 允许跨域请求header携带哪些东西
        res.header("Access-Control-Allow-Headers", "*")
        next()
      })
    }
    return this
  }

  run(port: number = Server.PORT) {
    this.app.listen(port, () => {
      console.log(`express typescript http://localhost:${port}/`)
    })
  }
}
