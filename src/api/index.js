import axios from 'axios'
const API_URL = '/api/users/'

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API,
  headers: {
      Authorization : ""
  }
});

api.interceptors.request.use(
  (config) =>  {
      
      const user = JSON.parse(localStorage.getItem("user"))
      
      config.headers.Authorization = user ? `Bearer ${user?.token}` : "";
      
      return config;
  }, 
  (error) => {
      console.log(error);
      return;
  }
);

//Auth
export const login = (body) => {
    return api.post(API_URL + 'login', body);  
}

export const register = (body) => {
  return api.post(API_URL + 'register', body);
}

//logout user
export const logout = () => {
    localStorage.removeItem('user')
}

//GET, POST, PUT, DELETE

export const post = (url, body) => {
    return api.post(url, body)
        /*.then(response => {
            console.log(response)
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })*/
}

export const get = (url) => {
    return api.get(url)
        /*.then(response => {
            setData(response.data);
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => {
            setIsFetching(false);
        });*/
}

export const put = (url, body, setData, setError, aux) => {
    return api.put(url, body)
        /*.then(response => {
            setData(response?.data);
            if(aux) {
                aux();
            } 
        })
        .catch((error) => {
            //setError(error?.response?.data);
        })*/
}

export const remove = (url, setData, setError, setIsFetching) => {
    return api.delete(url)
        /*.then(response => {
            setData(response?.data);
            console.log(response?.data)
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => {
            setIsFetching(false);
        });*/
}