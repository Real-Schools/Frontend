import { message, Modal, notification } from "antd";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import AuthorizationApi from "./authorization";

type DataType = {
  [key: string]: any;
};

export class HttpClient {
  static get axios(): AxiosInstance {
    // global axios interceptors for failed requests (could be moved to separate file?)
    axios.interceptors.response.use(undefined, (error) => {
      if (error?.response?.status) {
        switch (error?.response?.status) {
          case 401:
            Modal.confirm({
              title: "Authorization",
              content:
                "Your session has expired. You will be redirected to the login page.",
              onOk: () => window.location.reload(),
              onCancel: () => window.location.reload(),
            });

          case 500:
            message.error(
              "Internal server error. Please try again after some time."
            );

          case 503:
            message.error(
              "Service unavailable. Please try again after some time."
            );
        }

        return Promise.reject(error);
      }
    });

    return axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL,
      headers: {
        Authorization: AuthorizationApi.authorization_token,
      },
    });
  }

  static post(path: string, data: DataType): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      HttpClient.axios
        .post(path, data)
        .then(resolve)
        .catch((e: any) => {
          const reason = e?.response?.data?.message || e.message;

          notification.error({
            message: "Request Error",
            description: reason,
          });

          reject(new Error(reason));
        });
    });
  }

  static get(path: string, params = {}) {
    return new Promise((resolve, reject) => {
      HttpClient.axios
        .get(path, {
          params,
        })
        .then((response) => resolve(response.data))
        .catch((e: any) => {
          const reason = e?.response?.data?.message || e.message;

          notification.error({
            message: "Request Error",
            description: reason,
          });
          reject(new Error(reason));
        });
    });
  }
}
