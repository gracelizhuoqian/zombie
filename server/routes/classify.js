const express = require('express');
const router = express.Router();
const api = require('../models/model').Classify;
const checkToken = require('../middleware/checkToken');
// 创建分类，都是后台才有权限进行的操作，都要checkToken
router.post('/classify/create',checkToken, function (req, res, next) {
    api.createClass(req.body)
      .then((data) => {
        if (data && data.classify) {
          res.send({
            code: 200,
            message: '创建成功'
          })
        } else {
          throw new Error('创建失败');
        }
      })
      .catch(err => {
        res.send({
          code: -200,
          message: err.toString()
        })
      })
})
// 删除分类 加token
router.post('/classify/remove',checkToken, function (req, res, next) {
  api.removeClass(req.body.id)
    .then(() => {
      res.send({
        code: 200,
        message: '删除成功'
      })
    })
    .catch(err => {
      res.send({
        code: -200,
        message: err.toString()
      })
    })
})

// 编辑分类 加token
router.post('/classify/edit', checkToken,function (req, res, next) {

  let id = req.body.id;
  let classify = req.body.classify;
  api.updateClass(id, {classify: classify})
    .then(() => {

        res.send({
          code: 200,
          message: '编辑成功'
        })

    })
    .catch(err => {
      res.send({
        code: -200,
        message: err.toString()
      })
    })
})

// 获取所有分类
router.get('/classify/lists', function (req, res, next) {
  api.getAllClass()
    .then((lists) => {
      res.send({
        code: 200,
        lists
      })
    })
    .catch(err => {
      res.send({
        code: -200,
        message: err.toString()
      })
    })
})
// 无权限获取分类给前台使用
router.get('/classify/noAuth', function (req, res, next) {
  api.getAllClass()
    .then((lists) => {
      res.send({
        code: 200,
        lists
      })
    })
    .catch(err => {
      res.send({
        code: -200,
        message: err.toString()
      })
    })
})

module.exports = router;
