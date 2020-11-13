<template>
  <div>
    <div id="menuRight" :class="{ shadowBox: showMenu }">
      <div id="floatMenuIcon" @click="showMenu = !showMenu">
        {{ showMenu ? ">" : "<" }}
      </div>
      <div id="menuBox">
        <ul id="menuList" v-if="showMenu">
          <li
            v-for="(item, index) in menuList"
            :key="index"
            @click="clickHandle(item.value)"
          >
            {{ item.value }}
          </li>
        </ul>
      </div>
    </div>
    <iframe
      id="iframe"
      style="width: 100%; height: -webkit-fill-available"
      ref="iframe"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      menuList: [
        {
          value: "1-小册食用指南",
        },
        {
          value: "2-JS 基础知识点及常考面试题（一）",
        },
        {
          value: "3-JS 基础知识点及常考面试题（二）",
        },
        {
          value: "4-ES6 知识点及常考面试题",
        },
        {
          value: "5-JS 异步编程及常考面试题",
        },
        {
          value: "6-手写 Promise",
        },
        {
          value: "7-Event Loop",
        },
        {
          value: "8-JS 进阶知识点及常考面试题",
        },
        {
          value: "9-JS 思考题",
        },
        {
          value: "10-DevTools Tips",
        },
        {
          value: "11-浏览器基础知识点及常考面试题",
        },
        {
          value: "12-浏览器缓存机制",
        },
        {
          value: "13-浏览器渲染原理",
        },
        {
          value: "14-安全防范知识点",
        },
        {
          value: "15-从 V8 中看 JS 性能优化",
        },
        {
          value: "16-性能优化琐碎事",
        },
        {
          value: "17-Webpack 性能优化",
        },
        {
          value: "18-实现小型打包工具",
        },
        {
          value: "19-React 和 Vue 两大框架之间的相爱相杀",
        },
        {
          value: "20-Vue 常考基础知识点",
        },
        {
          value: "21-Vue 常考进阶知识点",
        },
        {
          value: "22-React 常考基础知识点",
        },
        {
          value: "23-React 常考进阶知识点",
        },
        {
          value: "24-监控",
        },
        {
          value: "25-UDP",
        },
        {
          value: "26-TCP",
        },
        {
          value: "27-HTTP 及 TLS",
        },
        {
          value: "28-HTTP23",
        },
        {
          value: "29-输入 URL 到页面渲染的整个流程",
        },
        {
          value: "30-设计模式",
        },
        {
          value: "31-常见数据结构",
        },
        {
          value: "32-常考算法题解析",
        },
        {
          value: "33-CSS 常考面试题资料",
        },
        {
          value: "34-如何写好一封简历",
        },
        {
          value: "35-面试常用技巧",
        },
        {
          value: "36-前方的路，让我们结伴同行",
        },
      ],
      iframeData: require("./interview01/1-小册食用指南.htm"),
    };
  },
  methods: {
    clickHandle(value) {
      this.$refs.iframe.removeAttribute("src");
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.$refs.iframe.contentDocument.body.scrollTop = this.$refs.iframe.contentDocument.documentElement.scrollTop = 0;
          this.$refs.iframe.contentDocument.documentElement.innerHTML = require("./interview01/" +
            value +
            ".htm");
          this.setStyle();
        });
      });

      // 2.切换路径促使切换数据
      // this.src = "./static/second.html";
    },
    setStyle() {
      let commonCode = document
        .getElementById("iframe")
        .contentWindow.document.getElementsByClassName("commonCode");
      for (var i = 0; i < commonCode.length; i++) {
        commonCode[i].style.background = "#f8f8f8";
        commonCode[i].style.padding = "7px 12px";
      }

      let commonImg = document
        .getElementById("iframe")
        .contentWindow.document.getElementsByTagName("img");
      for (var i = 0; i < commonImg.length; i++) {
        commonImg[i].style.width = "100%";
        commonImg[i].style.height = "auto";
      }

      // 隐藏评论
      let commonComments = document
        .getElementById("iframe")
        .contentWindow.document.getElementsByClassName("book-comments");
      for (var i = 0; i < commonComments.length; i++) {
        commonComments[i].style.display = "none";
      }

      // 隐藏头部
      let commonDirectory = document
        .getElementById("iframe")
        .contentWindow.document.getElementsByClassName("book-directory");
      for (var i = 0; i < commonDirectory.length; i++) {
        commonDirectory[i].style.display = "none";
      }
      let commonSummary = document
        .getElementById("iframe")
        .contentWindow.document.getElementsByClassName("book-summary");
      for (var i = 0; i < commonSummary.length; i++) {
        commonSummary[i].style.display = "none";
      }
      let commonHeader = document
        .getElementById("iframe")
        .contentWindow.document.getElementsByClassName("book-content__header");
      for (var i = 0; i < commonHeader.length; i++) {
        commonHeader[i].style.display = "none";
    },
  },
  mounted() {
    this.$refs.iframe.contentDocument.documentElement.innerHTML = this.iframeData;
    this.setStyle();
  },
};
</script>

<style>
#menuRight{
  height: calc(100vh - 9rem);
  position: fixed;
  background: #fff;
  border-radius: 5px;
  padding: 3rem 2rem 2rem 2rem;
  right: 5px;
  bottom: 0;
}

#menuBox {
  overflow: auto;
  height: 100%;
}

#menuList {
  cursor: pointer;
}

#floatMenuIcon {
  width: 2rem;
  height: 2rem;
  background: #fff;
  box-shadow: 0 0 5px 5px #eee;
  border-radius: 50%;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  text-align: center;
  line-height: 2rem;
  color: #333;
  cursor: pointer;
}

.shadowBox {
  box-shadow: 0 0 5px 5px #eee;
}
</style>