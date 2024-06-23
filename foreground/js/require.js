
// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:9000', // 你的API基础URL
  timeout: 1000, // 请求超时时间
});

console.log(instance)
 
// 设置请求拦截器
instance.interceptors.request.use(config => {
	debugger
  // 从本地存储或任何方式获取token
  const token = localStorage.getItem('userToken')
  // 如果token存在，则在HTTP请求头部加入token
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  
  console.log(config)
 
  return config;
}, error => {
  // 请求错误处理
  return Promise.reject(error);
});
 
// // 使用axios实例发送请求
// instance.get('/your-endpoint')
//   .then(response => {
//     // 处理响应数据
//     console.log(response.data);
//   })
//   .catch(error => {
//     // 处理错误情况
//     console.error(error);
//   });