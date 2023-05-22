import axios from 'axios';


const userAccessToken = localStorage.getItem('token');

const axiosInstance = axios.create({
    // baseURL: 'https://walrus-app-ovpy2.ondigitalocean.app/',
    // baseURL: 'http://localhost:3000/',
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Add any custom headers or request configurations here
        console.log({userAccessToken},"check userAccesstoken")
        if (!userAccessToken) {
            localStorage.clear()
            window.location.reload(false);
        }
        if (userAccessToken) {
            config.headers.Authorization = `Bearer ${userAccessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Handle any successful responses here
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401) {
            localStorage.clear();
            window.location.assign('/login');
            // originalRequest._retry = true;

            /*try {
                const url = `/user/accessToken/${userAccessToken}`
                const response = await axiosInstance.put(url, {
                    // pass any necessary data for token refresh here
                });
                if (response.status === 200) {
                    const token = response.data['newRefreshToken'];
                    localStorage.setItem('token', token);
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                } else {
                    localStorage.clear();
                    window.location.assign('/login')
                }
            } catch (e) {
                // handle token refresh error
                // TODO: Empty Local Storage and redirect to Login Page

                console.log(e);
            }*/
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
