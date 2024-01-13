import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarviajePage } from './buscarviaje.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarviajePageRoutingModule {}
