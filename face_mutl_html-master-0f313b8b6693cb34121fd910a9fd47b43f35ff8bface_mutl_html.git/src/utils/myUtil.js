  export default {
    //复制到剪贴板
     onCopy(b){
          console.log(1,b);
          var Url2=document.getElementById(b).innerText;
          console.log(2,Url2);
          var oInput = document.createElement('input');     //创建一个隐藏input
          console.log(oInput);
          oInput.value = Url2;    //赋值
          document.body.appendChild(oInput);
          oInput.select(); // 选择对象
          document.execCommand("Copy"); // 执行浏览器复制命令
          oInput.className = 'oInput';
          oInput.style.display='none';
                        
         this.$message.success(
                 "复制成功",
                 2,
               );
     },
    
    
  }
 