---
title: TypeScript 搭建开发环境
date: 2019-04-27 20:06:20
categories:
 - frontEnd
tags:
 - TypeScript 
---

## 一、使用 npm 初始化项目

创建项目目录, 并进入项目

```shell
mkdir TypeScript-learn
cd TypeScript-learn
```

npm 初始化项目

```shell
npm init
```

根据提示，交互式的填写相关内容, 生成 package.json：

```shell
package name: (typescript-learn)
version: (1.0.0)
description: learning of TypeScript
entry point: (index.js) src/index.ts
test command:
git repository: (https://github.com/zhb333/TypeScript-learn.git)
keywords: typescript
author: zhb333<1140457303@qq.com>
license: (ISC) MIT
```

## 二、使用 tsc 初始化配置

安装 typescript

```shell
yarn add typescript@4.1.2 tslint -D
```

```shell
npx tsc --init
```

运行上面的命令会在项目根目录生成 tsconfig.json 配置文件

## 三、配置 webpack

安装 webpack

```shell
yarn add webpack@5.9.0 webpack-cli@3 webpack-dev-server@3.11.0 -D
```

安装 ts-loader

```shell
yarn add ts-loader@8.0.11 -D
```

安装 webpack 插件

```shell
yarn add clean-webpack-plugin@3.0.0 html-webpack-plugin@4.5.0 -D
```

创建入口文件 src/index.ts

```ts
const content: string = "hello TypeScript!";

document.body.innerHTML = `<h1>${content}</h1>`;
```

创建模板文件 src/templates/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

编写 webpack 配置
build/webpack.config.js

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeEnv = process.env.NODE_ENV;
module.exports = {
  mode: nodeEnv,
  entry: {
    index: path.resolve(__dirname, "../src/index.ts"),
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: nodeEnv === "development" ? "inline-source-map" : false,
  devServer: {
    contentBase: path.resolve(__dirname, "../dist/"),
    compress: false,
    host: "0.0.0.0",
    port: "8888",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/templates/index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
};
```

## 四、添加开发和打包命令

安装 cross-env (用于传递环境变量)

```shell
yarn add cross-env@7.0.2 -D
```

添加启动命令

package.json

```json
scripts: {
    "start": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.js"
}
```

启动开发环境

```shell
yarn start
```

添加打包命令

```json
scripts: {
    "start": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.js",
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
}
```

## 五、依赖列表

```json
"devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "cross-env": "^7.0.2",
    "html-webpack-plugin": "^4.5.0",
    "ts-lint": "^4.5.1",
    "ts-loader": "^8.0.11",
    "typescript": "^4.1.2",
    "webpack": "^5.9.0",
    "webpack-cli": "3",
    "webpack-dev-server": "^3.11.0"
}
```
