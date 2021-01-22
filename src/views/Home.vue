<template>
  <el-container>
    <!-- 头部 -->
    <Header></Header>
    <el-container>
      <!-- 侧栏 -->
      <Aside></Aside>
      <el-container>
        <!-- <el-main>Main</el-main>
        <el-footer>©oufengling 邮箱：2044066152@qq.com</el-footer> -->
        <div class="content-box" :class="{'content-collapse':collapse}">
            <Tags></Tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
      </el-container>
    </el-container>
  </el-container>
</template>

<style  scoped>
@import "../assets/css/Home.css";
</style>
<script>
import Header from './Header.vue';
import Aside from './Aside.vue';
import Tags from './Tags.vue';
import eventBus from './EventBus';
export default {
  data(){
    return{
      tagList:[],
      collapse:false
    };
  },
  components: {
    Header,
    Aside,
    Tags
  },
  created() {
        eventBus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        eventBus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    }
};
</script>