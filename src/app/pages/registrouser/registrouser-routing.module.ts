import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrouserPage } from './registrouser.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrouserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrouserPageRoutingModule {}
