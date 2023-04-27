import request from './request'

// 验证码
// export const getCodeApi = () => request.post('/api/sysUser/image', { responseType: 'blob' })
export function getCodeApi() {
    return request({
        url: '/api/sysUser/image',
        method: 'POST',
        responseType: 'blob'
    })
}

//登录
// export const loginApi = (data: any) => request.post('/api/user/login', data)
export function loginApi(data: any) {
    return request({
        url: '/api/user/login',
        method: "POST",
        data
    })
}

// 获取菜单
export function getMenusApi() {
    return request({
        url: '/api/sysUser/getMenuList',
        method: 'GET'
    })
}

// 退出登录
export function logoutApi() {
    return request({
        url: '/api/sysUser/loginOut',
        method: 'POST'
    })
}