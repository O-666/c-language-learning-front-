<template>
     <el-header class="header">
      <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold fold"></i>
            <i v-else class="el-icon-s-unfold fold"></i>
        </div>
      <!-- 系统logo -->
      <el-avatar :size="45" :src="require('../assets/images/logo.png')" />
      <strong class="logo">C语言学习系统</strong>
      <div class="avatar">
        <!-- 用户头像 -->
        <el-avatar :size="35" :src="require('../assets/images/bg.jpg')" />
      </div>
      <!-- 用户名下拉菜单 -->
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
         {{userName}}<i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
</template>
<script>
import eventBus from './EventBus';
export default {
    data(){
        return{
            collapse: false,
            username: 'user'
        }
    },
    computed:{
       userName() {
            let userName = localStorage.getItem('ms_username');
            return userName ? userName : this.username;
        }
    },
    methods:{
      // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            eventBus.$emit('collapse', this.collapse);
        }
    },
        mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
}
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    background-color: #1976d2;
    color: white;
    display: flex;
    align-items: center;
}
.fold{
    font-size: 30px;
    margin-right: 10px;
}
.logo{
    font-size: 20px;
    margin-left: 5px;
}
.avatar{
    text-align: right;
     width: 80%; 
}

  .el-dropdown-link {
    cursor: pointer;
    color: white;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>