<template>
  <div class="box">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '300px'">
        <el-menu :collapse="isCollapse" router :unique-opened="true" active-text-color="#3d91f3"
          background-color="#28394c" class="el-menu-vertical-demo" :default-active="$route.path" text-color="#fff">
          <div class="logo">
            <img src="../assets/logo.svg" alt="">
            <h4 v-show="!isCollapse">Vue3+TypeScript实战</h4>
          </div>
          <el-menu-item index="/index" @click="addTab({
              title: '首页',
              name: '0',
              path: '/home'
            })">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu :index="item.path" v-for="item, index in menus" :key="index">
            <template #title>
              <el-icon>
                <component :is="item.meta.icon"></component>
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item :index="ele.path" v-for="ele, i in item.children" :key="i" @click="addTab(ele)">
              <template #title>
                <el-icon>
                  <component :is="ele.meta.icon"></component>
                </el-icon>
                <span>{{ ele.meta.title }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left">
            <el-icon :size="24" @click="isCollapse = !isCollapse">
              <component is="Fold"></component>
            </el-icon>
            <!-- 面包屑 -->
            <mianbao></mianbao>
          </div>
          <div class="right">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <img src="../assets/logo.svg" alt="">
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>还原数据</el-dropdown-item>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

          </div>
        </el-header>
        <el-main>
          <!-- 标签导航栏 -->
          <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-change="changeTab"
            @tab-remove="removeTab">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title"
              :name="item.name"></el-tab-pane>
          </el-tabs>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { getMenusApi, logoutApi } from '../utils/api'
import { ref, reactive, onMounted, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import mianbao from '../components/mianbao.vue'
let menus = ref(<any>[])
const isCollapse = ref(false)
const router = useRouter()
const route = useRoute()

const getMenus = () => {
  getMenusApi().then(res => {
    let data = res.data.data
    menus.value = data
    // console.log(data);

  })
}
const editableTabsValue = ref('0')
onMounted(() => {
  getMenus()

  editableTabs.value.forEach(item => {
    if (item.path == route.path) {
      editableTabsValue.value = item.name
    }
  })
})

const editableTabs = ref<{
  title: string;
  name: string;
  path: string;
}[]>(JSON.parse(localStorage.getItem('tabs')) || [{
  title: '首页',
  name: '0',
  path: '/home'
}])

watchEffect(() => {
  if (editableTabs.value.length > 0) {
    localStorage.setItem('tabs', JSON.stringify(editableTabs.value))
  } else {
    localStorage.removeItem('tabs')
  }

})

const addTab = (obj: any) => {
  if (obj.title == '首页') return editableTabsValue.value = '0'
  const tabs = editableTabs.value
  let newObj = {
    title: obj.meta.title,
    name: tabs.length.toString(),
    path: obj.path
  }

  let index = tabs.findIndex(item => item.title == newObj.title)
  if (index == -1) {
    editableTabs.value.push(newObj)
    editableTabsValue.value = newObj.name
  } else {
    editableTabsValue.value = (index).toString()

  }
}
const removeTab = (targetName: string) => {
  if (targetName === '0') return
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
}
const changeTab = (targetName: string) => {
  const tabs = editableTabs.value
  tabs.forEach((item, index) => {
    if (item.name == targetName) {
      router.push(item.path)
    }
  })

}
const logout = () => {
  ElMessageBox.confirm(
    '确定退出登陆吗?',
    '系统提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      logoutApi().then(res => {
        let { data } = res
        if (data.code === 200) {
          ElMessage({
            type: 'success',
            message: data.msg,
          })
          localStorage.clear()
          router.replace('/login')
        }
      })
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}

</script>


<style lang="scss" scoped>
.box {
  :deep(.el-tabs__item.is-active) {
    color: #fff;
    background-color: #37b176;
  }


  .el-container {
    height: 100%;
  }

  .logo {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #252931;
    height: 60px;

    img {
      width: 45px;
      margin: 0 5px;
    }

    h4 {
      font-size: 20px;
      color: #fff;
      font-weight: bold;
    }
  }

  .el-aside {
    transition: all 0.5s;
  }

  .el-menu {
    height: 100%;

    :deep(.el-menu--inline) {
      background-color: #1c2634;
    }
  }

  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;

    .left {
      display: flex;
      align-items: center;

      .el-icon {
        margin-right: 10px;
        cursor: pointer;
      }
    }

    .right {
      width: 50px;
      height: 50px;

      img {
        width: 100%;
        height: 100%;
        background-color: #1c2634;
        border-radius: 50%;
      }
    }
  }
}
</style>