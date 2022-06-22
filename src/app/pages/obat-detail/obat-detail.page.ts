import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-obat-detail',
  templateUrl: './obat-detail.page.html',
  styleUrls: ['./obat-detail.page.scss'],
})
export class ObatDetailPage implements OnInit {
  data: any;

  jumlah: any;
  totalHarga: any = 0;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {
    this.data = this.navParams.data.data;
    if (this.data.stok > 0) {
      this.jumlah = 1;
    } else {
      this.jumlah = 0;
    }

    this.doTotal(this.data.harga_jual_satuan, this.jumlah);
  }

  ngOnInit() {}

  addJumlah() {
    let jumlah = Number(this.jumlah);
    let stok = Number(this.data.stok);

    if (jumlah < stok) this.jumlah = Number(this.jumlah) + 1;
  }

  subJumlah() {
    let jumlah = Number(this.jumlah);

    if (jumlah > 0) this.jumlah = Number(this.jumlah) - 1;
  }

  jumlahChange(e) {
    this.jumlah = e.detail.value;
    this.doTotal(this.data.harga_jual_satuan, this.jumlah);
  }

  doTotal(harga, jumlah) {
    let total = Number(harga) * Number(jumlah);
    this.totalHarga = total;
  }

  onSend() {
    console.log(this.data);

    let data = {
      obat_id: Number(this.data.obat_id),
      stok_id: Number(this.data.stok_id),
      jumlah: Number(this.jumlah),
      stok: Number(this.data.stok),
    };
    let role = 'done';

    this.modalCtrl.dismiss(data, role);
  }
}
