<template>
    <div class="login">
        <div class="form">
            <h2>系统登录</h2>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" type="password" />
                </el-form-item>
                <div class="code">
                    <el-form-item prop="code">
                        <el-input v-model="ruleForm.code" />
                    </el-form-item>
                    <img :src="imgUrl" alt="" @click="getCode">
                </div>
                <el-form-item class="btn">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        登录
                    </el-button>
                    <el-button @click="resetForm(ruleFormRef)" type="danger" plain>还原数据</el-button>
                </el-form-item>
            </el-form>
            <h4 style="font-weight: bold;">温馨提示：<span style="color: red; font-size: 14px;">账号无法登陆的时候，请点击【还原数据】按钮</span></h4>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { getCodeApi, loginApi } from '../utils/api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const formSize = ref('large')
const ruleFormRef = ref<FormInstance>()
const ruleForm: { username: string, password: string, code: string } = reactive({
    username: 'admin',
    password: '1234',
    code: ''
})
const imgUrl = ref('')
const rules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
})
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            let form = { ...ruleForm }
            await loginApi(form).then(res => {
                let { data } = res
                if (data.code === 200) {
                    ElMessage({
                        message: '登录成功',
                        type: 'success'
                    })
                    localStorage.setItem('token', data.token)
                    router.push('/home')
                } else if (data.code === 500) {
                    ElMessage({
                        message: data.msg,
                        type: 'error'
                    })
                }
            })
        }
    })
}

const getCode = async () => {
    await getCodeApi().then(res => {
        // console.log(res)
        // const { data } = res
        // imgUrl.value = 'data: image/jpeg;base64,' + data;
        // console.log(imgUrl.value);
        let blob = new Blob([res.data]);   // 返回的文件流数据
        let url = window.URL.createObjectURL(blob);  // 将他转化为路径
        imgUrl.value = url
    })
}
onMounted(() => {
    getCode()
})

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;


    .form {
        h2 {
            font-weight: bold;
            text-align: center;
            margin-bottom: 22px;
        }

        box-shadow: 0 0 15px #ccc;
        padding: 10px 20px;
        width: 480px;
        border-radius: 10px;

        .code {
            display: flex;
            align-items: center;

            .el-form-item {
                flex: 1;
            }

            img {
                width: 135px;
                height: 45px;
                margin-left: 20px;
                margin-bottom: 22px;
            }
        }

        .btn {

            .el-button {
                width: 48%;
            }
        }
    }
}
</style>