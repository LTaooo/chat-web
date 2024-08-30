import axios from 'axios';

// 获取 token 的函数（假设从本地存储中获取）
function getToken() {
    // 从本地存储或其他地方获取 token
    return localStorage.getItem('token');
}

// 创建 axios 实例
const http = axios.create({
    baseURL: 'http://10.10.40.205:9500', // 替换为你的 API 基础 URL
    headers: {
        'Content-Type': 'application/json'
    }
});

async function fetchToken() {
    try {
        const response = await axios.post('http://10.10.40.205:9500/api/user/auth?user_id=1');
        const token = response.data.token;
        localStorage.setItem('token', token); // 缓存 token 到本地
        return token;
    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
}

// 添加请求拦截器，在每次请求前自动将 token 添加到 headers
http.interceptors.request.use(async config => {
    let token = localStorage.getItem('token');

    if (!token) {
        token = await fetchToken(); // 如果没有 token，获取 token
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default http;
