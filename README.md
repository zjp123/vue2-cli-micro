# vue2-cli-micro

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 作为微前端中的微应用，app2的部分 7002端口

# 子应用不需要 下载 qiankun的别的依赖
# jsonpFunction webapck5 中这个属性改为chunkLoadingGlobal它了

# 子应用不用安装qiankun的依赖，如果是使用umi开发，需要安装umi-qiankun依赖，

# 子应用加载完，页面依然loanding的问题，因为umi与qiankun的契合度比较高，而且使用的是antd，子应用
  加载完页面loading会自动关闭，如果是vue项目，子应用加载完页面loading不会自动关闭，需要通过props。手动关闭
  props.setloading(false)方法
