
## 简介
该项目是采用React、Ts、NextJs构建的社区论坛，演示地址：http://81.69.252.155:6060
### 相关仓库
- 后端仓库：[https://github.com/aFishTail/lenjoy_server](https://github.com/aFishTail/lenjoy_server)
- 后台管理平台：[https://github.com/aFishTail/lenjoy_admin](https://github.com/aFishTail/lenjoy_admin)
## 技术栈
- Ts, NextJs
- Tailwind
- Antd

## 踩坑
- 目录别名，`tsconfig-paths-webpack-plugin`

### 表单控制
使用 [formik](https://github.com/jaredpalmer/formik) 进行表单控制

### 富文本编辑器
#### WangEditor
回报错重复渲染

#### React Draft Wysiwyg
起初工具栏很多都不可点击,将nextjs 降级到 12.0.8, react 降级到17.0.2可以使用

### 页面重定向
比如首页重定向到 category 页面
使`getStaticProps``getServerSideProps` return redirect
