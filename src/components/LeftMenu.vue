<template>
    <el-menu router :collapse="isCollapse" background-color="#334e66" text-color="#fff" active-text-color="#ffd04b"
        class="left-menu">
        <el-submenu v-for="(item,index) in menuData" :key="item.id" :index="index+''">
            <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span>{{item.name}}</span>
            </template>
            <el-menu-item v-for="(item) in item.children" :key="item.id" :index="item.path">{{item.name}}
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
import { Menu } from '@/api/index';
export default {
    created() {
        this.loadMenu();
    },
    props: ['isCollapse'],
    data() {
        return {
            menuData: [],
        }
    },
    methods: {
        async loadMenu() {
            var id = sessionStorage.role;
            let { status, data } = await Menu.loadMenu({ id });
            if (status) {
                this.menuData = data;
            }
        }
    },

};
</script>
<style lang="less" scope>
.left-menu {
    color: white;
    height: calc(100vh - 60px);

    .el-menu-item {
        text-align: center;
    }
}
</style>