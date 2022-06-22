import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AlertController, NavController } from '@ionic/angular';

export interface initOptions {
  version: number;
}

export interface Params {
  [key: string]: any;
}

export interface Body {
  [key: string]: Object;
}

export interface LoginOptions {
  path: string;
  params?: Params;
}

export interface GetOptions {
  path: string;
  params?: Params;
}

export interface DeleteOptions {
  path: string;
  params?: Params;
  body?: Body;
}

export interface ModelOptions {
  path: string;
  // params?: Params;
}

export interface PostOptions {
  path: string;
  body?: Body;
  params?: Params;
  // server: Number;
}

export interface UploadOpstions {
  path: string;
  data?: any;
  server: Number;
  key?: string;
}

export interface ErrorResponse {
  id: string;
  code: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  public axios: AxiosInstance;
  public errorHandler: ErrorHandler;

  // Ubah menjadi false untuk mendapatkan error respon berbentuk text
  debug: boolean = true;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.errorHandler = this.errorHandler;
    this.axios = axios.create({
      timeout: 30000,
      // baseURL: environment.SERVER_URL,
    });

    // this.interceptor();
  }

  // public interceptor() {
  //   this.axios.interceptors.request.use(
  //     function (config) {
  //       // Do something before request is sent
  //       // //console.log(config);
  //       const credentials = JSON.parse(localStorage.getItem("credentials"));
  //       const userInfo = JSON.parse(localStorage.getItem("userinfo"));

  //       if (typeof config.params === "undefined") {
  //         config.params = {};
  //       }

  //       if (environment.SECURITY_MODE === "sso") {
  //         config.headers."X-Authorization" =
  //           typeof credentials !== "undefined" && credentials
  //             ? `${credentials.access_token}`
  //             : "";

  //         if (typeof config.params !== "undefined") {
  //           config.params.user_id =
  //             typeof userInfo !== "undefined" && userInfo
  //               ? userInfo.puserId
  //               : 0;
  //         }
  //       } else {
  //         // tslint:disable-next-line:max-line-length
  //         config.headers."X-Authorization" =
  //           typeof credentials !== "undefined" && credentials
  //             ? `Bearer ${credentials.access_token.access_token}`
  //             : "";
  //         // config.params."X-Authorization" =
  //         //   typeof credentials !== "undefined" && credentials
  //         //     ? `${credentials.sso_access_token}`
  //         //     : "";
  //       }

  //       if (config.params.noauth) {
  //         delete config.headers."X-Authorization";
  //         delete config.params."X-Authorization";
  //         delete config.params.user_id;
  //         delete config.params.noauth;
  //       }

  //       return config;
  //     },
  //     function (error) {
  //       // Do something with request error
  //       return Promise.reject(error);
  //     }
  //   );
  // }

  // public isAuth() {
  //   if (localStorage.getItem("token")) return true;
  //   else return false;
  // }

  public async model(options: GetOptions): Promise<any> {
    try {
      let token = localStorage.getItem('token');
      let headers = {
        'Content-Type': 'application/json',
        "X-Authorization": token ? token : '',
        // 'accept': '*/*',
      };

      let res = await this.axios.request({
        method: 'GET',
        baseURL: environment.BASE_URL,
        url: options.path,
        headers: headers,
        params: options.params,
      });

      return res.data;
    } catch (err) {
      const errData = JSON.parse(JSON.stringify(err));
      return Promise.reject(this.debug ? errData : errData.message);
    }
  }

  public async get(options: GetOptions): Promise<any> {
    try {
      let token = localStorage.getItem('token');
      let headers = {
        'Content-Type': 'application/json',
        "X-Authorization": token ? token : '',
        // 'accept': '*/*',
      };

      let res = await this.axios.request({
        method: 'GET',
        baseURL: environment.BASE_URL,
        url: options.path,
        headers: headers,
        params: options.params,
      });

      return res.data;
    } catch (err) {
      const errData = JSON.parse(JSON.stringify(err.response.data));
      errData[`status`] = err.response.status;

      return Promise.reject(this.debug ? errData : errData.message);
    }
  }

  public async post<T>(options: PostOptions): Promise<T> {
    try {
      let token = localStorage.getItem('token');
      let headers = {
        'Content-Type': 'application/json',
        "X-Authorization": token ? token : '',
      };

      let res = await this.axios.request<T>({
        method: 'POST',
        headers: headers,
        baseURL: environment.BASE_URL,
        url: options.path,
        data: options.body,
        params: options.params,
      });
      return res.data;
    } catch (err) {
      const errData = JSON.parse(JSON.stringify(err.response.data));
      errData[`status`] = err.response.status;

      return Promise.reject(this.debug ? errData : errData.message);
    }
  }

  public async put<T>(options: PostOptions): Promise<T> {
    try {
      let token = localStorage.getItem('token');
      let headers = {
        'Content-Type': 'application/json',
        "X-Authorization": token ? token : '',
      };

      let res = await this.axios.request<T>({
        method: 'PUT',
        headers: headers,
        baseURL: environment.BASE_URL,
        url: options.path,
        data: options.body,
        params: options.params,
      });
      return res.data;
    } catch (err) {
      const errData = JSON.parse(JSON.stringify(err.response.data));
      errData[`status`] = err.response.status;

      return Promise.reject(this.debug ? errData : errData.message);
    }
  }

  public async delete(options: DeleteOptions): Promise<any> {
    try {
      let token = localStorage.getItem('token');
      let headers = {
        'Content-Type': 'application/json',
        "X-Authorization": token ? token : '',
        // 'accept': '*/*',
      };

      let res = await this.axios.request({
        method: 'DELETE',
        baseURL: environment.BASE_URL,
        url: options.path,
        headers: headers,
        params: options.params,
        data: options.params,
      });

      return res.data;
    } catch (err) {
      const errData = JSON.parse(JSON.stringify(err.response.data));
      errData[`status`] = err.response.status;

      return Promise.reject(this.debug ? errData : errData.message);
    }
  }

  public async login<T>(options: PostOptions): Promise<T> {
    try {
      let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json',
      };
      var qs = require('qs');
      let data = qs.stringify(options.body);

      let res = await this.axios.request<T>({
        method: 'post',
        headers: headers,
        baseURL: environment.BASE_URL,
        url: options.path,
        data: data,
        // params: options.params,
      });

      return res.data;
    } catch (err) {
      const errData = JSON.parse(JSON.stringify(err.response.data));
      errData[`status`] = err.response.status;

      return Promise.reject(this.debug ? errData : errData.message);
    }
  }

  public async upload<T>(options: UploadOpstions): Promise<any> {
    try {
      let token = localStorage.getItem('token');
      let headers = {
        'Content-Type': 'multipart/form-data',
        "X-Authorization": token ? token : '',
      };

      const formData = new FormData();
      formData.append(options.key, options.data.file, `${options.data.name}`);
      // formData.append('name', options.data.name);

      let res = await this.axios.request<T>({
        method: 'POST',
        headers: headers,
        baseURL: environment.BASE_URL,
        url: options.path,
        data: formData,
      });

      return res.data;
    } catch (err) {
      return Promise.reject(this.debug ? err.response : err.response.data);
    }
  }
}
