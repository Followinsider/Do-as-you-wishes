# Do as you wishes

此项目是个人学习Ant Design Vue过程中做的demo，同时加入一些常用场景和有趣的功能。项目通过Ant Design Vue(1.7.8)进行搭建。项目主要采用Vue2+Vue周边生态核心技术，尝试开发、测试、打包构建到最终的上线，了解前端工程化链路涉及的技能点。

## :link: 安装依赖(Project setup)
```
npm install
```

## :beginner: 项目启动(Compiles and hot-reloads for development)
```
npm run serve
```

## :package: 构建打包(Compiles and minifies for production)
```
npm run build
```

## :100: 单元测试(Run your unit tests)
```
npm run test:unit
```

## :heavy_check_mark: 检查和修复文件(Lints and fixes files)
```
npm run lint
```

## :bulb: 自定义配置(Customize configuration)

See [Configuration Reference](https://cli.vuejs.org/config/).

---

**Maybe 你可以了解到**

- 自定义webpack和Babel配置，设计高扩展性路由，实现可动态改变的页面布局

  - 体现在按需加载组件中，引入组件和样式，单个单个去引入比较复杂，这时候可以利用babel插件`babel-plugin-import`来帮助完成，路由的结构搭建根据页面结构来（二级三级路由，对路由路径的容错去配置404），添加路由守卫配置来实现一些效果，如进度条，判断是否有携带token等，动态改变的页面布局体现在对Ant Design Vue组件库的布局使用上

- 理解如何将常用菜单和路由结合(数据驱动，即菜单的打开和展示都是通过路由数据来驱动)，如何使用路由管理用户权限的思路，尝试更加精细化的权限设计

  - 数据驱动通过**添加标志位**，过滤不需要渲染成菜单的路由，**添加元信息**，展示路由自身特点

  - 路由管理用户权限通过 “不给过”，“不显示”，“权限不足给予友好提示”三部分组成

    - 不给过

      - ~~~js
        // 1.获取权限数据，实现判断权限逻辑
        const currentAuth = ["admin"];
        export {currentAuth};
        export function getCurrentAuthority() {
            return currentAuth;
        }
        
        export function check(authority) {
            const current = getCurrentAuthority();
            return current.some(item => authority.includes(item));
        }
        
        export function isLogin() {
            const current = getCurrentAuthority();
            return current && current[0] !== "guest";
        }
        ~~~

      - ~~~js
        // 2.给路由添加标志位标识权限 
        meta: {icon: "form", title: "表单", authority: ['admin']},
        ~~~

      - ~~~js
        // 3.判断能否给过
        // findLast为loadsh库的方法，使用前需要下载&引入，返回依据是“从左到右”符合规则的最近的一个
        const record = findLast(to.matched, record => record.meta.authority)
          if (record && !check(record.meta.authority)) {
            // 未登录且跳转的路由不是登录页面
            if (!isLogin() && to.path !== '/user/login') {
              next({
                path: '/user/login'
              })
            }else if (to.path !== '/403') {
              // notification为组件库的组件
              notification.error({
                message: '403',
                description:
                  '没有权限访问唉，请联系管理员咨询.',
              });
              next({
                path: '/403',
              })
            }
            // 加载条
            nprogress.done()
          }
        ~~~

    - 不显示

      - ~~~js
        // 主要在遍历获取菜单的方法（getMenuData）中加个判断就好
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
           break;
        }
        ~~~

    - 权限不足给予友好提示

      - ~~~js
        else if (to.path !== '/403') {
            // notification为组件库的组件
            notification.error({
                message: '403',
                description:
                '没有权限访问唉，请联系管理员咨询.',
            });
            next({
                path: '/403',
            })
        }
        ~~~

  - 精细化的权限设计

    - 权限组件，通过`函数式组件`方式实现，根据权限动态渲染组件 （注册为全局组件时，**使用Vue.component，而不能Vue.use**）
    - 权限指令，通过`自定义指令`方式实现，有一个缺点就是当动态更改权限时，权限指令不能实时跟上，也即只能渲染一次，不够灵活

- 高效使用Mock数据进行开发，利用Axios与服务器进行交互

  - 可以针对项目需求对Axios进行二次封装
  - 友好提示中可以对文字的样式进行修改，通过`jsx`进行编写

- 自定义自动校验的表单项，了解如何管理系统中使用的图标以及定制主题和动态切换主题

  - 一般校验有两种形式，一种是双向绑定，一种如`Antd`将数据交给表单，由表单校验，自定义时，遵守组件库规范，了解需要传什么参数，匹配什么样的逻辑和规则。

  - 管理图标（demo中404配置用到字体和SVG两种）

    - 雪碧图

    - 字体

      - 引入字体库

        - ~~~js
          const IconFont = Icon.createFromIconfontCN({
              scriptUrl: '//at.alicdn.com/t/c/font_3758397_jlhl0pms90o.js',
          });
          Vue.component("IconFont",IconFont);
          ~~~

        - 注册使用

            - ~~~js
              Vue.component("IconFont",IconFont);
              <IconFont type="icon-icon-404" style="font-size:300px;"/>
              ~~~

    - SVG

      - Webpack配置，替换已有的基础loader配置，例如为内联的 SVG 文件使用 `vue-svg-loader` 而不是加载这个文件：

        - ~~~js
          // vue.config.js
          module.exports = {
            // 删除处理svg的默认配置
            chainWebpack: (config) => {
              config.module.rules.delete("svg"); 
            },
            // 配置loader
            configureWebpack: {
              module: {
                rules: [
                  {
                    test: /\.svg$/,
                    loader: "vue-svg-loader",
                  },
                ],
              },
            },
          };
          ~~~

      - **使用**

        - ~~~js
          <template>
              <div style="text-align:center;">
                  <Logo />
              </div>
          </template>
          <script>
          import Logo from "@/assets/404.svg";
          export default {
              components: {Logo, }
          }
          </script>
          ~~~

      - 查看Vue的loader配置，在命令行输入 `vue inspect > output.js`，当前路径会输出名output的js文件，可以查看SVG的loader处理配置

- 了解如何做好国际化以及高效地构建打包发布，了解如何构建可交互组件文档以及做好组件的单元测试

  - 做好国际化

    - 根据组件库规范，如Antd提供`LocaleProvider`用于全局配置国际化文案
    - 可以用[Vue I18n](https://kazupon.github.io/vue-i18n/zh/)配置业务代码的国际化

  - 高效地构建

    - 采用[DllPlugin](:https://juejin.cn/post/6915028318900125703#heading-13)对构建速度进行优化

  - 打包优化

    - 组件库按需加载

    - 图标按需加载

      - webpack配置别名

        - ~~~js
          alias: { "@ant-design/icons/dist$": path.resolve(__dirname,"./src/icons.js"),}
          ~~~

    - 第三方库按需加载

      - `moment`配置优化、`Echarts`（用到哪些类型的图按需引入）

  - 构建可交互组件文档

    - 根据raw-loader进行配置，具体可参考[传送门](https://www.mulingyuer.com/archives/558/)

  - 单元测试

    - 简单拿demo举例

      - ~~~js
        // check
        export function check( authority ) {
            const current = getCurrentAuthority();
            return current.some(item => authority.includes(item));
        }
        // ----------------
        // currentAuth
        const currentAuth = ["admin"];
        export {currentAuth};
        // ----------------
        
        describe("auth test", () =>{
        
            it('empty auth', () => {
                currentAuth.splice(0, currentAuth.length);
                expect(check(['user'])).toEqual(false);
                expect(check(["admin"])).toEqual(false);
            });
        
            it('user auth', () => {
                currentAuth.splice(0, currentAuth.length);
                currentAuth.push('user');
                expect(check(['user'])).toEqual(true);
                expect(check(["admin"])).toEqual(false);
            });
        
            it('admin auth', () => {
                // currentAuth.splice(0, currentAuth.length);
                currentAuth.push('admin');
                expect(check(['user'])).toEqual(true);
                expect(check(["admin"])).toEqual(true);
                expect(check(["admin","user"])).toEqual(true);
            });
        });
        ~~~



- 了解响应式布局，参考[Project-Management-Dashboard-UI](https://github.com/peter-kimanzi/Project-Management-Dashboard-UI)


