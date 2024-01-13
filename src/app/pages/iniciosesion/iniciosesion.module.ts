import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciosesionPageRoutingModule } from './iniciosesion-routing.module';

import { IniciosesionPage } from './iniciosesion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    IniciosesionPageRoutingModule
  ],
  declarations: [IniciosesionPage]
})
export class IniciosesionPageModule {}
