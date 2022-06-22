import { Component } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    let action = '';
    let param = {
      action: 'hello',
    };

    await this.api
      .get(action, param)
      .then(async (res) => {
        console.log('Respon : ', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
