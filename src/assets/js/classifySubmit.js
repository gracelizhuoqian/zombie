export function sub(obj,res){
  obj.btnText="提交";
  obj.editLoading = false;

  if(res.data.code==200){
    obj.$notify({
      title:'成功',
      message:'提交成功',
      type:'success'
    })
  }else if(res.data.code==401){
    obj.$notify({
      title:'失败',
      message:'请重新登录',
      type:'error'
    })
    setTimeout(()=>{
      obj.$router.replace({path:'/login'})
    },500)
    return false//阻止继续执行
    // 需要优化
  }else if(res.data.code==403){
    obj.$notify({
      title:'失败',
      message:"非管理员身份不能进行该操作",
      type:'error'
    })
  }
  obj.formVisible = false;
}
