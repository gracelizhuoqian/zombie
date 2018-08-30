const express =require('express');
const router = express.Router();
const api = require('../models/model').Article;
const checkToken = require('../middleware/checkToken');
// 创建一篇文章
router.post('/article/create',checkToken,function (req,res,next){
  api.createArticle(req.body)
      .then((data)=>{
          res.send({
            code:200,
            message:'发布成功'
          })
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
}),
// 获取所有文章列表(带分页获取,需要验证权限)
router.post('/article/lists',function (req,res,next){
  let {page,limit}  =req.body
  api.getArctilesByTime(page,limit)
      .then((result)=>{
        var articleLists = result[0],
            total = result[1];
        res.send({
          code:200,
          articleLists,
          total
        })
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
}),
// 加上checktoken
// 获取所有文章(每次返回10个)前台使用
router.post('/article/articleLists',function (req,res,next){
  let {page,limit}  =req.body
  api.getArctilesByTime(page,limit)
      .then((result)=>{
            if(!result){
              console.log("result is null")
            }
        let articleLists = result[0],
            total = result[1],
            totalPage =Math.ceil(total/limit),
            hasNext=totalPage>page?1:0,
            hasPrev=page>1;
        res.send({
          code:200,
          articleLists,
          hasNext,
          hasPrev
        })
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
}),
// 按照分类获取所有文章列表 前台使用
router.post('/article/noAuthArtilcelists',function (req,res,next){
  let {page,limit,classify}  =req.body;
  api.getArticlesByClass(classify,page,limit)
    .then((result)=>{
      if(!result){
        console.log("result is null")
      }
      let articleLists = result[0],
        total = result[1],
        totalPage =Math.ceil(total/limit),
        hasNext=totalPage>page?1:0,
        hasPrev=page>1;
      res.send({
        code:200,
        articleLists,
        hasNext,
        hasPrev
      })
    })
    .catch(err=>{
      console.log("api.get Allarticles error")
      res.send({
        code:-200,
        message:err.toString()
      })
    })
}),
// 根据postId获取其中一篇文章（有权限）
router.post('/article/onePage',function (req,res,next){
  let {id}  =req.body;
  api.getArticleById(id)
      .then((oneArticle)=>{
        if(oneArticle){
          res.send({
            code:200,
            oneArticle
          })
        }else{
          throw new Error('没有找到该文章');
        }
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
}),
// 根据postId获取其中一篇文章（没有权限）
router.post('/article/noAuth',function (req,res,next){
  let {id}  =req.body
  api.getArticleById(id)
      .then((oneArticle)=>{
        if(oneArticle){
          res.send({
            code:200,
            oneArticle
          })
        }else{
          throw new Error('没有找到该文章');
        }
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
}),
// 删除一篇文章
router.post('/article/remove',checkToken,function (req,res,next){
  api.deleteArticle(req.body.id)
      .then(()=>{
          res.send({
            code:200,
            message:'删除成功'
          })
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
}),
// 编辑文章
router.post('/article/edit',checkToken,function (req,res,next){
  let id = req.body.id;
  let classify = req.body.classify;
  let title = req.body.title;
  let content = req.body.content;
  let contentToMark = req.body.contentToMark;
  let abstract=req.body.abstract;
  api.updateArticle(id,{classify,title,content,contentToMark,abstract})
  .then((data)=>{
      res.send({
        code:200,
        message:'编辑成功'
      })
  })
  .catch(err=>{
    res.send({
      code:-200,
      message:err.toString()
    })
  })
}),
// 获取所有文章标题
router.get('/article/titles',function(req,res,next){
  api.getArticleTitles()
    .then((titles)=>{
      if(titles){
        res.send({
          code:200,
          titles
        });
      }else{
        throw new Error('获取标题失败');
      }
    })
    .catch(err=> {
      res.send({
        code: -200,
        message: err.toString()
      });
    })
}),
router.post('/article/noAuByTitle',function (req,res,next){
  let {title}  =req.body
  api.getArticleByTitle(title)
    .then((oneArticle)=>{
      if(oneArticle){
        res.send({
          code:200,
          oneArticle
        })
      }else{
        throw new Error('没有找到该文章');
      }
    })
    .catch(err=>{
      res.send({
        code:-200,
        message:err.toString()
      })
    })
})

module.exports = router
