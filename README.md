## 方舟官网

A multiple entries project. (vue + jquery + combo-cdn)

## Setup
安装node > 8的LTS版本，https://nodejs.org/en/

增加npm本地仓库host，106.75.23.50  npm.analysys.cn

没安装yarn的，可以忽略以下yarn命令

```sh
# set registry
npm config set registry http://registry.npm.analysys.cn

# install stylelint
yarn global add stylelint | npm i stylelint -g

# install dependencies
yarn | npm i

# startup development server (defaults to 9091)
# -> http://localhost:9091
yarn start | npm start
```
