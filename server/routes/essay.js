const express=require('express');
const router=express.Router();
const api=require('../models/model').Essay;
const checkToken=require('../middleware/checkToken');

router.post('/essay/create',checkToken,function(req,res,next){
    api.createEssay(req.body)
      .then((data)=>{
          res.send({
            code:200,
            message:'随笔创建成功'
          })
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
})
//获取所有随笔列表，后台
router.post('/essay/lists',function (req,res,next){
  let {page,limit}  =req.body;
  api.getEssayByTime(page,limit)
      .then((result)=>{
        let essaylist=result[0],
          total=result[1];
        res.send({
          code:200,
          essaylist,
            total
        })
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
})
// 根据classify获取随笔部分内容(前台使用)
router.post('/essay/part',function (req,res,next){
  let {page,limit,classify}  =req.body
  api.getEssayByClass(page,limit,classify)
      .then((result)=>{
    var essaylist=result[0],
      total=result[1],
      totalpage=Math.ceil(total/limit),
      hasNext=totalpage>page?1:0,
      hasPrev=page>1;
    res.send({
      code:200,
      essaylist,
      hasNext,
      hasPrev
    })})
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
})

// 根据postId获取其中一篇随笔（有权限）
router.post('/essay/detail',function (req,res,next){
  let {id}  =req.body;
  api.getOneEssay(id)
      .then((aEssay)=>{
        if(aEssay){
          res.send({
            code:200,
            aEssay
          })
        }else{
          throw new Error('没有找到该随笔');
        }
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
}),

// 删除一篇随笔
router.post('/essay/remove',checkToken,function (req,res,next){
  api.deleteEssay(req.body.id)
      .then(()=>{

          res.send({
            code:200,
            message:'该随笔成功删除'
          })
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
}),
// 编辑随笔
router.post('/essay/edit',checkToken,function (req,res,next){
  let id = req.body.id;
  let classify = req.body.classify;
  let title = req.body.title;
  let content = req.body.content;
  let image = req.body.image
  api.updateEssay(id,{classify,title,content,image})
  .then((data)=>{
      res.send({
        code:200,
        message:'编辑随笔成功'
      })
  })
  .catch(err=>{
    res.send({
      code:-200,
      message:err.toString()
    })
  })
})
module.exports = router
