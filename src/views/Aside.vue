<template>
    <el-aside class="aside">
         <el-menu
            class="aside-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#E0E0E0"
            text-color="#333"
            active-text-color="#66a9ec"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
      </el-aside>
</template>
<script>
import eventBus from './EventBus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-wind-power',
                    index: 'chapterManagement',
                    title: '章节管理'
                },
                {
                    icon: 'el-icon-collection-tag',
                    index: 'knowledgePointManagement',
                    title: '知识点管理'
                },
                {
                    icon: 'el-icon-collection',
                    index: 'materialManagement',
                    title: '资料管理'
                },
                {
                    icon: 'el-icon-edit-outline',
                    index: 'questionBankManagement',
                    title: '题库管理'
                },
                {
                    icon: 'el-icon-document',
                    index: 'algorithmManagement',
                    title: '算法管理'
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        eventBus.$on('collapse', msg => {
            this.collapse = msg;
            eventBus.$emit('collapse-content', msg);
        });
    }
};
</script>
<style scoped>
.aside {
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
}
.aside::-webkit-scrollbar {
    width: 0;
}
.aside-el-menu:not(.el-menu--collapse) {
    width: 200px;
}
.aside > ul {
    height: 100%;
}
</style>
