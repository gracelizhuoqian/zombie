const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  abstract: String,
  content: String,
  classify: String,
  contentToMark: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }//录入时间记录
});
//每次在存储数据前都会调用该方法
articleSchema.pre("save", function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});
articleSchema.statics = {
  // 按时间获取所有文章（分页）——前文章页面,后列表页面
  getArctilesByTime: function (page, limit) {
    let skip = (page - 1) * limit;
    return Promise.all([this.find({}).skip(skip).limit(limit).sort("meta.updateAt").select("-content -contentToMark"),
      this.countDocuments({})]);
  },
  // 获取某类文章（分页）——前文章页面，后列表页面
  getArticlesByClass: function (c, page, limit) {
    let skip = (page - 1) * limit;
    return Promise.all([this.find({classify: c}).skip(skip).limit(limit).sort("meta.updateAt").select("-content" +
      " -contentToMark"),
      this.countDocuments({classify:c})]);
  },
  // 获取某一篇文章
  getArticleById: function (id) {
    return this.findOne({_id: id});
  },
  // 获取所有文章标题 搜索需要
  getArticleTitles: function () {
    return this.find({}).sort("meta.updateAt").select("title");
  },
  // 按照标题获取文章 搜索需要
  getArticleByTitle: function (t) {
    return this.findOne({title: t});
  },
  // 创建文章
  createArticle: function (params) {
    return this.create(params);
  },
  // 删除
  deleteArticle: function (id) {
    return this.remove({_id: id});
  },
  // 更新
  updateArticle: function (id, data) {
    return this.updateOne({_id: id}, {$set: data});
  }
}
module.exports = articleSchema;
