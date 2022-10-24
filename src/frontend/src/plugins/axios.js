import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/",
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (e) => {
    const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";
    console.log(
      "ERROR_API: ",
      e?.response?.data?.error?.message || defaultMessage
    );
    return Promise.reject(e);
  }
);

export default axiosInstance;
