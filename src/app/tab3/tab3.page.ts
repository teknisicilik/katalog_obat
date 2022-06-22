import { ApiService } from '../services/api/api.service';
import { Component } from '@angular/core';
import { Tab } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements Tab {
  src: any;
  datas: any;

  skeletons = Array(5);
  loading: boolean = true;

  constructor(private api: ApiService) {}

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
      action: 'transaksi',
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
        this.loading = false;
        console.log(err);
      });
  }

  async onSearchChange(e) {
    this.datas = [];
    this.src = e.detail.value;
    await this.refreshData();
  }

  async doRefresh(e) {
    await this.refreshData();
    e.target.complete();
  }
}
