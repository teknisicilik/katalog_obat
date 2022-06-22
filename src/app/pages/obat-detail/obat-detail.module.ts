import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObatDetailPageRoutingModule } from './obat-detail-routing.module';

import { ObatDetailPage } from './obat-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObatDetailPageRoutingModule
  ],
  declarations: [ObatDetailPage]
})
export class ObatDetailPageModule {}
