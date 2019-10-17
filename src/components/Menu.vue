<template>
  <div class="menu">
    <!-- 
        default-active="2"  默认选中的菜单项,值为菜单的index属性值
        :default-active="$route.fullPath"  动态路由获取
        @open="handleOpen"  菜单打开时的事件监听
        @close="handleClose"菜单关闭时的事件监听
        unique-opened  : 是否唯一开启一个菜单
        router    :      是否以当前选中菜单的index来作为路由地址

    -->
    <el-menu
      :default-active="$route.fullPath"
      class="el-menu-vertical-demo"
      unique-opened
      router
      background-color="#2E3F56"
      text-color="#93A1B1"
      active-text-color="#d3dce6"
      style="border-right: none;"
    >
      <!-- 带子级  -->
      <el-submenu :index="menu.index" v-for="menu in filterList" :key="menu.index">
        <!-- 菜单名称 -->
        <template slot="title">
          <i :class="menu.cls"></i>
          <span>{{menu.title}}</span>
        </template>

        <!-- 子集菜单项目 -->
        <el-menu-item
          :index="item.index"
          v-for="item in menu.children"
          :key="item.index"
          style="padding-left:70px"
        >
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
// 引入接口
import { getUserRole } from "@/api/apis";
export default {
  data() {
    return {
      // 动态菜单创建
      treelist: [
        {
          index: "1",
          cls: "el-icon-s-cooperation",
          title: "商品管理",
          roles: ['1', '2'],
          children: [
            { index: "/home/productManage", name: "商品列表" },
            { index: "/home/AddProduct", name: "添加管理" }
          ]
        },
        {
          index: "2",
          cls: "el-icon-s-goods",
          title: "账号管理",
          roles: ['1'],
          children: [
            { index: "/home/AccManage", name: "账号管理" },
            { index: "/home/changePswd", name: "修改密码" },
            { index: "/home/AddAcc", name: "增加账号" }
          ]
        },
        {
          index: "3",
          cls: "el-icon-circle-plus",
          title: "进货管理",
          roles: ['1'],
          children: [
            { index: "/home/Stock", name: "库存管理" },
            { index: "/home/AddStock", name: "添加库存" }
          ]
        },
        {
          index: "4",
          cls: "el-icon-remove",
          title: "出货管理",
          roles: ['1'],
          children: [
            { index: "/home/SalesList", name: "销售列表" },
            { index: "/home/commodityOut", name: "商品出库" },
            { index: "/home/commodityBack", name: "商品退货" }
          ]
        },
        {
          index: "5",
          cls: "el-icon-s-data",
          title: "统计管理",
          roles: ['1'],
          children: [
            { index: "/home/SaleSta", name: "销售统计" },
            { index: "/home/stocksta", name: "进货统计" }
          ]
        },
        {
          index: "6",
          cls: "el-icon-s-custom",
          title: "会员管理",
          roles: ['1'],
          children: [
            { index: "/home/Acc", name: "账号管理" },
            { index: "/home/Add", name: "添加账号" }
          ]
        }
      ],

      currentRole: '2' // 当前角色
    };
  },
  methods: {},
  computed: {
    filterList() {
      const _this = this;
      return _this.treelist.filter(v => {
        // 根据当角色过滤对应的菜单
        return v.roles.includes(_this.currentRole);
      });
    }
  },
  mounted() {
    const _this = this;
    let token = localStorage.getItem("token");
    getUserRole(token) // 发送请求 获取用户角色
      .then(result => {
        // 当前角色接收 登录角色的值
        _this.currentRole = result.role;
      })
      .catch(err => {
        if (err) {
          alert(err);
        }
      });
  }
};
</script>

<style lang="less">
.el-menu,
.menu {
  height: 100%;

  .el-submenu__title {
    padding-left: 0 !important;
  }

  .el-menu-item.is-active {
    background-color: rgb(41, 82, 122) !important;
  }
}
</style>