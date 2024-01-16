import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicarViajePage } from './publicar-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: PublicarViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicarViajePageRoutingModule {}
