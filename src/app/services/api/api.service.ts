import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Api } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    public api: Api,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  // Util ======================================================================================
  public async login(action: string, param: any, body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.api
        .login({
          path: `/${action}`,
          params: param,
          body: body,
        })
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          this.onError(err);
          return reject(err);
        });
    });
  }

  public async model(action: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.api
        .model({
          path: `gen-model/${action}`,
          params: {},
        })
        .then(async (res) => {
          res.success = true;
          return resolve(res);
        })
        .catch((err) => {
          err.success = false;
          return reject(err);
        });
    });
  }

  public async dataset(action: string, param: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.api
        .get({
          path: `/${action}/dataset`,
          params: param,
        })
        .then(async (res) => {
          return resolve(res);
        })
        .catch((err) => {
          this.onError(err);
          return reject(err);
        });
    });
  }

  // Main ==================================================================================
  public async list(action: string, param: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.api
        .get({
          path: `/${action}/list`,
          params: param,
        })
        .then(async (res) => {
          return resolve(res);
        })
        .catch((err) => {
          this.onError(err);
          return reject(err);
        });
    });
  }

  public async detail(action: string, param: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.api
        .get({
          path: `/${action}/show`,
          params: param,
        })
        .then(async (res) => {
          return resolve(res);
        })
        .catch((err) => {
          this.onError(err);
          return reject(err);
        });
    });
  }

  public async add(action: string, param: any, body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.api
        .post({
          path: `/${action}/create`,
          params: param,
          body: body,
        })
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          this.onError(err);
          return reject(err);
        });
    });
  }

  public async delete(action: string, param: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.api
        .delete({
          path: `/${action}/delete`,
          params: param,
          body: param,
        })
        .then(async (res) => {
          return resolve(res);
        })
        .catch((err) => {
          this.onError(err);
          return reject(err);
        });
    });
  }

  public async edit(action: string, param: any, body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.api
        .put({
          path: `/${action}/update`,
          params: param,
          body: body,
        })
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          this.onError(err);
          return reject(err);
        });
    });
  }

  // Default ===========================================================================
  public async get(action: string, param: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.api
        .get({
          path: `/${action}`,
          params: param,
        })
        .then(async (res) => {
          return resolve(res);
        })
        .catch((err) => {
          this.onError(err);
          return reject(err);
        });
    });
  }

  public async post(action: string, param: any, body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.api
        .post({
          path: `/${action}`,
          params: param,
          body: body,
        })
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          this.onError(err);
          return reject(err);
        });
    });
  }

  public async put(action: string, param: any, body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.api
        .put({
          path: `/${action}`,
          params: param,
          body: body,
        })
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          this.onError(err);
          return reject(err);
        });
    });
  }

  private onError(err) {
    if (err.status == 401) {
      localStorage.clear();
      this.navCtrl.navigateRoot([`/login`]);
      this.showError(err.message);
    } else if (err.status == 500) {
      // this.navCtrl.back();
      this.showError('Terjadi kesalahan sistem');
    } else {
      // this.showError(err.message);
    }
  }

  private async showError(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'top',
      duration: 3000,
    });
    toast.present();
  }
}
