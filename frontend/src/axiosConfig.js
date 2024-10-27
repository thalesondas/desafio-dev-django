import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

// Obtendo um novo access_token usando o refresh_token
const refreshAccessToken = async() => {
    const refreshToken = localStorage.getItem('refresh_token');
    try{
        const response = await axios.post('token/refresh/', { refresh: refreshToken });
        localStorage.setItem('access_token', response.data.access);
        return response.data.access;
    }catch(error){
        console.error("Falha ao atualizar Token", error);
        return null;
    }
}

// Interceptor para incluir o access token nas requisições
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para lidar com tentativa de atualizar o token e erros 401
axios.interceptors.response.use(
    response => response,
    async(error) => {
        const originalRequest = error.config;

        if(error.response && error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            const newAccessToken = await refreshAccessToken();

            if(newAccessToken){
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            }
        }
        return Promise.reject(error);
    }
)

export default axios;