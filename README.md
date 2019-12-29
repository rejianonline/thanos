


## 开发

```bash
# 克隆项目
git clone git@github.com:zhengzhigang/thanos.git

# 进入项目目录
cd thanos

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash

# 构建生产环境
npm run build:prod

# nginx配置示例
server {
    listen      80;                      # 监听端口
    server_name localhost;               # 站点域名
    index index.html index.htm;          # 默认导航页
    root /Users/gmei/demo/thanos/dist;   # 静态资源目录

  location / {
     root /Users/gmei/demo/thanos/dist;
     index index.html index.shtml;
  }

  location /adminApi/ {
      proxy_pass localhost:80;
      proxy_redirect off;
      proxy_set_header Host $http_host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-NginX-Proxy true;
  }
}
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```


