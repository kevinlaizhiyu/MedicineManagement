// axios的拦截器 


import axios from 'axios'  //引入axios

axios.interceptors.request.use(function (config) {
  // 调用接口的时候把token加入到请求头
  let token=''
  try {
     token =JSON.parse(localStorage.getItem('userMsg')).token  
  } catch (error) {
    token = 'no token'
  }
  config.headers.authorization = 'Bearer '+ token 
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response.data;   //将拿到的数据进行过滤
}, function (error) {
  return Promise.reject(error);
});
export default axios   //抛出axios