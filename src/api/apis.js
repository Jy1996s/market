// 1. 准备
// 引入axios模块
import axios from 'axios';

// 创建axios工程化实例
const axiosInstance = axios.create({
    // 配置项名称 : 配置项值
    // 定义axios的全局请求地址
    baseURL: 'http://127.0.0.1:8888'
})

// 2. 执行
// 登录接口 ------------------------------------------------------
export const login = (user) => {
    return axiosInstance
        .post('/login', user)
        .then(({ data }) => {
            return data // 直接返回数据对象
        })
}

// 获取首页用户名接口 ------------------------------------------------------
export const getUserName = (token) => {
    return axiosInstance
        .get('/user/getUserName', {
            params:{
                token
            }
        })
        .then(({ data }) => {
            return data // 直接返回数据对象
        })
}

// 获取用户角色 ------------------------------------------------------
export const getUserRole = (token) => {
    return axiosInstance
        .get('/user/getUserRole', {
            params:{
                token
            }
        })
        .then(({ data }) => {
            return data // 直接返回数据对象
        })
}


// 修改密码 ------------------------------
export const changePwd = (data) => {
    return axiosInstance
        .post('/user/changePwd',data)
        .then(({ data }) => {
            return data // 直接返回数据对象
        })
}

// 定义并导出接口地址
// 用户列表接口 ------------------------------------------------------
export const listUser = (data) => {
    return axiosInstance
        .post('/user/listUser',data)
        .then(({ data }) => {
            return data // 直接返回数据对象
        })
}

// 删除用户 --------------------
export const delUser = (id) => {
    return axiosInstance
        .get('/user/delUser',{
            params:{
                id
            }
        })
        .then(({ data }) => {
            return data // 直接返回数据对象
        })
}

// 编辑用户 --------------------
export const editUser = (data) => {
    return axiosInstance
        .post('/user/editUser',data)
        .then(({ data }) => {
            return data // 直接返回数据对象
        })
}

// 用户添加接口 ------------------------------------------------------
export const addacc = (newUser) => {
    return axiosInstance
        .post('/user/addacc', newUser)
        .then(({ data }) => {
            return data // 直接返回数据对象
        })
}


// 库存管理 ------------------------------------------------------
export const stock = () => {
    return axiosInstance
        .get('/purchase/stock')
        .then(({ data }) => {
            return data // 直接返回数据对象
        })
}

// 添加库存 ------------------------------------------------------
export const addstock = (params) => {
    return axiosInstance
        .post('/purchase/addstock', params)
        .then(({ data }) => {
            return data // 直接返回数据对象
        })
}
