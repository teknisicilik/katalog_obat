import { Component, ViewChild } from '@angular/core';
import { IonTabs, Platform, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  @ViewChild('tabs', { static: true }) tabs: IonTabs;

  private subs = new Subscription();
  private currentTab: Tab;
  private tabsDidEnter = false;
  private tabsWillEnter = false;

  selectedTab: string;

  pressed: number = 0;
  backSub: Subscription;

  constructor(private platform: Platform, private toast: ToastController) {}

  async ngOnInit() {
    const tabSub = this.tabs.ionTabsDidChange.subscribe(() => {
      this.currentTab = this.tabs.outlet.component as unknown as Tab;
    });
    this.subs.add(tabSub);
  }

  ionViewWillEnter() {
    if (this.tabsWillEnter) {
      this.currentTab.tabsWillEnter();
    }
    this.tabsWillEnter = true;
  }

  async ionViewDidEnter() {
    this.backSub = this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.pressed > 1) {
        this.pressed++;
        setTimeout(() => {
          this.pressed = 0;
        }, 3000);
      } else {
        this.presentToast();
        this.pressed++;
        if (this.pressed > 1) {
          App.exitApp();
        }
        setTimeout(() => {
          this.pressed = 0;
        }, 3000);
      }
    });

    if (this.tabsDidEnter) {
      this.currentTab.tabsDidEnter();
    }
    this.tabsDidEnter = true;
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Press back again to exit',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ionViewWillLeave() {
    this.subs.unsubscribe();
    this.backSub.unsubscribe();
  }
}

export interface Tab {
  tabsDidEnter();
  tabsWillEnter();
}