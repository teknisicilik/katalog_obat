import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObatDetailPage } from './obat-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ObatDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObatDetailPageRoutingModule {}
