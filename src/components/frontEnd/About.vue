<template lang="html">
  <div class="portfolio">
    <header class="banner">
      <ul @click="jump">
        <li>ABOUT</li>
        <li>PORTFOLIO</li>
        <li>CONTACT</li>
      </ul>
    </header>
    <div class="inner">
      <section class="about">
        <img src="../../assets/img/me.jpg" alt="Zhuoqian Li">
        <p class="objective">I'm firmly committed to being an excellent front-end engineer. I like drawing, travelling and
          delicious food. I believe that no matter what happened, there is always something worth appreciating.</p>
        <dl>
          <dt>Education Background</dt>
          <dd>
            <p>Master: SJTU &nbsp Computer Technology &nbsp  Wireless Network<br>
              Graduate: SEU  &nbsp Information Technology  &nbsp GPA:3.9
            </p>
          </dd>
        </dl>
        <dl>
          <dt>Vocational Skills</dt>
          <dd>
            <h3>HTML / CSS</h3>
            <p>CSS Layouts--Flex / Grid / Responsive Web<br>HTML5, CSS3--Box Model / Float / Position / BFC</p>
            <h3>JavaScript / JQuery</h3>
            <p>Native JS--Event Model / DOM / Ajax / Closure / Prototype / ES6<br>Common Demo--slider / Waterfall flow / lazy load</p>
            <h3>Frameworks / Tools / Others</h3>
            <p>Vue.js / BootStrap<br>
              Node.js / Unix Command Line<br>
              mongodb</p>
            <h3>Back-End</h3>
            <p>Node.js / HTTP protocol / C++</p>
          </dd>
        </dl>
      </section>
      <section class="works">
        <h2>PORTFOLIO</h2>
        <ul class="grid">
          <li><img src="http://qlip.in/images/YMCA-Realtor-Donation-3.jpg" alt=""/></li>
          <!--<li><img src="http://qlip.in/images/webcaballero.jpg" alt=""/></li>-->
          <!--<li><img src="http://qlip.in/images/webmarqas.jpg" alt=""/></li>-->
          <!--<li><img src="http://qlip.in/images/webbrandaxis.jpg" alt=""/></li>-->
          <!--<li><img src="http://qlip.in/images/panacea1.jpg" alt=""/></li>-->
          <!--<li><img src="http://qlip.in/images/webgatomalo.jpg" alt=""/></li>-->
        </ul>
      </section>
      <section class="contact">
        <h2>CONTACT</h2>
        <div class="communication">
          <p>QQ: 827924130</p>
          <p>Email: 827924130@qq.com</p>
          <p>WeChat: lizhupji</p>
          <p>Github: <a href="https://github.com/gracelizhuoqian">gracelizhuoqian</a></p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    methods:{
      jump:function(event){
        let target=event.target.innerText;
        let jumps=document.querySelectorAll("section");
        let toJump;
        if(target=="ABOUT"){
          toJump=jumps[1].offsetTop;
        }else if(target=="PORTFOLIO"){
          toJump=jumps[2].offsetTop;
        }else if(target=="CONTACT"){
          toJump=jumps[3].offsetTop;
        }
        document.body.scrollTop = toJump;
        // Firefox
        document.documentElement.scrollTop = toJump;
        // Safari
        window.pageYOffset = toJump;
      }
    },
    mounted(){
    }
  }
</script>

<style scope>
  .banner ul{
    width: 100%;
    padding: 10px 0;
    margin: 40px 0 0 0;
    padding-left: 40%;
    background: #6e866e;
  }
  .banner li{
    display: inline-block;
    color: #ffffff;
    margin-right: 20px;
  }
  .inner{
    width: 90%;
    margin: 0 auto;
    box-shadow: 2px 0 2px gray,-2px 0 2px gray;
  }

  .about{
    overflow: hidden;
    padding: 0 2rem;
    color: #666666;
  }
  .about .objective{
    font-family: Georgia, serif;
    font-style: italic;
    color: #666;
    text-align: left;
    text-indent: 2rem;
    padding: 2rem;
    line-height: 1.5;
    font-size: 1.6rem;
  }
  .about img{
    float: right;
    padding: 10px;
    background: #fff;
    margin: 0 30px;
    transform: rotate(-4deg);
    box-shadow: 0 0 4px rgba(0, 0, 0, .3);
    width: 20%;
    max-width: 220px
  }

  dt {
    font-style: italic;
    font-weight: 600;
    font-size: 18px;
    text-align: right;
    padding: 0 26px 0 0;
    width: 150px;
    border-right: 1px dashed #999
  }
  dl {
    display: table-row
  }
  dl h3{
    font-weight: 500;
    font-size: 1.7rem;
    line-height: 1.1;
  }
  dl dt, dl dd {
    display: table-cell;
    padding-bottom: 10px
  }
  dl dd {
    width: 700px;
    padding-left: 26px;
    text-align:left;
  }
  .works{
    background-color: #c0c7c0;
  }
  h2{
    padding-top: 2rem;
    color: #555555;
  }
  .works .grid{
    padding:0;
    max-width:100%;
    list-style:none;
    margin-top:20px;
  }
  .works .grid li{
    display: inline-block;
    margin:20px;
    width: 40%;
  }
  .works .grid img{
    width: 100%;
  }
  .contact .communication{
    text-align: left;
    padding: 2rem 6rem;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 768px){
    .inner{
      width: 100%;
    }
    .about img{
      transform: rotate(-6deg) translateY(5rem);
      padding: 7px;
    }
    .about .objective{
      padding: 1rem;
      padding-right: 25%;
    }
    .works .grid li{
      width: 80%;
    }
    dt{
      width: 100px;
      padding: 0 15px 0 0;
      font-size: 1.6rem;
    }
    dl dd{
      padding-left: 15px;
    }
    dl h3{
      font-size: 1.5rem;
    }
    dl{
      font-size: 1.2rem;
    }
    h2{
      font-size: 1.8rem;
    }
    .contact .communication{
      padding: 1rem 4rem;
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 480px){
    .banner ul{
      padding: 5px 0;
      margin: 30px 0 0 0;
      padding-left: 20%;
    }
    .banner li{
      font-size: 1.5rem;
      margin-right: 10px;
    }
    .about{
      padding: 0;
    }
    .about img{
      transform: rotate(0deg) translateY(2rem);
      padding: 0px;
      -webkit-border-radius: 20%;
      -moz-border-radius: 20%;
      border-radius: 20%;
      width: 20%;
      margin: 1rem;
    }
    .about .objective{
      font-size: 1.4rem;
    }
    .works .grid li{
      width: 100%;
      padding: 0;
      margin: 0 0 1rem 0;
    }
    .works .grid img{
      width: 100%;
      margin: 0;
    }
    dt{
      width: 50px;
      padding: 0 5px 0 0;
      font-size: 1.5rem;
    }
    dl dd{
      padding-left: 5px;
    }
    dl h3{
      font-size: 1.4rem;
    }
    dl{
      font-size: 1.2rem;
    }
    h2{
      font-size: 1.6rem;
    }
    .contact .communication{
      padding: 1rem 4rem;
      font-size: 1.4rem;
    }
  }
</style>
