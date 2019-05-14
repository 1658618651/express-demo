const express=require('express');
let server=express();
// const body=require('body-parser');
const body=require('./libs/body-parser.js')
server.listen(8080);
const querystring=require('querystring');
//在路由添加之前添加中间件，先解析数据在执行路由
// server.use(body.urlencoded({extended:false}));
//实现body-parser
server.use(body.urlencoded());
server.get('/a',(req,res,next)=>{
    //next可以把一个请求分几个步骤完成
    res.send("sss");//什么都能发
    console.log("a");
    req.user='ada';//传参
    // throw new Error("aaa");
    next();
});
server.get('/a',(req,res,next)=>{
    console.log(req.user);
    res.send("swww");
    
});
server.get('/c',(req,res,next)=>{
    console.log(req.query);//get自己带可以直接找req.query
    res.send("ccc")

    
});
server.get('/c',(req,res,next)=>{
    console.log(req.query);//get自己带可以直接找req.query，post:body-parser
    res.send("ccc")

    
});

server.post('/d',(req,res)=>{
    console.log(req.body)
})
//express是从上往下执行的，中间件尽量放在下面，防止重名，只有前面的接口全都没有捕获到，才到达use
//一个自带的中间件
server.use(express.static('./static/'))
//use什么方法都能认，比如get,post
