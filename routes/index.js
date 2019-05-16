var express = require('express');
var router = express.Router();
const path = require("path")
const Vue = require("vue")
const fs = require("fs")
const { createRenderer } = require('vue-server-renderer')


// 创建一个 renderer对象 并指定渲染模板
const renderer = createRenderer({
    template: fs.readFileSync(path.resolve(__dirname,"index.html"), 'utf-8')

})


router.get('/', function(req, res, next) {
    // 创建一个 Vue 实例
    const app = new Vue({
        data: {
            list:["angular","react","vue"]
        },
        template: `<ul><li v-for="n in list"><a>{{n}}</a></li></ul>`
    })

    // 动态注入title 和 meta标签
    const context = {
        title: 'hello',
        meta: `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="keywords" content="HTML, CSS, Vue, React, Node, JavaScript" />
    `
    }

    // 通过renderToString方法 将Vue实例转换成HTML
    renderer
        // 我们可以通过传入一个”渲染上下文对象”，作为 renderToString 函数的第二个参数，来提供插值数据：
        .renderToString(app, context)
        .then(html => {
            // 最终将拼接好的html页面内容 返回给浏览器
            res.send(html)
        })
        .catch(err => {
            res.status(500).end('Internal Server Error')
        })
});

module.exports = router;
