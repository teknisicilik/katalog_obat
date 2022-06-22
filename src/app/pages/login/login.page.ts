import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    let action = ``;
    let param = this.loginForm.value;
    param['action'] = 'login';
    this.api
      .get(action, param)
      .then((res) => {
        console.log('Respon Login', res);
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
          localStorage.setItem('token', res.JWT);
          this.navCtrl.navigateRoot(['']);
        }
      })
      .catch((err) => {
        console.error('ERRROR LOGIN : ', err);
      });
  }
}
