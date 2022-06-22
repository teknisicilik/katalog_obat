import { Component, ViewChild } from '@angular/core';
import { IonInput, IonModal, ModalController } from '@ionic/angular';
import { ObatDetailPage } from '../pages/obat-detail/obat-detail.page';
import { ApiService } from '../services/api/api.service';
import { Tab } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements Tab {
  src: any;
  datas: any;

  skeletons = Array(5);
  loading: boolean = true;

  modalData: any;

  constructor(private api: ApiService, public modalCtrl: ModalController) {}

  ngOnInit() {}

  tabsWillEnter() {
    this.ionViewWillEnter();
  }

  async ionViewWillEnter() {
    await this.refreshData();
  }

  tabsDidEnter() {
    this.ionViewDidEnter();
  }

  ionViewDidEnter() {}

  async refreshData() {
    this.loading = true;
    this.datas = [];
    await this.getData();
  }

  async getData() {
    let action = '';
    let param = {
      action: 'getStok',
      src: this.src,
    };

    await this.api
      .get(action, param)
      .then(async (res) => {
        console.log('Respon : ', res.data);
        if (res.success) {
          this.datas = res.data;
        }
        setTimeout(() => {
          this.loading = false;
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

  async onSearchChange(e) {
    this.loading = true;
    this.datas = [];
    this.src = e.detail.value;
    await this.refreshData();
  }

  async doRefresh(e) {
    await this.refreshData();
    e.target.complete();
  }

  async openDetail(data) {
    this.modalData = data;
    const detailModal = await this.modalCtrl.create({
      component: ObatDetailPage,
      breakpoints: [0, 0.85, 0.85],
      initialBreakpoint: 0.85,
      cssClass: 'detail-modal',
      componentProps: {
        data: this.modalData,
      },
    });

    await detailModal.present();

    detailModal.onWillDismiss().then((res) => {
      if (res.role == 'done') {
        this.addTransaksi(res.data);
      }
    });
  }

  async addTransaksi(data) {
    let action = '';
    let param = {
      action: 'addStok',
    };
    let body = data;

    await this.api
      .post(action, param, body)
      .then(async (res) => {
        console.log('Respon Add Stok: ', res);
        await this.refreshData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
