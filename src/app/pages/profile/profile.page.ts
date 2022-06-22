import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  data_diri: any;

  channels = [];
  role_name: any;
  profile: any;

  constructor(
    private api: ApiService,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {
    let profile = localStorage.getItem('user');

    if (profile) this.profile = JSON.parse(profile);
    console.log(this.profile);
  }

  ngOnInit() {}

  async ionViewDidEnter() {
    // await this.getData();
  }

  async logOut() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Yakin ingin Keluar ?',
      message:
        'Anda akan keluar aplikasi, pastikan mengingat username dan password untuk login kembali.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Logout',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            // Hapus Semua
            localStorage.clear();
            this.navCtrl.navigateRoot(['/login']);
          },
        },
        {
          text: 'Batal',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }

  edit() {
    this.navCtrl.navigateForward(['/profile-form']);
  }
}
